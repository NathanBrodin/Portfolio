import type { Project } from ".velite";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { Card } from "@/components/card";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  views: number;
  expanded?: boolean;
};

export default function Article({ project, views, expanded = false }: Props) {
  return (
    <Link href={`${project.permalink}`}>
      <Card>
        <article
          className={cn("p-4 md:p-8", expanded && "relative w-full h-full")}
        >
          <div className="flex justify-between gap-2 items-center">
            <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
              {project.date ? (
                <time dateTime={new Date(project.date).toISOString()}>
                  {Intl.DateTimeFormat(undefined, {
                    month: "long",
                    year: "numeric",
                  }).format(new Date(project.date))}
                </time>
              ) : (
                <span>SOON</span>
              )}
            </span>
            <span className="text-zinc-500 text-xs  flex items-center gap-1">
              <Eye className="w-4 h-4" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                views,
              )}
            </span>
          </div>
          <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
            {project.title}
          </h2>
          <p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
            {project.description}
          </p>
          {expanded && (
            <div className="absolute bottom-4 md:bottom-8">
              <div className="hidden text-zinc-200 hover:text-zinc-50 lg:block hover:translate-x-2 transition-all duration-150">
                <div className="flex gap-2">
                  <p>Read more </p>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          )}
        </article>
      </Card>
    </Link>
  );
}
