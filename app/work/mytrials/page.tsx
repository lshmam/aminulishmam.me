import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import BottomDock from "@/components/BottomDock";

export const metadata = {
  title: "MyTrials — Aminul Islam",
  description: "Making clinical trial enrollment accessible to every patient, everywhere",
};

export default function Page() {
  const project = projects.find((p) => p.slug === "mytrials");
  if (!project) notFound();

  return (
    <>
      <ProjectCaseStudy project={project} />
      <BottomDock />
    </>
  );
}
