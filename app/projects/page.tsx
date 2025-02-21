import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectDetails from "@/components/ProjectDetails";
import type { Project } from "@/types";

// This is a mock function to simulate fetching project data
// In a real application, you would fetch this data from an API or database
function getProjectData(id: string): Project {
  return {
    id, // Now this matches the updated Project interface
    title: "Project Showcase",
    description:
      "A cutting-edge web application designed to revolutionize user experience.",
    image: "/placeholder.svg",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    futureWork: {
      title: "Implement AI-powered chatbot",
      description:
        "Looking for a machine learning expert to help integrate an AI chatbot for customer support.",
      skills: ["Machine Learning", "Natural Language Processing", "Python"],
    },
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id);

  if (!project) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <ProjectSidebar project={project} />
      <ProjectDetails project={project} />
    </>
  );
}
