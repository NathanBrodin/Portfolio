import { Project } from "@/.velite";
import { SparklesCore } from "@/components/sparkles";
import { Github, Link2 } from "lucide-react";
import Link from "next/link";

export default function Header({ project }: { project: Project }) {
  return (
    <header>
      <div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {project.description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex items-center gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {project.repository && (
                <Link
                  href={project.repository}
                  className="px-8 py-2 flex gap-2 hover:text-zinc-300"
                  target="_blank"
                >
                  <Github />
                  Github
                </Link>
              )}
              {project.website && (
                <Link
                  href={project.website}
                  target="_blank"
                  className="relative border rounded-3xl hover:border-zinc-400/50 border-zinc-600 px-8 py-2 bg-zinc-700/20"
                >
                  <div className="w-full h-full absolute inset-0 p-1">
                    <SparklesCore
                      background="transparent"
                      minSize={0.6}
                      maxSize={1.4}
                      particleDensity={800}
                      className="w-full h-full  rounded-3xl"
                      particleColor="#FFFFFF"
                    />
                  </div>
                  <span className="relative z-10 flex gap-2 items-center">
                    <Link2 />
                    Website
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
