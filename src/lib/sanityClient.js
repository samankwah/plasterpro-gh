import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "jx4w8pg1";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2024-01-01",
});
