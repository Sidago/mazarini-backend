-- Rewrite the About page with the approved Mazarini Inc. copy (Strapi DB).
--
-- The previous About content was template copy from another company and made
-- false claims (founded 1937, $14B revenue, 3,300 team members, 16 locations ...).
--
--   1. Hero, intro, and SEO copy replaced.
--   2. "By the Numbers" marquee: 4 approved stats, linked to the About page.
--   3. New "Union Built. Certified." section (heading, body, 5 certifications).
--   4. Core values grid replaced with "What We Stand For" panels.
--   5. Timeline: heading/description cleared and every timeline entry
--      UNPUBLISHED (draft rows kept so the section can be revisited later).
--   6. Culture / Life copy: company name fixed to "Mazarini Inc.".
--   7. Prints any About text that still contains a forbidden company name.
--
-- Applies to every version of the About single type (draft + published).
-- Safe to run more than once. Runs in one transaction.
--
-- PREREQUISITE: deploy the backend first, so Strapi has booted once with the new
-- `shared.certification` component and the about.unionHeading /
-- unionDescription / certifications fields. The script aborts if they are missing.
--
-- VPS:   docker exec -i mazarini-postgres psql -U xcellfund -d mazarini_strapi -v ON_ERROR_STOP=1 < scripts/rewrite-about.sql
-- Local: psql -h localhost -U postgres -d mazarini -v ON_ERROR_STOP=1 -f scripts/rewrite-about.sql

BEGIN;

-- ---------- 0. Schema check ----------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'abouts' AND column_name = 'union_heading')
     OR to_regclass('public.components_shared_certifications') IS NULL THEN
    RAISE EXCEPTION 'About schema is out of date: deploy the backend and let Strapi start once before running this script.';
  END IF;
END $$;

-- ---------- 1. Hero / intro / union text ----------
UPDATE abouts SET
  title             = 'About',
  hero_title        = 'Who We Are',
  hero_text         = 'Mazarini Inc. is a self-performing union WBE / DBE / SBSA construction company providing a broad range of government and commercial construction services.',
  intro_heading     = 'Building America, one public project at a time',
  intro_highlight   = 'one public project at a time',
  intro_discription = 'Mazarini Inc. was founded in 2018 by Bohdana Eagle, who has owned it 100% since its founding. In 2020 the pandemic brought most of the construction industry, including nearly all residential work, to a stop. Bohdana noticed that roads were still being paved and government buildings were still being maintained. She decided that day that Mazarini Inc. would serve public agencies, and the company has built its business around government work ever since.'
                      || E'\n\n' ||
                      'Today Mazarini Inc. delivers construction for public agencies across healthcare, education and institutional facilities, transportation, and utilities. Our clients include the State of Illinois, Chicago Public Schools, and Milwaukee Public Schools. We self-perform almost every scope of work except specialized items, so we control the quality, schedule, and crew on every job.'
                      || E'\n\n' ||
                      'We put quality before profit. That is unusual in public construction, and our agency partners notice. Every building we work on serves the public, and we build it to last.',
  union_heading     = 'Union Built. Certified.',
  union_description = 'Mazarini Inc. is a union contractor, signatory with the Carpenters, Laborers, Cement Masons, and Painters unions, and is actively expanding into additional trades.',
  timeline_heading     = NULL,
  timeline_description = NULL,
  culture_description  = 'We prioritize innovation, belonging, and genuine appreciation for each other. Learn more about who we are and what we stand for at Mazarini Inc.',
  culture_watermark    = 'The Mazarini Inc. Culture',
  life_heading         = 'Life at Mazarini Inc.',
  updated_at        = now();

-- ---------- 2. SEO ----------
UPDATE components_shared_seos SET
  meta_title       = 'About Mazarini Inc.',
  meta_description = 'Mazarini Inc. is a self-performing union WBE / DBE / SBSA construction company providing a broad range of government and commercial construction services.'
WHERE id IN (SELECT cmp_id FROM abouts_cmps
             WHERE field = 'seo' AND component_type = 'shared.seo');

-- ---------- 3. By the Numbers ----------
-- Fixed document_ids make the script re-runnable. Links cascade on delete.
DELETE FROM stats WHERE document_id IN (
  'mzaboutstatfounded000001', 'mzaboutstatgrowth0000002',
  'mzaboutstatunions0000003', 'mzaboutstatwomanowned004');

INSERT INTO stats (document_id, value, suffix, label, description, created_at, updated_at, published_at)
VALUES
  ('mzaboutstatfounded000001', '2018', NULL, 'Founded',                  NULL, now(), now(), now()),
  ('mzaboutstatgrowth0000002', '75%+', NULL, 'Year-over-year growth',    NULL, now(), now(), now()),
  ('mzaboutstatunions0000003', '4',    NULL, 'Union trade affiliations', NULL, now(), now(), now()),
  ('mzaboutstatwomanowned004', '100%', NULL, 'Woman-owned',              NULL, now(), now(), now());

DELETE FROM abouts_stat_items_lnk;

INSERT INTO abouts_stat_items_lnk (about_id, stat_id, stat_ord)
SELECT a.id, s.id, v.ord
FROM abouts a
CROSS JOIN (VALUES
  ('mzaboutstatfounded000001', 1),
  ('mzaboutstatgrowth0000002', 2),
  ('mzaboutstatunions0000003', 3),
  ('mzaboutstatwomanowned004', 4)) AS v(doc, ord)
JOIN stats s ON s.document_id = v.doc;

-- ---------- 4 + 5. Repeatable components: certifications, core values ----------
-- Drop the old component rows (links cascade from the entity, not the
-- component, so remove links explicitly), then insert one fresh set per version.
CREATE TEMP TABLE old_about_cmps ON COMMIT DROP AS
SELECT cmp_id, component_type FROM abouts_cmps
WHERE (field = 'coreValues'     AND component_type = 'shared.core-value')
   OR (field = 'certifications' AND component_type = 'shared.certification');

DELETE FROM abouts_cmps
WHERE (field = 'coreValues'     AND component_type = 'shared.core-value')
   OR (field = 'certifications' AND component_type = 'shared.certification');

DELETE FROM components_shared_core_values
WHERE id IN (SELECT cmp_id FROM old_about_cmps WHERE component_type = 'shared.core-value');

DELETE FROM components_shared_certifications
WHERE id IN (SELECT cmp_id FROM old_about_cmps WHERE component_type = 'shared.certification');

DO $$
DECLARE
  about_row RECORD;
  new_id    integer;
  i         integer;
  cert_codes   text[] := ARRAY['WBE / FBE', 'BEP', 'DBE', 'SBE', 'SBSA'];
  cert_names   text[] := ARRAY[
    'Women / Female Business Enterprise',
    'Illinois Business Enterprise Program',
    'Disadvantaged Business Enterprise',
    'Small Business Enterprise',
    'Small Business Set-Aside'];
  value_titles text[] := ARRAY[
    'Our Values', 'Quality Over Profit', 'We Self-Perform',
    'Union Craftsmanship', 'Public Trust', 'Building America'];
  value_descs  text[] := ARRAY[
    NULL,
    'We do the job right, even when it costs us more to do it.',
    'Our own union crews handle almost everything, so quality stays in our hands.',
    'Skilled, trained, fairly paid tradespeople on every site.',
    'Schools, hospitals, roads, and utilities serve everyone. We build them that way.',
    'Our motto and our mission.'];
BEGIN
  FOR about_row IN SELECT id FROM abouts LOOP
    FOR i IN 1 .. array_length(cert_codes, 1) LOOP
      INSERT INTO components_shared_certifications (code, name, agency)
      VALUES (cert_codes[i], cert_names[i], NULL)
      RETURNING id INTO new_id;
      INSERT INTO abouts_cmps (entity_id, cmp_id, component_type, field, "order")
      VALUES (about_row.id, new_id, 'shared.certification', 'certifications', i);
    END LOOP;

    FOR i IN 1 .. array_length(value_titles, 1) LOOP
      INSERT INTO components_shared_core_values (title, description)
      VALUES (value_titles[i], value_descs[i])
      RETURNING id INTO new_id;
      INSERT INTO abouts_cmps (entity_id, cmp_id, component_type, field, "order")
      VALUES (about_row.id, new_id, 'shared.core-value', 'coreValues', i);
    END LOOP;
  END LOOP;
END $$;

-- ---------- 6. Unpublish timeline entries ----------
-- In Strapi 5, unpublishing = deleting the published row; the draft row stays.
-- Remove the published rows' milestone components and media links first
-- (files_related_mph is polymorphic, no FK). Entity -> cmps link cascades.
DELETE FROM components_timeline_milestones
WHERE id IN (SELECT c.cmp_id FROM timeline_entries_cmps c
             JOIN timeline_entries t ON t.id = c.entity_id
             WHERE t.published_at IS NOT NULL AND c.component_type = 'timeline.milestone');

DELETE FROM components_shared_links
WHERE id IN (SELECT c.cmp_id FROM timeline_entries_cmps c
             JOIN timeline_entries t ON t.id = c.entity_id
             WHERE t.published_at IS NOT NULL AND c.component_type = 'shared.link');

DELETE FROM files_related_mph
WHERE related_type = 'api::timeline-entry.timeline-entry'
  AND related_id IN (SELECT id FROM timeline_entries WHERE published_at IS NOT NULL);

DELETE FROM timeline_entries WHERE published_at IS NOT NULL;

-- ---------- 7. Leftover check ----------
-- Should print zero rows. Flags the all-caps name, the other forbidden names,
-- and the most visible of the removed false claims.
CREATE TEMP VIEW about_text AS
SELECT 'abouts' AS source, id,
       concat_ws(' ', title, hero_title, hero_text, intro_heading, intro_discription,
                 union_heading, union_description, culture_heading, culture_description,
                 culture_watermark, life_heading, life_description) AS body
FROM abouts
UNION ALL
SELECT 'core value', id, concat_ws(' ', title, description)
FROM components_shared_core_values
WHERE id IN (SELECT cmp_id FROM abouts_cmps WHERE field = 'coreValues')
UNION ALL
SELECT 'seo', id, concat_ws(' ', meta_title, meta_description)
FROM components_shared_seos
WHERE id IN (SELECT cmp_id FROM abouts_cmps WHERE field = 'seo');

SELECT source, id, body AS still_needs_fixing
FROM about_text
WHERE body ~ 'MAZARINI'
   OR body ~* 'mazarini (group|construction)|largest|1937|3,000|3,300|nationwide';

COMMIT;
