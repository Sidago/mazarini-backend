import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAccordionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_accordion_items';
  info: {
    description: 'Accordion item with title and description';
    displayName: 'AccordionItem';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    description: 'Footer link column with title and links';
    displayName: 'Footer Column';
    icon: 'layout';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHeroFeatured extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_featureds';
  info: {
    description: 'Featured project overlay on hero image';
    displayName: 'Hero Featured';
    icon: 'star';
  };
  attributes: {
    location: Schema.Attribute.String;
    projectName: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Reusable link with text, URL, and variant';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'outline', 'text']> &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    description: 'Single media file block';
    displayName: 'Media';
    icon: 'picture';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'> &
      Schema.Attribute.Required;
  };
}

export interface SharedOnboardingItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_onboarding_items';
  info: {
    description: 'Single onboarding requirement text';
    displayName: 'OnboardingItem';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    description: 'Quote block with title and body';
    displayName: 'Quote';
    icon: 'quote';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: 'Rich text content block';
    displayName: 'Rich Text';
    icon: 'pencil';
  };
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata for pages';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media platform link';
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['linkedin', 'twitter', 'instagram', 'facebook', 'youtube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    description: 'Statistic with value, optional suffix, and label';
    displayName: 'Stat';
    icon: 'chartBubble';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSubcontractorQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_subcontractor_quotes';
  info: {
    description: 'Quote with author name, company, and designation';
    displayName: 'SubcontractorQuote';
  };
  attributes: {
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    company: Schema.Attribute.String;
    designation: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedTradePartnerTab extends Struct.ComponentSchema {
  collectionName: 'components_shared_trade_partner_tabs';
  info: {
    description: 'Tab for celebrating trade partners section';
    displayName: 'TradePartnerTab';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    tabName: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SubNavSubNav extends Struct.ComponentSchema {
  collectionName: 'components_sub_nav_sub_navs';
  info: {
    displayName: 'Sub Nav';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    linkTo: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.accordion-item': SharedAccordionItem;
      'shared.footer-column': SharedFooterColumn;
      'shared.hero-featured': SharedHeroFeatured;
      'shared.link': SharedLink;
      'shared.media': SharedMedia;
      'shared.onboarding-item': SharedOnboardingItem;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
      'shared.subcontractor-quote': SharedSubcontractorQuote;
      'shared.trade-partner-tab': SharedTradePartnerTab;
      'sub-nav.sub-nav': SubNavSubNav;
    }
  }
}
