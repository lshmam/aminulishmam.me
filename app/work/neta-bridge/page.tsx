import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import BottomDock from "@/components/BottomDock";

export const metadata = {
  title: "Neta Bridge — Aminul Islam",
  description: "B2B marketplace turning professional networks into trade opportunities",
};

export default function Page() {
  const project = projects.find((p) => p.slug === "neta-bridge");
  if (!project) notFound();

  return (
    <>
      <ProjectCaseStudy project={project} />
      <BottomDock />
    </>
  );
}
