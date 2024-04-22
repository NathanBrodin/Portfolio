import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    projects: {
      name: "Project",
      pattern: "projects/**/*.mdx",
      schema: s
        .object({
          title: s.string(),
          slug: s.slug("projects"),
          // slug: s.path(), // auto generate slug from file path
          description: s.string(),
          date: s.isodate(),
          repository: s.string().optional(),
          website: s.string().optional(),
          published: s.boolean().default(true),
          index: s.number().optional(),
          content: s.mdx(),
          metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
          excerpt: s.excerpt(), // excerpt of markdown content
        })
        .transform((data) => ({
          ...data,
          permalink: `/projects/${data.slug}`,
        })),
    },
  },
});
