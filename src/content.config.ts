import { defineCollection, reference, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string().default(''),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        series: reference('series').optional(),
        seriesOrder: z.number().int().positive().optional(),
        // Links the EN and FR versions of a post. Defaults to the slug, so
        // translated pairs only need matching filenames.
        translationKey: z.string().optional(),
        draft: z.boolean().default(false),
        cover: image().optional(),
        coverAlt: z.string().optional(),
      })
      .refine((d) => !d.series || d.seriesOrder !== undefined, {
        message: 'seriesOrder is required when series is set',
      }),
});

const series = defineCollection({
  loader: glob({ base: './src/content/series', pattern: '*.yaml' }),
  schema: z.object({
    title: z.object({ en: z.string(), fr: z.string() }),
    description: z.object({ en: z.string(), fr: z.string() }),
  }),
});

const talks = defineCollection({
  loader: file('./src/content/talks.yaml'),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    city: z.string(),
    date: z.coerce.date(),
    language: z.enum(['en', 'fr']),
    coSpeakers: z.array(z.string()).default([]),
    summary: z.object({ en: z.string(), fr: z.string() }),
    video: z.url().optional(),
    slides: z.url().optional(),
    eventUrl: z.url().optional(),
  }),
});

export const collections = { blog, series, talks };
