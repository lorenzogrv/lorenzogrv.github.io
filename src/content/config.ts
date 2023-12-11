// @see https://docs.astro.build/en/guides/content-collections/
import { defineCollection, /* reference, */ z } from 'astro:content'

// Define a `type` and `schema` for each collection
const sections = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    })
  })
})

const milestones = defineCollection({
  type: 'content',
  schema: z.object({
    kind: z.enum(['study-official', 'study-complement', 'work']),
    title: z.string(),
    place: z.string(),
    organization: z.string(),
    start: z.date(),
    end: z.date().optional(),
    duration: z.string().optional(),
    stack: z.array(z.string()).optional() /* reference('skills')) */
  })
})

// Export a single `collections` object to register your collection(s)
export const collections = {
  sections,
  milestones
}
