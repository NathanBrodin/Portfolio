import { about } from ".velite";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-content";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";
import { Navigation } from "@/app/_components/nav";
import Header from "./header";

interface Props {
  params: {
    slug: string;
  };
}

function getAboutBySlug(slug: string) {
  return about.find((a) => a.slug === slug);
}

export default async function Page({ params }: Props) {
  const a = getAboutBySlug(params.slug);

  // 404 if the page does not exist.
  if (!a) notFound();

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Navigation
        returnUrl="/#about"
        links={[
          { href: "/projects", children: "Projects" },
          { href: "/#about", children: "About" },
          { href: "/contact", children: "Contact" },
        ]}
      />
      <Header about={a} />
      <div className="px-4 sm:px-8 md:px-0 max-w-2xl pb-16 w-full">
        <MDXContent code={a.content} />
      </div>
    </div>
  );
}

export function generateMetadata({ params }: Props) {
  const a = getAboutBySlug(params.slug);
  if (a == null) return {};
  return {
    title: a.title,
    description: a.description,
    openGraph: {
      title: a.title,
      description: a.description,
      type: "article",
      url: absoluteUrl(a.slug),
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
  return about.map(({ slug }) => ({ slug }));
}
