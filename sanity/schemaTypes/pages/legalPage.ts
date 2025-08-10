import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Terms of Service', value: 'terms' },
          { title: 'Cookie Policy', value: 'cookies' },
          { title: 'Disclaimer', value: 'disclaimer' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' },
        { name: 'noIndex', title: 'No Index (hide from search engines)', type: 'boolean', initialValue: true }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType'
    },
    prepare({ title, pageType }) {
      return {
        title: title,
        subtitle: pageType ? pageType.toUpperCase() : ''
      }
    }
  }
})
