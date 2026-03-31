import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import BottomDock from "@/components/BottomDock";

export const metadata = {
  title: "Arrive — Aminul Islam",
  description: "A peer-to-peer marketplace that turns empty driveways into revenue",
};

export default function Page() {
  const project = projects.find((p) => p.slug === "arrive");
  if (!project) notFound();

  return (
    <>
      <ProjectCaseStudy project={project} />
      <BottomDock />
    </>
  );
}
