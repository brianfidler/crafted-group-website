import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statistic',
  title: 'Statistic',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'e.g., "3x", "200%", "500+"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Leads Generated", "Revenue Growth"',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional additional context'
    })
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'label'
    }
  }
})
