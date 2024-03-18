import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import { Convex, Next, React, TailwindCSS, TypeScript } from "./tech-icons";

const cards = [
  {
    tech: "Next.js",
    href: "https://nextjs.org/",
    outlineIcon: Next.outline,
    filledIcon: Next.filled,
  },
  {
    tech: "React",
    href: "https://reactjs.org/",
    outlineIcon: React.outline,
    filledIcon: React.filled,
  },
  {
    tech: "TypeScript",
    href: "https://www.typescriptlang.org/",
    outlineIcon: TypeScript.outline,
    filledIcon: TypeScript.filled,
  },
  {
    tech: "Tailwind",
    href: "https://tailwindcss.com/",
    outlineIcon: TailwindCSS.outline,
    filledIcon: TailwindCSS.filled,
  },
  {
    tech: "Convex",
    href: "https://convex.dev/",
    outlineIcon: Convex.outline,
    filledIcon: Convex.filled,
  },
];

export default function TechStack() {
  return (
    <InfiniteMovingCards className="absolute right-10 top-10 w-[80%] origin-top transition-all duration-300 ease-out">
      {cards.map((card, index) => (
        <TechStackCard key={index} {...card} />
      ))}
    </InfiniteMovingCards>
  );
}

interface TechStackCardProps {
  tech: string;
  href: string;
  outlineIcon: React.FC<{ className?: string }>;
  filledIcon: React.FC<{ className?: string }>;
}

function TechStackCard({
  tech,
  href,
  outlineIcon: OutlineIcon,
  filledIcon: FilledIcon,
}: TechStackCardProps) {
  return (
    <a
      className="h-min group -ml-px -mt-px flex  flex-none items-center justify-center  transition-[border-color,z-index] delay-150 hover:delay-0 hover:duration-300 relative cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15] transform-gpu"
      href={href}
      target="_blank"
    >
      <div className="relative flex w-full flex-col items-center">
        <div className="relative aspect-[104/42] w-[calc(104/16*1rem)] max-w-full translate-y-4 transition-transform duration-300 group-hover:translate-y-0 group-focus:translate-y-0 no-hover:translate-y-0">
          <OutlineIcon className="absolute inset-0 h-full w-full transition-opacity duration-500 group-hover:opacity-0 group-focus:opacity-0" />
          <FilledIcon className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100" />
        </div>
        <div className="mt-2 text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-75 no-hover:opacity-100">
          {tech}
        </div>
      </div>
    </a>
  );
}
