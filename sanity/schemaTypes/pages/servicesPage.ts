import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Services Page',
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
    // How It Works Section
    defineField({
      name: 'howItWorksTitle',
      title: 'How It Works Title',
      type: 'string'
    }),
    defineField({
      name: 'howItWorksDescription',
      title: 'How It Works Description',
      type: 'text'
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Number', type: 'number' },
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text' }
          ]
        }
      ]
    }),
    // Core Services Section
    defineField({
      name: 'coreServicesTitle',
      title: 'Core Services Title',
      type: 'string'
    }),
    defineField({
      name: 'coreServicesDescription',
      title: 'Core Services Description',
      type: 'text'
    }),
    // Main Services
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'service',
          title: 'Service',
          fields: [
            { name: 'title', title: 'Service Title', type: 'string', validation: Rule => Rule.required() },
            { name: 'description', title: 'Service Description', type: 'text' },
            { name: 'features', title: 'Key Features', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    }),
    // Service Matrix/Comparison
    defineField({
      name: 'serviceMatrix',
      title: 'Service Comparison Matrix',
      type: 'object',
      fields: [
        { name: 'title', title: 'Matrix Title', type: 'string' },
        { name: 'description', title: 'Matrix Description', type: 'text' },
        { name: 'image', title: 'Matrix Image', type: 'image' }
      ]
    }),
    // Testimonials
    defineField({
      name: 'testimonials',
      title: 'Service Testimonials',
      type: 'array',
      of: [{ type: 'testimonial' }]
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
        title: 'Services Page'
      }
    }
  }
})
