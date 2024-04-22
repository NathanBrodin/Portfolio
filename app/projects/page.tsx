import { projects as allProjects } from ".velite";
import { kv } from "@vercel/kv";
import Article from "./article";
import { Navigation } from "@/components/nav";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = allProjects.sort((a, b) => {
    if (a.index !== undefined && b.index !== undefined) {
      return a.index - b.index; // Sort by index if both are defined
    } else if (a.index !== undefined) {
      return -1; // a has defined index, so it comes before b
    } else if (b.index !== undefined) {
      return 1; // b has defined index, so it comes before a
    } else if (a.date && b.date) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime(); // Sort by date if both are defined
    } else if (a.date) {
      return -1; // a has defined date, so it comes before b
    } else if (b.date) {
      return 1; // b has defined date, so it comes before a
    } else {
      return 0; // both have undefined index and date, maintain current order
    }
  });

  const views = await kv.mget<number[]>(
    projects.map((project) =>
      ["pageviews", "projects", project.slug].join(":"),
    ),
  );

  return (
    <div className="relative pb-16">
      <Navigation
        links={[
          { href: "/about", children: "About" },
          { href: "/contact", children: "Contact" },
        ]}
      />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        <Suspense fallback={<TopProjecsLoader />}>
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            <Article
              project={projects[0]}
              views={views[0] ?? 0}
              key={projects[0].slug}
              expanded
            />
            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
              {projects.slice(1, 3).map((project, index) => (
                <Article
                  project={project}
                  views={views[index + 1]}
                  key={project.slug}
                />
              ))}
            </div>
          </div>
        </Suspense>
        <div className="hidden w-full h-px md:block bg-zinc-800" />
        <Suspense fallback={<BottomProjectsLoader />}>
          <div className="mx-auto mt-16 grid grid-flow-dense grid-cols-1 grid-rows[masonry] gap-8 leading-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 xl:mx-0">
            {projects.slice(4).map((project, index) => (
              <Article
                project={project}
                views={views[index + 4]}
                key={project.slug}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

function TopProjecsLoader() {
  return <div>Loading</div>;
}

function BottomProjectsLoader() {
  return <div>Loading 2</div>;
}
