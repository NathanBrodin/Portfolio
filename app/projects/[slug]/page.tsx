import { allProjects } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project._raw.flattenedPath,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Find the post for the current page.
  const project = allProjects.find(
    (project) => project._raw.flattenedPath === `projects/${params.slug}`,
  );

  // 404 if the post does not exist.
  if (!project) notFound();

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(project.body.code);

  return (
    <div>
      {/* Some code ... */}
      <MDXContent />
    </div>
  );
}
