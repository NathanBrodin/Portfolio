/* eslint-disable @next/next/no-img-element */

import { projects } from ".velite";
import { notFound } from "next/navigation";
import { kv } from "@vercel/kv";
import { MDXContent } from "@/components/mdx-content";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { Navigation } from "@/app/_components/nav";
import Header from "./header";
import { Eye, Github, Link2 } from "lucide-react";

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

  const links: { href: string; children: React.ReactNode }[] = [];
  if (project.repository) {
    links.push({
      href: project.repository,
      children: <Github key="repository" className="w-5 h-5" />,
    });
  }
  if (project.website) {
    links.push({
      href: project.website,
      children: <Link2 key="website" className="w-5 h-5" />,
    });
  }
  links.push({
    href: "",
    children: (
      <span key="views" className="flex gap-2 items-center">
        <Eye className="w-5 h-5" />
        {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
      </span>
    ),
  });

  return (
    <div className="min-h-screen max-w-7xl flex flex-col items-center">
      <Navigation returnUrl="/projects" links={links} />
      <Header project={project} />
      <div className="max-w-2xl pb-16 w-full">
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
