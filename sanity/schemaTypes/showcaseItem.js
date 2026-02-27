export const showcaseItem = {
  name: "showcaseItem",
  title: "Showcase Item",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    },
    {
      name: "description",
      title: "Short Description (shown on card)",
      type: "text",
      rows: 3,
    },
    {
      name: "badge",
      title: "Badge Label (e.g. Best Seller, New, Premium)",
      type: "string",
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
    },
    {
      name: "displayOrder",
      title: "Display Order (lower = appears first)",
      type: "number",
    },
    {
      name: "detailDescription",
      title: "Detail Description (shown in modal)",
      type: "text",
      rows: 5,
    },
    {
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Add one feature per item",
    },
    {
      name: "commonUses",
      title: "Common Uses",
      type: "text",
      rows: 2,
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      badge: "badge",
      media: "images.0",
    },
    prepare({ title, badge, media }) {
      return {
        title,
        subtitle: badge,
        media,
      };
    },
  },
};
