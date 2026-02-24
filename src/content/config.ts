import { defineCollection, z } from 'astro:content';

const devblogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum(['web', 'system']),
    website: z.string().optional(),
    github: z.string().optional(),
  }),
});

export const collections = { devblogs, projects };
