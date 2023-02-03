import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-02-01",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
