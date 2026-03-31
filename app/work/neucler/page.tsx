import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import BottomDock from "@/components/BottomDock";

export const metadata = {
  title: "Neucler — Aminul Islam",
  description: "Sales Copilot for Receptionists",
};

export default function Page() {
  const project = projects.find((p) => p.slug === "neucler");
  if (!project) notFound();

  return (
    <>
      <ProjectCaseStudy project={project} />
      <BottomDock />
    </>
  );
}
