import { allProjects } from "contentlayer/generated";
import Article from "./article";
import { Navigation } from "@/components/nav";

export default function ProjectsPage() {
  const projects = allProjects.sort((a, b) => {
    if (a.index === undefined && b.index === undefined) return 0;
    if (a.index === undefined) return 1;
    if (b.index === undefined) return -1;
    return a.index - b.index;
  });

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
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Article
            project={projects[0]}
            views={0}
            key={projects[0]._id}
            expanded
          />
          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {projects.slice(1, 3).map((project) => (
              <Article project={project} views={0} key={project._id} />
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />
        <div className="mx-auto mt-16 grid grid-flow-dense grid-cols-1 grid-rows[masonry] gap-8 leading-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3 xl:mx-0">
          {projects.slice(4).map((project) => (
            <Article project={project} views={0} key={project._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
