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
    await setPublicPermissions(strapi, "stat", ["find", "findOne"]);
    await setPublicPermissions(strapi, "spark-page", ["find"]);
    await setPublicPermissions(strapi, "jobs-page", ["find"]);
  },
};
