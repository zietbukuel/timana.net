import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectCategories = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/projectCategories' }),
  schema: z.object({
    id: z.string(),
    label: z.string()
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    id: z.number(),
    categories: z.array(z.string()),
    part1: z.string(),
    part2: z.string(),
    isPart1Bold: z.boolean(),
    subtitle: z.string(),
    thumb: image(),
    large: image(),
    desc: z.string(),
    tech: z.string().nullable().optional(),
    url: z.string().nullable().optional(),
    urlText: z.string().nullable().optional(),
    order: z.number()
  })
});

const education = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/education' }),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    period: z.string(),
    field: z.string(),
    order: z.number()
  })
});

const employment = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/employment' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string().optional(),
    order: z.number()
  })
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string().optional(),
    author: z.string(),
    order: z.number()
  })
});

const skills = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/skills' }),
  schema: z.object({
    name: z.string(),
    value: z.number(),
    order: z.number()
  })
});

const recognition = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/recognition' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    location: z.string(),
    description: z.string().optional(),
    order: z.number()
  })
});

export const collections = {
  projectCategories,
  projects,
  education,
  employment,
  testimonials,
  skills,
  recognition
};
