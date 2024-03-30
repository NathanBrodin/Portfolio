import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface BentoProps {
  children: ReactNode;
}

export function Bento({ children }: BentoProps) {
  return (
    <div className="relative z-20 w-full max-w-5xl px-4 md:px-24 lg:px-0 flex flex-col lg:grid gap-4 lg:grid-cols-3 auto-rows-[22rem]">
      {children}
    </div>
  );
}

interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  widget: ReactNode;
  size?: "sm" | "lg";
}

export function BentoCard({
  icon: Icon,
  title,
  description,
  link,
  widget,
  size = "sm",
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl transform-gpu bg-transparent backdrop-blur-md min-h-[22rem] lg:min-h-min overflow-hidden",
        size === "sm" ? "lg:col-span-1" : "lg:col-span-2",
      )}
      style={{
        border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 -20px 80px -20px #ffffff1f inset",
      }}
    >
      <div>{widget}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-neutral-300">{title}</h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>
      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          href={link ?? "/"}
          className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs pointer-events-auto"
        >
          Learn more
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-800/10"></div>
    </div>
  );
}
