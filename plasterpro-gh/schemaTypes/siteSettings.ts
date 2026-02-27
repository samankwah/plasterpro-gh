import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ── Hero Section ──────────────────────────────────────
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'e.g. "Elevate Your Space with PlasterPro Ghana"',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Sub-text',
      type: 'text',
      rows: 3,
      description: 'The paragraph below the headline on the home page.',
    }),
    defineField({
      name: 'scrollingBanner',
      title: 'Scrolling Banner Items',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Add each label that scrolls across the banner (e.g. "POP CEILINGS")',
    }),

    // ── Contact Info ──────────────────────────────────────
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'e.g. "East Legon Hills, Accra"',
    }),
    defineField({
      name: 'phone1',
      title: 'Primary Phone',
      type: 'string',
      description: 'e.g. "+233 249 718 356"',
    }),
    defineField({
      name: 'phone2',
      title: 'Secondary Phone (optional)',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (digits only, no + or spaces)',
      type: 'string',
      description: 'e.g. "233249718356"',
    }),

    // ── Office Hours ──────────────────────────────────────
    defineField({
      name: 'mondayFridayHours',
      title: 'Monday – Friday Hours',
      type: 'string',
      description: 'e.g. "9:00 AM - 5:00 PM"',
    }),
    defineField({
      name: 'saturdayHours',
      title: 'Saturday Hours',
      type: 'string',
      description: 'e.g. "10:00 AM - 5:00 PM"',
    }),
    defineField({
      name: 'sundayStatus',
      title: 'Sunday Status',
      type: 'string',
      description: 'e.g. "Closed"',
    }),

    // ── FAQs ─────────────────────────────────────────────
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (R) => R.required(),
            }),
          ],
          preview: {
            select: {title: 'question'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
