import type { Core } from "@strapi/strapi";

async function setPublicPermissions(
  strapi: Core.Strapi,
  apiUid: string,
  actions: string[]
): Promise<void> {
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) return;

  for (const action of actions) {
    const existing = await strapi
      .query("plugin::users-permissions.permission")
      .findOne({
        where: {
          role: publicRole.id,
          action: `api::${apiUid}.${apiUid}.${action}`,
        },
      });

    if (!existing) {
      await strapi.query("plugin::users-permissions.permission").create({
        data: {
          action: `api::${apiUid}.${apiUid}.${action}`,
          role: publicRole.id,
        },
      });
    }
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Grant public read access to all content types
    await setPublicPermissions(strapi, "homepage", ["find"]);
    await setPublicPermissions(strapi, "global", ["find"]);
    await setPublicPermissions(strapi, "about", ["find"]);
    await setPublicPermissions(strapi, "expertise", ["find", "findOne"]);
    await setPublicPermissions(strapi, "project", ["find", "findOne"]);
    await setPublicPermissions(strapi, "contact", ["find"]);
    await setPublicPermissions(strapi, "contact-submission", ["create"]);
    await setPublicPermissions(strapi, "report-download", ["create"]);
    await setPublicPermissions(strapi, "stat", ["find", "findOne"]);
    await setPublicPermissions(strapi, "spark-page", ["find"]);
    await setPublicPermissions(strapi, "jobs-page", ["find"]);
    await setPublicPermissions(strapi, "award-page", ["find"]);
    await setPublicPermissions(strapi, "preconstruction-page", ["find"]);
    await setPublicPermissions(strapi, "construction-page", ["find"]);
    await setPublicPermissions(strapi, "consideration-page", ["find"]);
    await setPublicPermissions(strapi, "corporate-responsibility-page", ["find"]);
    await setPublicPermissions(strapi, "establishes-nonprofit-foundation-page", ["find"]);
    await setPublicPermissions(strapi, "colab-page", ["find"]);
    await setPublicPermissions(strapi, "experience-page", ["find"]);
    await setPublicPermissions(strapi, "leadership-page", ["find"]);
    await setPublicPermissions(strapi, "location", ["find", "findOne"]);
    await setPublicPermissions(strapi, "location-list", ["find"]);
    await setPublicPermissions(strapi, "news", ["find", "findOne"]);
    await setPublicPermissions(strapi, "news-page", ["find"]);
    await setPublicPermissions(strapi, "post-construction-page", ["find"]);
    await setPublicPermissions(strapi, "rd-page", ["find"]);
    await setPublicPermissions(strapi, "safety", ["find"]);
    await setPublicPermissions(strapi, "service", ["find", "findOne"]);
    await setPublicPermissions(strapi, "services-page", ["find"]);
    await setPublicPermissions(strapi, "subcontractors-page", ["find"]);
    await setPublicPermissions(strapi, "sustainability", ["find"]);
    await setPublicPermissions(strapi, "team", ["find", "findOne"]);
    await setPublicPermissions(strapi, "team-page", ["find"]);
    await setPublicPermissions(strapi, "you-belong-here-page", ["find"]);
  },
};
