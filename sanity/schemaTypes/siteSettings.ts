import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    }),
    // Contact Information
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'address', title: 'Address', type: 'text' },
        { name: 'businessHours', title: 'Business Hours', type: 'text' }
      ]
    }),
    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' }
      ]
    }),
    // Analytics & Integrations
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        { name: 'googleAnalyticsId', title: 'Google Analytics ID', type: 'string' },
        { name: 'googleTagManagerId', title: 'Google Tag Manager ID', type: 'string' },
        { name: 'facebookPixelId', title: 'Facebook Pixel ID', type: 'string' }
      ]
    }),
    // Marketing Integrations
    defineField({
      name: 'integrations',
      title: 'Marketing Integrations',
      type: 'object',
      fields: [
        { name: 'calendlyUrl', title: 'Default Calendly URL', type: 'url' },
        { name: 'activeCampaignFormId', title: 'ActiveCampaign Default Form ID', type: 'string' },
        { name: 'stripePublishableKey', title: 'Stripe Publishable Key', type: 'string' }
      ]
    }),
    // Global CTAs
    defineField({
      name: 'globalCtas',
      title: 'Global Call-to-Actions',
      type: 'object',
      fields: [
        { name: 'primaryCta', title: 'Primary CTA', type: 'callToAction' },
        { name: 'secondaryCta', title: 'Secondary CTA', type: 'callToAction' },
        { name: 'exitIntentCta', title: 'Exit-Intent CTA', type: 'callToAction' }
      ]
    }),
    // Footer Content
    defineField({
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        { name: 'copyrightText', title: 'Copyright Text', type: 'string' },
        { name: 'additionalLinks', title: 'Additional Footer Links', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Link Title', type: 'string' },
              { name: 'url', title: 'URL', type: 'string' }
            ]
          }
        ] },
        { name: 'newsletterSignup', title: 'Newsletter Signup', type: 'object', fields: [
          { name: 'title', title: 'Signup Title', type: 'string' },
          { name: 'description', title: 'Signup Description', type: 'text' },
          { name: 'placeholder', title: 'Email Placeholder', type: 'string' },
          { name: 'buttonText', title: 'Button Text', type: 'string' }
        ] }
      ]
    }),
    // SEO Defaults
    defineField({
      name: 'seoDefaults',
      title: 'Default SEO Settings',
      type: 'object',
      fields: [
        { name: 'defaultMetaTitle', title: 'Default Meta Title', type: 'string' },
        { name: 'defaultMetaDescription', title: 'Default Meta Description', type: 'text' },
        { name: 'defaultOgImage', title: 'Default Social Media Image', type: 'image' },
        { name: 'twitterHandle', title: 'Twitter Handle', type: 'string' }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
})
