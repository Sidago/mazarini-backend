import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutAbout extends Struct.SingleTypeSchema {
  collectionName: 'abouts';
  info: {
    description: 'About page with dynamic content blocks';
    displayName: 'About';
    pluralName: 'abouts';
    singularName: 'about';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    coreValues: Schema.Attribute.Component<'shared.core-value', true>;
    coreValuesImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cultureCards: Schema.Attribute.Component<'shared.culture-card', true>;
    cultureDescription: Schema.Attribute.Text;
    cultureHeading: Schema.Attribute.String;
    cultureWatermark: Schema.Attribute.String;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'videos'>;
    introDiscription: Schema.Attribute.Text;
    introHeading: Schema.Attribute.Text;
    introHighlight: Schema.Attribute.String;
    leadershipBlocks: Schema.Attribute.Component<
      'shared.leadership-block',
      true
    >;
    lifeDescription: Schema.Attribute.Text;
    lifeHeading: Schema.Attribute.String;
    lifeImages: Schema.Attribute.Component<'shared.life-image', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::about.about'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    timelineDescription: Schema.Attribute.Text;
    timelineHeading: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAwardPageAwardPage extends Struct.SingleTypeSchema {
  collectionName: 'award_pages';
  info: {
    description: '';
    displayName: 'Award Page';
    pluralName: 'award-pages';
    singularName: 'award-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    challengeCards: Schema.Attribute.Component<'award.challenge-card', true>;
    challengesDescription: Schema.Attribute.Text;
    challengesTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fieldMembers: Schema.Attribute.Relation<'manyToMany', 'api::team.team'>;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroWatermark: Schema.Attribute.String;
    journeyCtaText: Schema.Attribute.String;
    journeyCtaUrl: Schema.Attribute.String;
    journeyImage: Schema.Attribute.Media<'images'>;
    journeyText: Schema.Attribute.Text;
    journeyTitle: Schema.Attribute.String;
    knowledgeDescription: Schema.Attribute.Text;
    knowledgeTitle: Schema.Attribute.String;
    knowledgeWatermark: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::award-page.award-page'
    > &
      Schema.Attribute.Private;
    peopleCtaText: Schema.Attribute.String;
    peopleCtaUrl: Schema.Attribute.String;
    peopleText: Schema.Attribute.Text;
    peopleTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    textColumns: Schema.Attribute.Component<'award.text-column', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCareerPageCareerPage extends Struct.SingleTypeSchema {
  collectionName: 'career_pages';
  info: {
    description: '';
    displayName: 'Career Page';
    pluralName: 'career-pages';
    singularName: 'career-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    belongDescription: Schema.Attribute.Text;
    belongImage: Schema.Attribute.Media<'images'>;
    belongTitle: Schema.Attribute.String;
    benefitItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    benefitsHighlight: Schema.Attribute.String;
    benefitsImage: Schema.Attribute.Media<'images'>;
    benefitsText: Schema.Attribute.Text;
    benefitsTitle: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cultureCards: Schema.Attribute.Component<'career.culture-card', true>;
    cultureSubtitle: Schema.Attribute.String;
    cultureTitle: Schema.Attribute.String;
    featureItems: Schema.Attribute.Component<'career.feature-item', true>;
    featuresTitle: Schema.Attribute.String;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroVideo: Schema.Attribute.Media<'videos'>;
    jobsSectionTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::career-page.career-page'
    > &
      Schema.Attribute.Private;
    missionHighlight: Schema.Attribute.String;
    missionText: Schema.Attribute.Text;
    missionTitle: Schema.Attribute.Text;
    peopleImages: Schema.Attribute.Media<'images', true>;
    peopleSubtitle: Schema.Attribute.String;
    peopleTitle: Schema.Attribute.String;
    personCtaText: Schema.Attribute.String;
    personCtaUrl: Schema.Attribute.String;
    personImage: Schema.Attribute.Media<'images'>;
    personName: Schema.Attribute.String;
    personPosition: Schema.Attribute.String;
    personQuote: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    quotes: Schema.Attribute.Component<'career.quote-item', true>;
    quotesTitle: Schema.Attribute.String;
    resourceItems: Schema.Attribute.Component<'career.resource-item', true>;
    resourcesTitle: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    statsTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiColabPageColabPage extends Struct.SingleTypeSchema {
  collectionName: 'colab_pages';
  info: {
    description: 'CoLab project page content';
    displayName: 'CoLab Page';
    pluralName: 'colab-pages';
    singularName: 'colab-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    challengeCards: Schema.Attribute.Component<'colab.challenge-card', true>;
    challengesDescription: Schema.Attribute.Text;
    challengesTitle: Schema.Attribute.String;
    challengesWatermark: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    elementCards: Schema.Attribute.Component<'colab.element-card', true>;
    elementsTitle: Schema.Attribute.String;
    elementsWatermark: Schema.Attribute.String;
    experienceCtaText: Schema.Attribute.String;
    experienceCtaUrl: Schema.Attribute.String;
    experienceImage: Schema.Attribute.Media<'images'>;
    experienceText: Schema.Attribute.Text;
    featuredNews: Schema.Attribute.Relation<'manyToMany', 'api::news.news'>;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroVideo: Schema.Attribute.Media<'videos'>;
    innovations: Schema.Attribute.Component<'colab.innovation-item', true>;
    innovationTitle: Schema.Attribute.String;
    innovationWatermark: Schema.Attribute.String;
    introAwards: Schema.Attribute.Text;
    introCertifications: Schema.Attribute.Text;
    introClient: Schema.Attribute.String;
    introCtaText: Schema.Attribute.String;
    introCtaUrl: Schema.Attribute.String;
    introImage: Schema.Attribute.Media<'images'>;
    introKeyPartners: Schema.Attribute.Text;
    introLocation: Schema.Attribute.String;
    introProjectTypes: Schema.Attribute.Text;
    introText: Schema.Attribute.Text;
    introTitle: Schema.Attribute.String;
    introVideo: Schema.Attribute.Media<'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::colab-page.colab-page'
    > &
      Schema.Attribute.Private;
    newsCtaText: Schema.Attribute.String;
    newsCtaUrl: Schema.Attribute.String;
    newsTitle: Schema.Attribute.String;
    newsWatermark: Schema.Attribute.String;
    numbersImage: Schema.Attribute.Media<'images'>;
    numbersTitle: Schema.Attribute.String;
    numbersWatermark: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resultsImages: Schema.Attribute.Media<'images', true>;
    resultsTitle: Schema.Attribute.String;
    resultsWatermark: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    teamDescription: Schema.Attribute.Text;
    teamMembers: Schema.Attribute.Relation<'manyToMany', 'api::team.team'>;
    teamTitle: Schema.Attribute.String;
    teamWatermark: Schema.Attribute.String;
    testimonialAuthorName: Schema.Attribute.String;
    testimonialAuthorPosition: Schema.Attribute.String;
    testimonialImage: Schema.Attribute.Media<'images'>;
    testimonialQuote: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    visionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    visionSubtitle: Schema.Attribute.String;
    visionTitle: Schema.Attribute.String;
    visionWatermark: Schema.Attribute.String;
  };
}

export interface ApiConsiderationPageConsiderationPage
  extends Struct.SingleTypeSchema {
  collectionName: 'consideration_pages';
  info: {
    description: '';
    displayName: 'Consideration Page';
    pluralName: 'consideration-pages';
    singularName: 'consideration-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    advisorCtaText: Schema.Attribute.String;
    advisorCtaUrl: Schema.Attribute.String;
    advisorDescription: Schema.Attribute.Text;
    advisorFeatureText: Schema.Attribute.Text;
    advisorImage: Schema.Attribute.Media<'images'>;
    advisorTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBody: Schema.Attribute.Text;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroWatermark: Schema.Attribute.String;
    journeyCtaText: Schema.Attribute.String;
    journeyCtaUrl: Schema.Attribute.String;
    journeyImage: Schema.Attribute.Media<'images'>;
    journeyText: Schema.Attribute.Text;
    journeyTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::consideration-page.consideration-page'
    > &
      Schema.Attribute.Private;
    partners: Schema.Attribute.Component<'consideration.partner', true>;
    partnersSubtitle: Schema.Attribute.Text;
    partnersTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    quizDescription: Schema.Attribute.Text;
    quizQuestions: Schema.Attribute.Component<
      'consideration.quiz-question',
      true
    >;
    quizTitle: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiConstructionPageConstructionPage
  extends Struct.SingleTypeSchema {
  collectionName: 'construction_pages';
  info: {
    description: '';
    displayName: 'Construction Page';
    pluralName: 'construction-pages';
    singularName: 'construction-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accordionDetails: Schema.Attribute.Text;
    accordionImage: Schema.Attribute.Media<'images'>;
    accordionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    accordionTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    experienceHighlight: Schema.Attribute.String;
    experienceText: Schema.Attribute.Text;
    experienceTitle: Schema.Attribute.String;
    heroBody: Schema.Attribute.Text;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroWatermark: Schema.Attribute.String;
    innovationDescription: Schema.Attribute.Text;
    innovationItems: Schema.Attribute.Component<
      'construction.innovation-item',
      true
    >;
    innovationTitle: Schema.Attribute.String;
    journeyCtaText: Schema.Attribute.String;
    journeyCtaUrl: Schema.Attribute.String;
    journeyImage: Schema.Attribute.Media<'images'>;
    journeyText: Schema.Attribute.Text;
    journeyTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::construction-page.construction-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    quotes: Schema.Attribute.Component<'career.quote-item', true>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    statsTitle: Schema.Attribute.String;
    sustainabilityCards: Schema.Attribute.Component<
      'construction.sustainability-card',
      true
    >;
    sustainabilityText: Schema.Attribute.Text;
    sustainabilityTitle: Schema.Attribute.String;
    textColumns: Schema.Attribute.Component<'award.text-column', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactSubmissionContactSubmission
  extends Struct.CollectionTypeSchema {
  collectionName: 'contact_submissions';
  info: {
    description: 'Stores contact form submissions from the website';
    displayName: 'Contact Submission';
    pluralName: 'contact-submissions';
    singularName: 'contact-submission';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachments: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    companyName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    firstName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    inquiryType: Schema.Attribute.Enumeration<
      [
        'start-a-project',
        'general-inquiry',
        'partnership',
        'careers',
        'media',
        'other',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'start-a-project'>;
    lastName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-submission.contact-submission'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 5000;
      }>;
    phone: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 30;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactContact extends Struct.SingleTypeSchema {
  collectionName: 'contacts';
  info: {
    description: 'Contact page hero and content settings';
    displayName: 'Contact';
    pluralName: 'contacts';
    singularName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cultureCards: Schema.Attribute.Component<'shared.culture-card', true>;
    cultureDescription: Schema.Attribute.Text;
    cultureHeading: Schema.Attribute.String;
    cultureWatermark: Schema.Attribute.String;
    formDescription: Schema.Attribute.Text;
    formTitle: Schema.Attribute.String;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact.contact'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCorporateResponsibilityPageCorporateResponsibilityPage
  extends Struct.SingleTypeSchema {
  collectionName: 'corporate_responsibility_pages';
  info: {
    displayName: 'Corporate Responsibility Page';
    pluralName: 'corporate-responsibility-pages';
    singularName: 'corporate-responsibility-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    executives: Schema.Attribute.Relation<'oneToMany', 'api::team.team'>;
    executivesDescription: Schema.Attribute.Text;
    executivesTitle: Schema.Attribute.String;
    executivesWatermark: Schema.Attribute.String;
    featuredNews: Schema.Attribute.Relation<'oneToMany', 'api::news.news'>;
    foundationCtaText: Schema.Attribute.String;
    foundationCtaUrl: Schema.Attribute.String;
    foundationDescription: Schema.Attribute.Text;
    foundationImage: Schema.Attribute.Media<'images'>;
    foundationTitle: Schema.Attribute.String;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images' | 'videos' | 'files'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'images' | 'videos' | 'files'>;
    impactCtaText: Schema.Attribute.String;
    impactCtaUrl: Schema.Attribute.String;
    impactTitle: Schema.Attribute.String;
    impactWatermark: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::corporate-responsibility-page.corporate-responsibility-page'
    > &
      Schema.Attribute.Private;
    metrics: Schema.Attribute.Relation<'oneToMany', 'api::cr-metric.cr-metric'>;
    newsCtaText: Schema.Attribute.String;
    newsCtaUrl: Schema.Attribute.String;
    newsTitle: Schema.Attribute.String;
    newsWatermark: Schema.Attribute.String;
    pillars: Schema.Attribute.Relation<'oneToMany', 'api::cr-pillar.cr-pillar'>;
    pillarsDescription: Schema.Attribute.Text;
    pillarsTitle: Schema.Attribute.String;
    pillarsWatermark: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    quoteAuthorImage: Schema.Attribute.Media<'images'>;
    quoteAuthorName: Schema.Attribute.String;
    quoteAuthorPosition: Schema.Attribute.String;
    quoteText: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCrMetricCrMetric extends Struct.CollectionTypeSchema {
  collectionName: 'cr_metrics';
  info: {
    displayName: 'CR Metric';
    pluralName: 'cr-metrics';
    singularName: 'cr-metric';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::cr-metric.cr-metric'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApiCrPillarCrPillar extends Struct.CollectionTypeSchema {
  collectionName: 'cr_pillars';
  info: {
    displayName: 'CR Pillar';
    pluralName: 'cr-pillars';
    singularName: 'cr-pillar';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::cr-pillar.cr-pillar'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiExperiencePageExperiencePage
  extends Struct.SingleTypeSchema {
  collectionName: 'experience_pages';
  info: {
    description: 'Experience page with circular scroll animation';
    displayName: 'Experience Page';
    pluralName: 'experience-pages';
    singularName: 'experience-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    experience_steps: Schema.Attribute.Relation<
      'oneToMany',
      'api::experience-step.experience-step'
    >;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::experience-page.experience-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiExperienceStepExperienceStep
  extends Struct.CollectionTypeSchema {
  collectionName: 'experience_steps';
  info: {
    description: 'Individual steps in the circular experience journey';
    displayName: 'Experience Step';
    pluralName: 'experience-steps';
    singularName: 'experience-step';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaText: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::experience-step.experience-step'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiExpertiseExpertise extends Struct.CollectionTypeSchema {
  collectionName: 'expertises';
  info: {
    description: 'Expertise areas with icon and image';
    displayName: 'Expertise';
    pluralName: 'expertises';
    singularName: 'expertise';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    detail_discriptions: Schema.Attribute.Blocks;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::expertise.expertise'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGlobalGlobal extends Struct.SingleTypeSchema {
  collectionName: 'globals';
  info: {
    description: 'Site-wide settings, navigation, footer, and SEO';
    displayName: 'Global';
    pluralName: 'globals';
    singularName: 'global';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    bottomLinks: Schema.Attribute.Component<'shared.link', true>;
    copyright: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultSeo: Schema.Attribute.Component<'shared.seo', false>;
    favicon: Schema.Attribute.Media<'images'>;
    footerColumns: Schema.Attribute.Component<'shared.footer-column', true>;
    footerDescription: Schema.Attribute.Text;
    headerCtaText: Schema.Attribute.String;
    headerCtaUrl: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global.global'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    navLinks: Schema.Attribute.Component<'shared.link', true>;
    publishedAt: Schema.Attribute.DateTime;
    siteDescription: Schema.Attribute.Text;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    socialLinks: Schema.Attribute.Component<'shared.social-link', true>;
    sub_nav_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::sub-nav-item.sub-nav-item'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHomepageHomepage extends Struct.SingleTypeSchema {
  collectionName: 'homepages';
  info: {
    description: 'Homepage content including hero, stats, and CTA sections';
    displayName: 'Homepage';
    pluralName: 'homepages';
    singularName: 'homepage';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    belongCtaText: Schema.Attribute.String;
    belongDescription: Schema.Attribute.Text;
    belongHeading: Schema.Attribute.String;
    belongImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaCTAs: Schema.Attribute.Component<'shared.link', true>;
    ctaHighlightWord: Schema.Attribute.String;
    ctaSubtitle: Schema.Attribute.Text;
    ctaTitle: Schema.Attribute.String;
    experienceCtaText: Schema.Attribute.String;
    experienceDescription: Schema.Attribute.Text;
    experienceHeading: Schema.Attribute.Text;
    experienceHighlightText: Schema.Attribute.String;
    experienceImage: Schema.Attribute.Media<'images'>;
    expertise: Schema.Attribute.Relation<
      'oneToMany',
      'api::expertise.expertise'
    >;
    expertiseHeading: Schema.Attribute.String;
    expertiseSubheading: Schema.Attribute.String;
    heroBadge: Schema.Attribute.String;
    heroCTAs: Schema.Attribute.Component<'shared.link', true>;
    heroFeatured: Schema.Attribute.Component<'shared.hero-featured', false>;
    heroHighlightText: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroSubtitle: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'videos'>;
    introDescription: Schema.Attribute.Text;
    introHeading: Schema.Attribute.Text;
    introHighlightText: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::homepage.homepage'
    > &
      Schema.Attribute.Private;
    news: Schema.Attribute.Relation<'oneToMany', 'api::news.news'>;
    newsHeading: Schema.Attribute.Text;
    our_clients: Schema.Attribute.Relation<
      'oneToMany',
      'api::our-client.our-client'
    >;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    projectsHeading: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    sparkCtaText: Schema.Attribute.String;
    sparkCtaUrl: Schema.Attribute.String;
    sparkDescription: Schema.Attribute.Text;
    sparkHeading: Schema.Attribute.String;
    sparkImage: Schema.Attribute.Media<'images'>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInsightInsight extends Struct.CollectionTypeSchema {
  collectionName: 'insights';
  info: {
    displayName: 'Insight';
    pluralName: 'insights';
    singularName: 'insight';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::insight.insight'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInsightsPageInsightsPage extends Struct.SingleTypeSchema {
  collectionName: 'insights_pages';
  info: {
    displayName: 'Insights Page';
    pluralName: 'insights-pages';
    singularName: 'insights-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featuredCTA: Schema.Attribute.String;
    featuredInsights: Schema.Attribute.Relation<
      'oneToMany',
      'api::insight.insight'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::insights-page.insights-page'
    > &
      Schema.Attribute.Private;
    pageDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiJobJob extends Struct.CollectionTypeSchema {
  collectionName: 'jobs';
  info: {
    description: '';
    displayName: 'Job';
    pluralName: 'jobs';
    singularName: 'job';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applyUrl: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    department: Schema.Attribute.String;
    description: Schema.Attribute.Blocks;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    jobCode: Schema.Attribute.String;
    jobType: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::job.job'> &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiJobsPageJobsPage extends Struct.SingleTypeSchema {
  collectionName: 'jobs_pages';
  info: {
    description: '';
    displayName: 'Jobs Page';
    pluralName: 'jobs-pages';
    singularName: 'jobs-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutText: Schema.Attribute.Text;
    aboutTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fraudText: Schema.Attribute.Text;
    fraudTitle: Schema.Attribute.String;
    fraudUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroSubtitle: Schema.Attribute.String;
    heroTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::jobs-page.jobs-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLeadershipPageLeadershipPage
  extends Struct.SingleTypeSchema {
  collectionName: 'leadership_pages';
  info: {
    displayName: 'Leadership Page';
    pluralName: 'leadership-pages';
    singularName: 'leadership-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    groupPhoto: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::leadership-page.leadership-page'
    > &
      Schema.Attribute.Private;
    members: Schema.Attribute.Component<'shared.leadership-member', true>;
    pageDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLocationListLocationList
  extends Struct.CollectionTypeSchema {
  collectionName: 'location_lists';
  info: {
    displayName: 'Location List';
    pluralName: 'location-lists';
    singularName: 'location-list';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.Text;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::location-list.location-list'
    > &
      Schema.Attribute.Private;
    mapEmbedUrl: Schema.Attribute.String;
    phoneNumber: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    state: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiLocationLocation extends Struct.SingleTypeSchema {
  collectionName: 'locations';
  info: {
    displayName: 'Location';
    pluralName: 'locations';
    singularName: 'location';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    heroText: Schema.Attribute.String & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::location.location'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsPageNewsPage extends Struct.SingleTypeSchema {
  collectionName: 'news_pages';
  info: {
    description: 'News listing page settings and featured articles';
    displayName: 'News Page';
    pluralName: 'news-pages';
    singularName: 'news-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featuredCTA: Schema.Attribute.String;
    featuredNews: Schema.Attribute.Relation<'oneToMany', 'api::news.news'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-page.news-page'
    > &
      Schema.Attribute.Private;
    pageDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNewsNews extends Struct.CollectionTypeSchema {
  collectionName: 'newses';
  info: {
    description: 'News and insights articles';
    displayName: 'News';
    pluralName: 'newses';
    singularName: 'news';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.String;
    content: Schema.Attribute.Blocks;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::news.news'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    publishedDate: Schema.Attribute.Date;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOurClientOurClient extends Struct.CollectionTypeSchema {
  collectionName: 'our_clients';
  info: {
    displayName: 'Our Client';
    pluralName: 'our-clients';
    singularName: 'our-client';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::our-client.our-client'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPostConstructionPagePostConstructionPage
  extends Struct.SingleTypeSchema {
  collectionName: 'post_construction_pages';
  info: {
    displayName: 'Post-Construction page';
    pluralName: 'post-construction-pages';
    singularName: 'post-construction-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accordionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    conversationBlock: Schema.Attribute.Component<'spark.feature-block', true>;
    conversationText: Schema.Attribute.Text;
    conversationTitle: Schema.Attribute.String;
    conversationWatermark: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    heroText: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroWatermark: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::post-construction-page.post-construction-page'
    > &
      Schema.Attribute.Private;
    nextDetails: Schema.Attribute.String;
    nextImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    nextTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    quotes: Schema.Attribute.Component<'quote.quote', true>;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    stateText: Schema.Attribute.Text;
    stats: Schema.Attribute.Relation<'oneToMany', 'api::stat.stat'>;
    trustText: Schema.Attribute.Text;
    trustTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPreconstructionPagePreconstructionPage
  extends Struct.SingleTypeSchema {
  collectionName: 'preconstruction_pages';
  info: {
    description: '';
    displayName: 'Preconstruction Page';
    pluralName: 'preconstruction-pages';
    singularName: 'preconstruction-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accordionDetails: Schema.Attribute.Text;
    accordionImage: Schema.Attribute.Media<'images'>;
    accordionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    accordionTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroBody: Schema.Attribute.Text;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroWatermark: Schema.Attribute.String;
    journeyCtaText: Schema.Attribute.String;
    journeyCtaUrl: Schema.Attribute.String;
    journeyImage: Schema.Attribute.Media<'images'>;
    journeyText: Schema.Attribute.Text;
    journeyTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::preconstruction-page.preconstruction-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProjectProject extends Struct.CollectionTypeSchema {
  collectionName: 'projects';
  info: {
    description: 'Portfolio projects with category and image';
    displayName: 'Project';
    pluralName: 'projects';
    singularName: 'project';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    client: Schema.Attribute.String;
    contractValue: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    detail_discriptions: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    keyPartners: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    projectTypes: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    schedule: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    squareFeet: Schema.Attribute.String;
    teams: Schema.Attribute.Relation<'manyToMany', 'api::team.team'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    yearCompleted: Schema.Attribute.String;
  };
}

export interface ApiProjectsPageProjectsPage extends Struct.SingleTypeSchema {
  collectionName: 'projects_pages';
  info: {
    description: 'Projects listing page settings and featured projects';
    displayName: 'Projects Page';
    pluralName: 'projects-pages';
    singularName: 'projects-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featuredCTA: Schema.Attribute.String;
    featuredProjects: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::projects-page.projects-page'
    > &
      Schema.Attribute.Private;
    pageDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRdInnovationItemRdInnovationItem
  extends Struct.CollectionTypeSchema {
  collectionName: 'rd_innovation_items';
  info: {
    displayName: 'R&D Innovation Item';
    pluralName: 'rd-innovation-items';
    singularName: 'rd-innovation-item';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::rd-innovation-item.rd-innovation-item'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRdPageRdPage extends Struct.SingleTypeSchema {
  collectionName: 'rd_pages';
  info: {
    displayName: 'R&D Page';
    pluralName: 'rd-pages';
    singularName: 'rd-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contactCtaText: Schema.Attribute.String;
    contactCtaUrl: Schema.Attribute.String;
    contactDescription: Schema.Attribute.Text;
    contactTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featuredLeadership: Schema.Attribute.Relation<
      'oneToMany',
      'api::team.team'
    >;
    featuredNews: Schema.Attribute.Relation<'oneToMany', 'api::news.news'>;
    featuredProjects: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    >;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images' | 'videos' | 'files'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.Text & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'images' | 'videos' | 'files'>;
    innovationDescription: Schema.Attribute.Text;
    innovationItems: Schema.Attribute.Relation<
      'oneToMany',
      'api::rd-innovation-item.rd-innovation-item'
    >;
    innovationTitle: Schema.Attribute.String;
    innovationWatermark: Schema.Attribute.String;
    leadershipDescription: Schema.Attribute.Text;
    leadershipTitle: Schema.Attribute.String;
    leadershipWatermark: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::rd-page.rd-page'
    > &
      Schema.Attribute.Private;
    newsCtaText: Schema.Attribute.String;
    newsCtaUrl: Schema.Attribute.String;
    newsTitle: Schema.Attribute.String;
    newsWatermark: Schema.Attribute.String;
    partners: Schema.Attribute.Relation<
      'oneToMany',
      'api::our-client.our-client'
    >;
    partnersDescription: Schema.Attribute.Text;
    partnersTitle: Schema.Attribute.String;
    partnersWatermark: Schema.Attribute.String;
    pillars: Schema.Attribute.Relation<'oneToMany', 'api::rd-pillar.rd-pillar'>;
    pillarsDescription: Schema.Attribute.Text;
    pillarsTitle: Schema.Attribute.String;
    pillarsWatermark: Schema.Attribute.String;
    projectsDescription: Schema.Attribute.Text;
    projectsTitle: Schema.Attribute.String;
    projectsWatermark: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    quoteAuthorImage: Schema.Attribute.Media<'images'>;
    quoteAuthorName: Schema.Attribute.String;
    quoteAuthorPosition: Schema.Attribute.String;
    quoteText: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whyCards: Schema.Attribute.Relation<
      'oneToMany',
      'api::rd-why-card.rd-why-card'
    >;
    whyDescription: Schema.Attribute.Text;
    whyTitle: Schema.Attribute.String;
    whyWatermark: Schema.Attribute.String;
  };
}

export interface ApiRdPillarRdPillar extends Struct.CollectionTypeSchema {
  collectionName: 'rd_pillars';
  info: {
    displayName: 'R&D Pillar';
    pluralName: 'rd-pillars';
    singularName: 'rd-pillar';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::rd-pillar.rd-pillar'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiRdWhyCardRdWhyCard extends Struct.CollectionTypeSchema {
  collectionName: 'rd_why_cards';
  info: {
    displayName: 'R&D Why Card';
    pluralName: 'rd-why-cards';
    singularName: 'rd-why-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::rd-why-card.rd-why-card'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSafetySafety extends Struct.SingleTypeSchema {
  collectionName: 'safeties';
  info: {
    displayName: 'safety';
    pluralName: 'safeties';
    singularName: 'safety';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accordianDetails: Schema.Attribute.Text;
    accordianTitle: Schema.Attribute.String & Schema.Attribute.Required;
    accordionImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    accordionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    carouselCard: Schema.Attribute.Component<'shared.culture-card', true>;
    carouselText: Schema.Attribute.Text & Schema.Attribute.Required;
    carouselTitle: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    heroText: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVedio: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    leadership_cards: Schema.Attribute.Relation<'oneToMany', 'api::team.team'>;
    leadershipDetails: Schema.Attribute.Text;
    leadershipParallaxText: Schema.Attribute.String;
    leadershipTitle: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::safety.safety'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceService extends Struct.CollectionTypeSchema {
  collectionName: 'services';
  info: {
    displayName: 'Service';
    pluralName: 'services';
    singularName: 'service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accordion_items: Schema.Attribute.Component<'shared.accordion-item', true>;
    catagory: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    detail_discriptions: Schema.Attribute.Blocks;
    discriptions: Schema.Attribute.Text & Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    slug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    teams: Schema.Attribute.Relation<'manyToMany', 'api::team.team'>;
    testimonials: Schema.Attribute.Relation<
      'manyToMany',
      'api::testimonial.testimonial'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServicesPageServicesPage extends Struct.SingleTypeSchema {
  collectionName: 'services_pages';
  info: {
    description: 'Services listing page settings and featured services';
    displayName: 'Services Page';
    pluralName: 'services-pages';
    singularName: 'services-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featuredCTA: Schema.Attribute.String;
    featuredServices: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    >;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::services-page.services-page'
    > &
      Schema.Attribute.Private;
    pageDescription: Schema.Attribute.Text;
    pageTitle: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSparkPageSparkPage extends Struct.SingleTypeSchema {
  collectionName: 'spark_pages';
  info: {
    description: '';
    displayName: 'Spark Page';
    pluralName: 'spark-pages';
    singularName: 'spark-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blocks: Schema.Attribute.Component<'spark.feature-block', true>;
    contactDescription: Schema.Attribute.Text;
    contactTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroVideo: Schema.Attribute.Media<'videos'>;
    introHeading: Schema.Attribute.Text;
    introHighlight: Schema.Attribute.String;
    introText: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::spark-page.spark-page'
    > &
      Schema.Attribute.Private;
    newsTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statementHeading: Schema.Attribute.Text;
    statementHighlight: Schema.Attribute.String;
    statementImage: Schema.Attribute.Media<'images'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wideCaption: Schema.Attribute.Text;
    wideImage: Schema.Attribute.Media<'images'>;
  };
}

export interface ApiStatStat extends Struct.CollectionTypeSchema {
  collectionName: 'stats';
  info: {
    description: 'Reusable statistic (value, suffix, label) shared across pages';
    displayName: 'Stat';
    pluralName: 'stats';
    singularName: 'stat';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::stat.stat'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    suffix: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApiSubNavItemSubNavItem extends Struct.CollectionTypeSchema {
  collectionName: 'sub_nav_items';
  info: {
    displayName: 'Sub Nav Item';
    pluralName: 'sub-nav-items';
    singularName: 'sub-nav-item';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sub-nav-item.sub-nav-item'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.String;
    subItems: Schema.Attribute.Component<'sub-nav.sub-nav', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSubcontractorsPageSubcontractorsPage
  extends Struct.SingleTypeSchema {
  collectionName: 'subcontractors_pages';
  info: {
    description: 'Subcontractors page with hero, quotes, onboarding, trade partners, and FAQ';
    displayName: 'Subcontractors Page';
    pluralName: 'subcontractors-pages';
    singularName: 'subcontractors-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faqDescription: Schema.Attribute.Text;
    faqItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    faqTitle: Schema.Attribute.String;
    formDescription: Schema.Attribute.Text;
    formTitle: Schema.Attribute.String;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVideo: Schema.Attribute.Media<'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::subcontractors-page.subcontractors-page'
    > &
      Schema.Attribute.Private;
    onboardingCtaText: Schema.Attribute.String;
    onboardingCtaUrl: Schema.Attribute.String;
    onboardingExtraRequirements: Schema.Attribute.Component<
      'shared.onboarding-item',
      true
    >;
    onboardingExtraTitle: Schema.Attribute.String;
    onboardingRequirements: Schema.Attribute.Component<
      'shared.onboarding-item',
      true
    >;
    onboardingTitle: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    quotes: Schema.Attribute.Component<'shared.subcontractor-quote', true>;
    quoteTitle: Schema.Attribute.String;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    tradePartnersDescription: Schema.Attribute.Text;
    tradePartnersTitle: Schema.Attribute.String;
    tradePartnerTabs: Schema.Attribute.Component<
      'shared.trade-partner-tab',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSustainabilitySustainability
  extends Struct.SingleTypeSchema {
  collectionName: 'sustainabilities';
  info: {
    description: 'Sustainability page content';
    displayName: 'Sustainability Page';
    pluralName: 'sustainabilities';
    singularName: 'sustainability';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accordionDetails: Schema.Attribute.Text;
    accordionImage: Schema.Attribute.Media<'images'>;
    accordionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    accordionTitle: Schema.Attribute.String;
    carouselCards: Schema.Attribute.Component<'shared.culture-card', true>;
    carouselText: Schema.Attribute.Text;
    carouselTitle: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroImage: Schema.Attribute.Media<'images' | 'videos'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroVideo: Schema.Attribute.Media<'videos'>;
    leadershipCards: Schema.Attribute.Relation<'oneToMany', 'api::team.team'>;
    leadershipDetails: Schema.Attribute.Text;
    leadershipParallaxText: Schema.Attribute.String;
    leadershipTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sustainability.sustainability'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTeamPageTeamPage extends Struct.SingleTypeSchema {
  collectionName: 'team_pages';
  info: {
    displayName: 'Team Page';
    pluralName: 'team-pages';
    singularName: 'team-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    heroText: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVedio: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-page.team-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTeamTeam extends Struct.CollectionTypeSchema {
  collectionName: 'teams';
  info: {
    displayName: 'Team';
    pluralName: 'teams';
    singularName: 'team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bio: Schema.Attribute.Text;
    catagory: Schema.Attribute.Enumeration<
      ['Key Leadership', 'Executive Leadership', 'Senior Leadership']
    > &
      Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::team.team'> &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    services: Schema.Attribute.Relation<'manyToMany', 'api::service.service'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Struct.CollectionTypeSchema {
  collectionName: 'testimonials';
  info: {
    displayName: 'Testimonial';
    pluralName: 'testimonials';
    singularName: 'testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_name: Schema.Attribute.String & Schema.Attribute.Required;
    company: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    designation: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    services: Schema.Attribute.Relation<'manyToMany', 'api::service.service'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTimelineEntryTimelineEntry
  extends Struct.CollectionTypeSchema {
  collectionName: 'timeline_entries';
  info: {
    description: 'History timeline entries with decade, description, and image';
    displayName: 'Timeline Entry';
    pluralName: 'timeline-entries';
    singularName: 'timeline-entry';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cta: Schema.Attribute.Component<'shared.link', false>;
    decade: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::timeline-entry.timeline-entry'
    > &
      Schema.Attribute.Private;
    milestones: Schema.Attribute.Component<'timeline.milestone', true>;
    order: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiToolsAndTechnologyToolsAndTechnology
  extends Struct.SingleTypeSchema {
  collectionName: 'tools_and_technologies';
  info: {
    displayName: 'Tools and Technology';
    pluralName: 'tools-and-technologies';
    singularName: 'tools-and-technology';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accordianDetails: Schema.Attribute.Text;
    accordianTitle: Schema.Attribute.String & Schema.Attribute.Required;
    accordionImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    accordionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    carouselCard: Schema.Attribute.Component<'shared.culture-card', true>;
    carouselText: Schema.Attribute.Text & Schema.Attribute.Required;
    carouselTitle: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    heroImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    heroText: Schema.Attribute.Text & Schema.Attribute.Required;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
    heroVedio: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    leadership_cards: Schema.Attribute.Relation<'oneToMany', 'api::team.team'>;
    leadershipDetails: Schema.Attribute.Text;
    leadershipParallaxText: Schema.Attribute.String;
    leadershipTitle: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tools-and-technology.tools-and-technology'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    statItems: Schema.Attribute.Relation<'manyToMany', 'api::stat.stat'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiYouBelongHerePageYouBelongHerePage
  extends Struct.SingleTypeSchema {
  collectionName: 'you_belong_here_pages';
  info: {
    description: 'You Belong Here page content';
    displayName: 'You Belong Here Page';
    pluralName: 'you-belong-here-pages';
    singularName: 'you-belong-here-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accomplishments: Schema.Attribute.Component<'shared.accordion-item', true>;
    accomplishmentsSubtitle: Schema.Attribute.String;
    accomplishmentsTitle: Schema.Attribute.String;
    accomplishmentsWatermark: Schema.Attribute.String;
    belongingDescription: Schema.Attribute.Text;
    belongingItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    belongingTitle: Schema.Attribute.String;
    belongingWatermark: Schema.Attribute.String;
    careersCtaText: Schema.Attribute.String;
    careersCtaUrl: Schema.Attribute.String;
    careersImage: Schema.Attribute.Media<'images'>;
    careersText: Schema.Attribute.Text;
    careersWatermark: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featuredLeadership: Schema.Attribute.Relation<
      'manyToMany',
      'api::team.team'
    >;
    featuredNews: Schema.Attribute.Relation<'manyToMany', 'api::news.news'>;
    goals: Schema.Attribute.Component<'shared.accordion-item', true>;
    goalsDescription: Schema.Attribute.Text;
    goalsTitle: Schema.Attribute.String;
    goalsWatermark: Schema.Attribute.String;
    heroCtaText: Schema.Attribute.String;
    heroCtaUrl: Schema.Attribute.String;
    heroImage: Schema.Attribute.Media<'images'>;
    heroText: Schema.Attribute.Text;
    heroTitle: Schema.Attribute.String;
    heroVideo: Schema.Attribute.Media<'videos'>;
    leadershipDescription: Schema.Attribute.Text;
    leadershipTitle: Schema.Attribute.String;
    leadershipWatermark: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::you-belong-here-page.you-belong-here-page'
    > &
      Schema.Attribute.Private;
    missionDescription: Schema.Attribute.Text;
    missionItems: Schema.Attribute.Component<'shared.accordion-item', true>;
    missionTitle: Schema.Attribute.String;
    missionWatermark: Schema.Attribute.String;
    newsCtaText: Schema.Attribute.String;
    newsCtaUrl: Schema.Attribute.String;
    newsTitle: Schema.Attribute.String;
    newsWatermark: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    quoteAuthorImage: Schema.Attribute.Media<'images'>;
    quoteAuthorName: Schema.Attribute.String;
    quoteAuthorPosition: Schema.Attribute.String;
    quoteText: Schema.Attribute.Text;
    seo: Schema.Attribute.Component<'shared.seo', false>;
    subcontractorsCtaText: Schema.Attribute.String;
    subcontractorsCtaUrl: Schema.Attribute.String;
    subcontractorsImage: Schema.Attribute.Media<'images'>;
    subcontractorsText: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    focalPoint: Schema.Attribute.JSON;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about.about': ApiAboutAbout;
      'api::award-page.award-page': ApiAwardPageAwardPage;
      'api::career-page.career-page': ApiCareerPageCareerPage;
      'api::colab-page.colab-page': ApiColabPageColabPage;
      'api::consideration-page.consideration-page': ApiConsiderationPageConsiderationPage;
      'api::construction-page.construction-page': ApiConstructionPageConstructionPage;
      'api::contact-submission.contact-submission': ApiContactSubmissionContactSubmission;
      'api::contact.contact': ApiContactContact;
      'api::corporate-responsibility-page.corporate-responsibility-page': ApiCorporateResponsibilityPageCorporateResponsibilityPage;
      'api::cr-metric.cr-metric': ApiCrMetricCrMetric;
      'api::cr-pillar.cr-pillar': ApiCrPillarCrPillar;
      'api::experience-page.experience-page': ApiExperiencePageExperiencePage;
      'api::experience-step.experience-step': ApiExperienceStepExperienceStep;
      'api::expertise.expertise': ApiExpertiseExpertise;
      'api::global.global': ApiGlobalGlobal;
      'api::homepage.homepage': ApiHomepageHomepage;
      'api::insight.insight': ApiInsightInsight;
      'api::insights-page.insights-page': ApiInsightsPageInsightsPage;
      'api::job.job': ApiJobJob;
      'api::jobs-page.jobs-page': ApiJobsPageJobsPage;
      'api::leadership-page.leadership-page': ApiLeadershipPageLeadershipPage;
      'api::location-list.location-list': ApiLocationListLocationList;
      'api::location.location': ApiLocationLocation;
      'api::news-page.news-page': ApiNewsPageNewsPage;
      'api::news.news': ApiNewsNews;
      'api::our-client.our-client': ApiOurClientOurClient;
      'api::post-construction-page.post-construction-page': ApiPostConstructionPagePostConstructionPage;
      'api::preconstruction-page.preconstruction-page': ApiPreconstructionPagePreconstructionPage;
      'api::project.project': ApiProjectProject;
      'api::projects-page.projects-page': ApiProjectsPageProjectsPage;
      'api::rd-innovation-item.rd-innovation-item': ApiRdInnovationItemRdInnovationItem;
      'api::rd-page.rd-page': ApiRdPageRdPage;
      'api::rd-pillar.rd-pillar': ApiRdPillarRdPillar;
      'api::rd-why-card.rd-why-card': ApiRdWhyCardRdWhyCard;
      'api::safety.safety': ApiSafetySafety;
      'api::service.service': ApiServiceService;
      'api::services-page.services-page': ApiServicesPageServicesPage;
      'api::spark-page.spark-page': ApiSparkPageSparkPage;
      'api::stat.stat': ApiStatStat;
      'api::sub-nav-item.sub-nav-item': ApiSubNavItemSubNavItem;
      'api::subcontractors-page.subcontractors-page': ApiSubcontractorsPageSubcontractorsPage;
      'api::sustainability.sustainability': ApiSustainabilitySustainability;
      'api::team-page.team-page': ApiTeamPageTeamPage;
      'api::team.team': ApiTeamTeam;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::timeline-entry.timeline-entry': ApiTimelineEntryTimelineEntry;
      'api::tools-and-technology.tools-and-technology': ApiToolsAndTechnologyToolsAndTechnology;
      'api::you-belong-here-page.you-belong-here-page': ApiYouBelongHerePageYouBelongHerePage;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
