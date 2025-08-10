import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudiesPage',
  title: 'Case Studies Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Case Studies Page',
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
    // Case Studies
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'caseStudy',
          title: 'Case Study',
          fields: [
            { name: 'title', title: 'Case Study Title', type: 'string', validation: Rule => Rule.required() },
            { name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title' } },
            { name: 'client', title: 'Client Name', type: 'string' },
            { name: 'industry', title: 'Industry', type: 'string' },
            { name: 'challenge', title: 'Challenge', type: 'blockContent' },
            { name: 'solution', title: 'Solution', type: 'blockContent' },
            { name: 'results', title: 'Results', type: 'blockContent' },
            { name: 'image', title: 'Featured Image', type: 'image', options: { hotspot: true } },
            { name: 'beforeStats', title: 'Before Stats', type: 'array', of: [{ type: 'statistic' }] },
            { name: 'afterStats', title: 'After Stats', type: 'array', of: [{ type: 'statistic' }] },
            { name: 'testimonial', title: 'Client Testimonial', type: 'testimonial' },
            { name: 'featured', title: 'Featured Case Study', type: 'boolean', initialValue: false },
            { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    }),
    // Success Metrics
    defineField({
      name: 'successMetrics',
      title: 'Overall Success Metrics',
      type: 'object',
      fields: [
        { name: 'title', title: 'Metrics Section Title', type: 'string' },
        { name: 'stats', title: 'Key Statistics', type: 'array', of: [{ type: 'statistic' }] }
      ]
    }),
    // Process Overview
    defineField({
      name: 'processOverview',
      title: 'Process Overview',
      type: 'object',
      fields: [
        { name: 'title', title: 'Process Section Title', type: 'string' },
        { name: 'description', title: 'Process Description', type: 'blockContent' }
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
        title: 'Case Studies Page'
      }
    }
  }
})
