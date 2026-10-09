-- Remove "office" content from the Mazarini site (Strapi DB).
--
--   1. Deletes the "Office" project (slug = office, draft + published).
--   2. Deletes the "Office" item from the Markets sub-navigation.
--   3. Rewrites every sentence that mentions office(s) — phrase by phrase, so
--      "Officer" (e.g. Chief Executive Officer) is never touched.
--   4. Prints whatever still contains "office" so leftovers can be fixed by hand.
--
-- Safe to run more than once. Runs in one transaction.
--
-- VPS:   docker exec -i mazarini-postgres psql -U xcellfund -d mazarini_strapi -v ON_ERROR_STOP=1 < scripts/remove-office.sql
-- Local: psql -h localhost -U postgres -d mazarini -v ON_ERROR_STOP=1 -f scripts/remove-office.sql

BEGIN;

-- ---------- 1. Office project ----------
-- files_related_mph is polymorphic (no FK), so detach media first.
-- Link tables (homepage / projects page / R&D page featured projects) cascade.
DELETE FROM files_related_mph
WHERE related_type = 'api::project.project'
  AND related_id IN (SELECT id FROM projects WHERE slug = 'office');

DELETE FROM projects WHERE slug = 'office';

-- ---------- 2. "Office" sub-nav item ----------
DELETE FROM sub_nav_items_cmps
WHERE component_type = 'sub-nav.sub-nav'
  AND cmp_id IN (SELECT id FROM components_sub_nav_sub_navs WHERE name = 'Office');

DELETE FROM components_sub_nav_sub_navs WHERE name = 'Office';

-- ---------- 3. Text rewrites ----------
CREATE TEMP TABLE office_rewrites (old text PRIMARY KEY, new text NOT NULL) ON COMMIT DROP;

INSERT INTO office_rewrites (old, new) VALUES
  -- Company offices
  ('Vice President & Office Leader',                         'Vice President & Regional Leader'),
  ('Our offices nationwide offer clients',                   'Our locations nationwide offer clients'),
  ('every MAZARINI office hosts',                            'every MAZARINI location hosts'),
  ('opening an office in South Florida',                     'opening a location in South Florida'),
  ('With 10 office locations nationwide',                    'With 10 locations nationwide'),
  ('operating from offices coast to coast',                  'operating from locations coast to coast'),
  ('environmental impacts of our offices and job-sites',     'environmental impacts of our facilities and job-sites'),
  ('in 16 offices nationwide',                               'in 16 locations nationwide'),
  ('with 10 offices nationwide',                             'with 10 locations nationwide'),
  ('Discover our regional offices',                          'Discover our regional locations'),
  ('from the jobsite, to the office, and beyond',            'from the jobsite, to the workplace, and beyond'),
  -- Office sector / generic wording
  ('building out an innovative new corporate office',        'building out an innovative new corporate headquarters'),
  ('State-of-the-art office spaces, retail hubs',            'State-of-the-art commercial spaces, retail hubs'),
  ('Government office buildings designed',                   'Government buildings designed'),
  ('A clean office environment',                             'A clean work environment'),
  ('Services cover offices, studios, government buildings',  'Services cover studios, government buildings'),
  ('elevate your home, office, or public space',             'elevate your home, workplace, or public space'),
  ('Customized lighting plans for offices, studios, and institutions', 'Customized lighting plans for studios and institutions'),
  ('Suitable for residential buildings, offices, schools',   'Suitable for residential buildings, schools'),
  ('Skilled estimators manage office buildings, retail spaces, and other commercial projects',
                                                             'Skilled estimators manage retail spaces and other commercial projects'),
  ('regular office tools',                                   'regular cleaning tools'),
  -- Project write-ups
  ('Class A office floors',                                  'Class A commercial floors'),
  ('several floors of Class A office space',                 'several floors of Class A commercial space'),
  ('retail, office, and parking',                            'retail, commercial, and parking'),
  ('an existing office suite within the hospital',           'an existing administrative suite within the hospital'),
  ('office-to-CCU conversion',                               'suite-to-CCU conversion'),
  -- Image alt text / captions
  ('in a blurred office background',                         'against a blurred background'),
  ('in a modern office setting',                             'in a modern workplace setting'),
  ('an academic or office environment',                      'an academic or professional environment');

-- Apply every rewrite to every text/varchar/json column (except Strapi's history snapshots).
DO $$
DECLARE c record; r record; n int; total int := 0;
BEGIN
  FOR c IN
    SELECT table_name, column_name, data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND data_type IN ('text', 'character varying', 'jsonb', 'json')
      AND table_name <> 'strapi_history_versions'
  LOOP
    FOR r IN SELECT old, new FROM office_rewrites ORDER BY length(old) DESC LOOP
      IF c.data_type IN ('jsonb', 'json') THEN
        EXECUTE format('UPDATE %I SET %I = replace(%I::text, $1, $2)::%s WHERE position($1 in %I::text) > 0',
                       c.table_name, c.column_name, c.column_name, c.data_type, c.column_name)
          USING r.old, r.new;
      ELSE
        EXECUTE format('UPDATE %I SET %I = replace(%I, $1, $2) WHERE position($1 in %I) > 0',
                       c.table_name, c.column_name, c.column_name, c.column_name)
          USING r.old, r.new;
      END IF;
      GET DIAGNOSTICS n = ROW_COUNT;
      IF n > 0 THEN
        RAISE NOTICE 'updated %.% (% rows): "%"', c.table_name, c.column_name, n, r.old;
        total := total + n;
      END IF;
    END LOOP;
  END LOOP;
  RAISE NOTICE 'text rewrites: % rows updated', total;
END $$;

-- ---------- 4. Report leftovers ----------
-- "office" not followed by "r" (so Officer is ignored); file names/urls are not visible text.
DO $$
DECLARE c record; s text; left_over int := 0;
BEGIN
  FOR c IN
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND data_type IN ('text', 'character varying', 'jsonb', 'json')
      AND table_name <> 'strapi_history_versions'
      AND NOT (table_name = 'files' AND column_name IN ('name', 'hash', 'url', 'formats'))
  LOOP
    FOR s IN EXECUTE format('SELECT DISTINCT left(%I::text, 200) FROM %I WHERE %I::text ~* ''office(?!r)''',
                            c.column_name, c.table_name, c.column_name)
    LOOP
      RAISE NOTICE 'STILL CONTAINS office -> %.%: %', c.table_name, c.column_name, s;
      left_over := left_over + 1;
    END LOOP;
  END LOOP;
  RAISE NOTICE 'leftover values mentioning office: %', left_over;
END $$;

COMMIT;
