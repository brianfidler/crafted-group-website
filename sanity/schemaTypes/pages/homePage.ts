import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page',
      readOnly: true
    }),
    // Hero Section
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
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
      name: 'heroCallToAction',
      title: 'Hero Call to Action',
      type: 'callToAction'
    }),
    // Stats Section
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'statistic' }],
      validation: Rule => Rule.max(4)
    }),
    // Services Overview
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'string'
    }),
    defineField({
      name: 'servicesDescription',
      title: 'Services Section Description',
      type: 'text'
    }),
    // Testimonials
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string'
    }),
    defineField({
      name: 'featuredTestimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [{ type: 'testimonial' }],
      validation: Rule => Rule.max(3)
    }),
    // Client Logos
    defineField({
      name: 'clientLogos',
      title: 'Client Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'logo', title: 'Logo', type: 'image' },
            { name: 'companyName', title: 'Company Name', type: 'string' },
            { name: 'website', title: 'Website URL', type: 'url' }
          ]
        }
      ]
    }),
    // Final CTA
    defineField({
      name: 'finalCallToAction',
      title: 'Final Call to Action',
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
        title: 'Home Page'
      }
    }
  }
})
