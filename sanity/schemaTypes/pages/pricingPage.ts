import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Pricing Page',
      readOnly: true
    }),
    // Hero Section
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text'
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'blockContent'
    }),
    // Pricing Tiers
    defineField({
      name: 'pricingTiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingTier',
          title: 'Pricing Tier',
          fields: [
            { name: 'name', title: 'Tier Name', type: 'string', validation: Rule => Rule.required() },
            { name: 'price', title: 'Price', type: 'string' },
            { name: 'period', title: 'Billing Period', type: 'string', description: 'e.g., per month, per project' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
            { 
              name: 'callToAction', 
              title: 'Call to Action', 
              type: 'object',
              fields: [
                { name: 'text', title: 'Button Text', type: 'string' },
                { name: 'link', title: 'Button Link', type: 'string' },
                { name: 'style', title: 'Button Style', type: 'string' }
              ]
            }
          ]
        }
      ]
    }),
    // Value Proposition
    defineField({
      name: 'valueProposition',
      title: 'Value Proposition',
      type: 'blockContent'
    }),
    // Comparison Points
    defineField({
      name: 'comparisonPoints',
      title: 'Comparison Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'point', title: 'Point Title', type: 'string' },
            { name: 'cost', title: 'Cost', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ]
    }),
    // FAQs
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
            }
          }
        }
      ]
    }),
    // Call to Action
    defineField({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'callToAction'
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
        { name: 'ogImage', title: 'Social Media Image', type: 'image' }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Pricing Page'
      }
    }
  }
})
