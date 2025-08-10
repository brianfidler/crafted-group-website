import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Page',
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
    // Personal Story
    defineField({
      name: 'personalStory',
      title: 'Personal Story',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),
    // Experience Section
    defineField({
      name: 'experienceTitle',
      title: 'Experience Section Title',
      type: 'string'
    }),
    defineField({
      name: 'experienceContent',
      title: 'Experience Content',
      type: 'blockContent'
    }),
    // Expertise Areas
    defineField({
      name: 'expertiseTitle',
      title: 'Expertise Section Title',
      type: 'string'
    }),
    defineField({
      name: 'expertiseAreas',
      title: 'Areas of Expertise',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'area', title: 'Expertise Area', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon/Image', type: 'image' }
          ]
        }
      ]
    }),
    // Values/Philosophy
    defineField({
      name: 'philosophyTitle',
      title: 'Philosophy Section Title',
      type: 'string'
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophy/Values',
      type: 'blockContent'
    }),
    // Location/Contact Info
    defineField({
      name: 'locationInfo',
      title: 'Location Information',
      type: 'text'
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
        title: 'About Page'
      }
    }
  }
})
