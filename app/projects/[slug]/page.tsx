import { projects } from ".velite";
import { notFound } from "next/navigation";
import { kv } from "@vercel/kv";
import { MDXContent } from "@/components/mdx-content";

export const dynamic = "force-dynamic";

interface Props {
  params: {
    slug: string;
  };
}

function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export default async function Page({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  // 404 if the project does not exist.
  if (!project) notFound();

  const views = await kv.incr(
    ["pageviews", "projects", project.slug].join(":"),
  );

  return (
    <div>
      <h1>This page has {views} views</h1>
      <MDXContent code={project.content} />
    </div>
  );
}

export function generateMetadata({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (project == null) return {};
  return { title: project.title, description: project.description };
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
