import { TECH_STACK, type TechStack as TechStackItem } from '@/config/tech-stack'

import { Section, SectionTitle } from '../ui/section'

const ID = 'tech-stack'

export function TechStack() {
  return (
    <Section id={ID} className="flex flex-col">
      <SectionTitle>Tech Stack</SectionTitle>

      <div className="relative border-t [--badge-height:--spacing(6)] [--col-left-width:--spacing(48)]">
        <div
          className="pointer-events-none absolute inset-y-0 left-(--col-left-width) -z-1 w-px border-r border-dashed border-border max-sm:hidden"
          aria-hidden
        />

        {Object.entries(groupByCategory(TECH_STACK)).map(([category, items], index) => {
          const categoryId = `${ID}-${category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')}`

          return (
            <div
              key={category}
              className="grid items-start gap-y-2 border-b border-border py-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
            >
              <div id={categoryId} className="pl-4 text-sm/(--badge-height)">
                <span className="mr-1.5 font-mono text-muted-foreground/80 select-none" aria-hidden>
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                {category}
              </div>

              <ul aria-labelledby={categoryId} className="flex flex-wrap gap-1.5 px-4">
                {items.map((item) => {
                  return (
                    <li key={item.key} className="flex">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        className="flex h-(--badge-height) items-center justify-center gap-1.25 rounded-full bg-zinc-50/80 px-2 font-mono text-xs text-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80 [&_img]:pointer-events-none [&_img]:size-3.5 [&_img]:shrink-0 [&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground/80"
                      >
                        <TechIcon tech={item} />
                        {item.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

function TechIcon({ tech }: { tech: TechStackItem }) {
  if (tech.theme) {
    return (
      <>
        <img
          src={`/tech-stack-icons/${tech.key}-light.svg`}
          alt=""
          aria-hidden
          width={14}
          height={14}
          loading="lazy"
          className="block dark:hidden"
        />
        <img
          src={`/tech-stack-icons/${tech.key}-dark.svg`}
          alt=""
          aria-hidden
          width={14}
          height={14}
          loading="lazy"
          className="hidden dark:block"
        />
      </>
    )
  }

  return (
    <img
      src={`/tech-stack-icons/${tech.key}.svg`}
      alt=""
      aria-hidden
      width={14}
      height={14}
      loading="lazy"
    />
  )
}

function groupByCategory(items: TechStackItem[]): Record<string, TechStackItem[]> {
  return items.reduce<Record<string, TechStackItem[]>>((acc, item) => {
    const categories = (item as TechStackItem & { categories?: string[] }).categories ?? [
      item.category,
    ]
    for (const category of categories) {
      ;(acc[category] ??= []).push(item)
    }
    return acc
  }, {})
}
