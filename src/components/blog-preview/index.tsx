import { allBlogPosts } from 'content-collections'
import { ArrowRightIcon } from 'lucide-react'

import { Link } from '@tanstack/react-router'

import { Button } from '../ui/button'
import { Section, SectionTitle } from '../ui/section'

export function BlogPreview() {
  const posts = allBlogPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  return (
    <Section id="blog-preview" className="flex flex-col">
      <SectionTitle>Blog</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            key={post.slug}
            className="p-4"
            aria-label={post.title}
          >
            <div className="relative transition-transform select-none hover:scale-101 [&_img]:aspect-1200/630 [&_img]:rounded-xl">
              <img
                src={`/og/blog/${post.slug}.png`}
                width={1200}
                height={630}
                fetchPriority="low"
                loading="lazy"
                alt={post.title}
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex w-full justify-center py-2">
        <Button render={<Link to="/blog" />}>
          See all posts
          <ArrowRightIcon />
        </Button>
      </div>
    </Section>
  )
}
