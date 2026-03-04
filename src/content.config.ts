import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    icon: z.string(),
    enterprise_examples: z.array(z.object({
      name: z.string(),
      annual_cost_per_seat: z.number(),
    })),
  }),
});

const alternatives = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/alternatives' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    replaces: z.array(z.string()),
    category: z.string(),
    annual_cost_replaced: z.number(),
    status: z.enum(['live', 'in-progress', 'planned']),
    maturity: z.enum(['early', 'growing', 'stable', 'mature']),
    deployment_difficulty: z.enum(['easy', 'moderate', 'advanced']),
    project_url: z.string().optional(),
    documentation_url: z.string().optional(),
    vibe_coded: z.boolean().default(false),
    bounty_value: z.number(),
    years_tracked: z.number(),
    start_date: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const bounties = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bounties' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    replaces: z.string(),
    annual_cost: z.number(),
    reward: z.number(),
    status: z.enum(['open', 'claimed', 'in-progress', 'delivered', 'verified']),
    posted_by: z.string(),
    posted_date: z.string(),
    claimed_by: z.string().optional(),
    hunter_url: z.string().optional(),
    seats: z.number().default(1),
    requirements: z.array(z.string()).default([]),
  }),
});

export const collections = { categories, alternatives, bounties };
