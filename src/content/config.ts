import { defineCollection, z } from 'astro:content';

// Lenient passthrough schemas: content is migrated verbatim from the old
// en.js/fr.js, so we keep every field. The CMS (Sveltia) defines the
// editing-field schema separately. Tighten here later if desired.
const data = () => defineCollection({ type: 'data', schema: z.object({}).passthrough() });

export const collections = {
  ui: data(),
  projects: data(),
  experiences: data(),
  education: data(),
  certifications: data(),
  publications: data(),
  blog: data(),
};
