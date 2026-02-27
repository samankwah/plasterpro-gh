import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Ceilings', value: 'Ceilings'},
          {title: 'Lighting', value: 'Lighting'},
          {title: 'Hardware', value: 'Hardware'},
          {title: 'Profiles', value: 'Profiles'},
          {title: 'Materials', value: 'Materials'},
          {title: 'Services', value: 'Services'},
          {title: 'Paints', value: 'Paints'},
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (0–5)',
      type: 'number',
      validation: (R) => R.min(0).max(5),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      options: {layout: 'grid'},
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order (lower = appears first)',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{field: 'displayOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'images.0',
    },
    prepare(selection) {
      return {title: selection.title, subtitle: selection.category, media: selection.media}
    },
  },
})
