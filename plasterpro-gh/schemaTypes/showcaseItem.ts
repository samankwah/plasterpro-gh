import {defineField, defineType} from 'sanity'

export const showcaseItem = defineType({
  name: 'showcaseItem',
  title: 'Showcase Item',
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
      title: 'Short Description (shown on card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label (e.g. Best Seller, New, Premium)',
      type: 'string',
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
    defineField({
      name: 'detailDescription',
      title: 'Detail Description (shown in modal)',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Add one feature per item',
    }),
    defineField({
      name: 'commonUses',
      title: 'Common Uses',
      type: 'text',
      rows: 2,
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
      badge: 'badge',
      media: 'images.0',
    },
    prepare(selection) {
      return {title: selection.title, subtitle: selection.badge, media: selection.media}
    },
  },
})
