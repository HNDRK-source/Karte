import { defineCollection, z } from "astro:content";

const page = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lang: z.enum(["de", "en"]),
    urlSlug: z.string(),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages: page };
