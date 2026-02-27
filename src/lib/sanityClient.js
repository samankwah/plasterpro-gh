import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "placeholder";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

console.log("[Sanity] projectId:", projectId, "| dataset:", dataset);

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2024-01-01",
});
