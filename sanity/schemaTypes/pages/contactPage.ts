import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Contact Page',
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
    // Contact Methods
    defineField({
      name: 'contactMethods',
      title: 'Contact Methods',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email Address', type: 'string' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'businessHours', title: 'Business Hours', type: 'string' },
        { 
          name: 'socialMedia', 
          title: 'Social Media', 
          type: 'object',
          fields: [
            { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
            { name: 'twitter', title: 'Twitter URL', type: 'url' }
          ]
        }
      ]
    }),
    // Form Configuration
    defineField({
      name: 'formSettings',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        { name: 'title', title: 'Form Title', type: 'string' },
        { name: 'description', title: 'Form Description', type: 'text' },
        { name: 'fields', title: 'Form Fields', type: 'array', of: [{ type: 'string' }] },
        { name: 'submitButton', title: 'Submit Button Text', type: 'string' },
        { name: 'successMessage', title: 'Success Message', type: 'text' }
      ]
    }),
    // Calendly Integration
    defineField({
      name: 'calendlyIntegration',
      title: 'Calendly Integration',
      type: 'object',
      fields: [
        { name: 'title', title: 'Calendar Section Title', type: 'string' },
        { name: 'description', title: 'Calendar Description', type: 'text' },
        { name: 'calendlyUrl', title: 'Calendly URL', type: 'url' },
        { name: 'buttonText', title: 'Button Text', type: 'string' }
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
        title: 'Contact Page'
      }
    }
  }
})
