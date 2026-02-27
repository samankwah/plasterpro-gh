export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: only one document of this type should exist
  __experimental_actions: ["update", "publish"],
  fields: [
    // ── Hero Section ──────────────────────────────────────
    {
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: 'e.g. "Elevate Your Space with PlasterPro Ghana"',
    },
    {
      name: "heroSubtext",
      title: "Hero Sub-text",
      type: "text",
      rows: 3,
      description: "The paragraph below the headline on the home page.",
    },
    {
      name: "scrollingBanner",
      title: "Scrolling Banner Items",
      type: "array",
      of: [{ type: "string" }],
      description:
        'Add each label that scrolls across the banner (e.g. "POP CEILINGS", "LIGHTING SOLUTIONS")',
    },

    // ── Contact Info ──────────────────────────────────────
    {
      name: "address",
      title: "Address",
      type: "string",
      description: 'e.g. "East Legon Hills, Accra"',
    },
    {
      name: "phone1",
      title: "Primary Phone",
      type: "string",
      description: 'e.g. "+233 249 718 356"',
    },
    {
      name: "phone2",
      title: "Secondary Phone (optional)",
      type: "string",
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
    },
    {
      name: "whatsappNumber",
      title: "WhatsApp Number (digits only, no + or spaces)",
      type: "string",
      description: 'e.g. "233249718356"',
    },

    // ── Office Hours ──────────────────────────────────────
    {
      name: "mondayFridayHours",
      title: "Monday – Friday Hours",
      type: "string",
      description: 'e.g. "9:00 AM - 5:00 PM"',
    },
    {
      name: "saturdayHours",
      title: "Saturday Hours",
      type: "string",
      description: 'e.g. "10:00 AM - 5:00 PM"',
    },
    {
      name: "sundayStatus",
      title: "Sunday Status",
      type: "string",
      description: 'e.g. "Closed"',
    },

    // ── FAQs ─────────────────────────────────────────────
    {
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
              validation: (R) => R.required(),
            },
            {
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            },
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
};
