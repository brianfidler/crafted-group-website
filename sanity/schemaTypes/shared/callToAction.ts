import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL or path (e.g., /contact, https://calendly.com/...)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'style',
      title: 'CTA Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' }
        ]
      },
      initialValue: 'primary'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
          { title: 'Accent', value: 'accent' }
        ]
      },
      initialValue: 'none'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'buttonText'
    }
  }
})
