import type { Schema, Struct } from '@strapi/strapi';

export interface ColabChallengeCard extends Struct.ComponentSchema {
  collectionName: 'components_colab_challenge_cards';
  info: {
    description: 'CoLab challenge card with image and hover description';
    displayName: 'ChallengeCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer;
  };
}

export interface ColabElementCard extends Struct.ComponentSchema {
  collectionName: 'components_colab_element_cards';
  info: {
    description: 'CoLab element tab with image and content';
    displayName: 'ElementCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    description2: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
    title2: Schema.Attribute.String;
  };
}

export interface ColabInnovationItem extends Struct.ComponentSchema {
  collectionName: 'components_colab_innovation_items';
  info: {
    description: 'CoLab innovation item with title, description, and image';
    displayName: 'InnovationItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface SharedCultureCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_culture_cards';
  info: {
    description: 'A card for the culture section with image, tag, and title';
    displayName: 'Culture Card';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
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

export interface SharedLeadershipBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_leadership_blocks';
  info: {
    description: 'A leadership feature block with image, description, and CTA';
    displayName: 'Leadership Block';
    icon: 'users';
  };
  attributes: {
    ctaText: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    watermark: Schema.Attribute.String;
  };
}

export interface SharedLeadershipMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_leadership_members';
  info: {
    description: 'A leadership team member with full detail fields';
    displayName: 'Leadership Member';
    icon: 'user';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    ctaText: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    linkedinUrl: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text;
  };
}

export interface SharedLifeImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_life_images';
  info: {
    description: 'A single image for the Life at Mazarini section';
    displayName: 'Life Image';
    icon: 'landscape';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
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

export interface SharedRelatedItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_items';
  info: {
    description: 'Card for You Might Be Interested In section';
    displayName: 'RelatedItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
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
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    linkTo: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'colab.challenge-card': ColabChallengeCard;
      'colab.element-card': ColabElementCard;
      'colab.innovation-item': ColabInnovationItem;
      'shared.accordion-item': SharedAccordionItem;
      'shared.culture-card': SharedCultureCard;
      'shared.footer-column': SharedFooterColumn;
      'shared.hero-featured': SharedHeroFeatured;
      'shared.leadership-block': SharedLeadershipBlock;
      'shared.leadership-member': SharedLeadershipMember;
      'shared.life-image': SharedLifeImage;
      'shared.link': SharedLink;
      'shared.media': SharedMedia;
      'shared.onboarding-item': SharedOnboardingItem;
      'shared.quote': SharedQuote;
      'shared.related-item': SharedRelatedItem;
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
