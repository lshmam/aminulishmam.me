import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import BottomDock from "@/components/BottomDock";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Aminul Islam`,
    description: project.overview,
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  if (!project) notFound();

  return (
    <>
      <ProjectCaseStudy project={project} />
      <BottomDock />
    </>
  );
}
