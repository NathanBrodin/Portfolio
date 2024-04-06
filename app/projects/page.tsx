import { allProjects } from "contentlayer/generated";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = allProjects;

  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project) => (
        <Link key={project._id} href={project.url}>
          {project.title}
        </Link>
      ))}
    </div>
  );
}
