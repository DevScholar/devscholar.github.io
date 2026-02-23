import { defineCollection, z } from 'astro:content';

const devblogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    website: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const collections = { devblogs, products };
