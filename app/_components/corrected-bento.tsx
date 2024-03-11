import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export function CorrectedBento() {
  return (
    <div className="py-48 w-full bg-dot-white/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-20 w-full max-w-5xl px-4 md:px-24 lg:px-0 flex flex-col lg:grid gap-4 lg:grid-cols-3 auto-rows-[22rem]">
        <CorrectedBentoCard
          title="Bento Card"
          description="This is a Bento Card with a warning icon"
          icon={TriangleAlert}
          widget={
            <div className="rdp p-3 absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"></div>
          }
          size="sm"
        />
        <CorrectedBentoCard
          title="Bento Card"
          description="This is a Bento Card with a warning icon"
          icon={TriangleAlert}
          widget={<div></div>}
          size="lg"
        />
        <CorrectedBentoCard
          title="Bento Card"
          description="This is a Bento Card with a warning icon"
          icon={TriangleAlert}
          widget={<div></div>}
          size="lg"
        />
        <CorrectedBentoCard
          title="Bento Card"
          description="This is a Bento Card with a warning icon"
          icon={TriangleAlert}
          widget={<div></div>}
          size="sm"
        />
      </div>
    </div>
  );
}

interface BentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  widget: ReactNode;
  size?: "sm" | "lg";
}

function CorrectedBentoCard({
  icon: Icon,
  title,
  description,
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
        <div className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs pointer-events-auto">
          Learn more
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-800/10"></div>
    </div>
  );
}
