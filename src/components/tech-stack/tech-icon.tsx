import type { TechStack } from '@/config/tech-stack'

function TechIcon({ tech }: { tech: TechStack }) {
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
          decoding="async"
          className="block dark:hidden"
        />
        <img
          src={`/tech-stack-icons/${tech.key}-dark.svg`}
          alt=""
          aria-hidden
          width={14}
          height={14}
          loading="lazy"
          decoding="async"
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
      decoding="async"
    />
  )
}

export { TechIcon }
