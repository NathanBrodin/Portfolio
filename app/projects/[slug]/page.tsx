import { projects } from ".velite";
import { notFound } from "next/navigation";
import { kv } from "@vercel/kv";
import { MDXContent } from "@/components/mdx-content";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { Navigation } from "@/app/_components/nav";
import Header from "./header";
import { DashedSeparator } from "@/components/dashed-separator";

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
    <div className="min-h-screen">
      <Navigation returnUrl="/projects" />
      <Header project={project} />
      <DashedSeparator />
      <div className="bg-gradient-to-bl from-black via-zinc-400/20 to-black min-h-screen">
        <MDXContent code={project.content} />
      </div>
    </div>
  );
}

export function generateMetadata({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (project == null) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: absoluteUrl(project.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
