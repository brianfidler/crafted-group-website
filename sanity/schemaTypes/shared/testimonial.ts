import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string'
    }),
    defineField({
      name: 'position',
      title: 'Position/Title',
      type: 'string'
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Display prominently on homepage and key pages',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      media: 'image'
    }
  }
})
