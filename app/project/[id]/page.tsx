import ProjectSidebar from "@/components/ProjectSidebar";
import ProjectDetails from "@/components/ProjectDetails";
import type { Project } from "@/types/index";

// Mock project data with proper typing
const projectsData: { [key: string]: Project } = {
  "1": {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A cutting-edge web application designed to revolutionize user experience.",
    image:
      "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    futureWork: {
      title: "Implement AI-powered chatbot",
      description:
        "Looking for a machine learning expert to help integrate an AI chatbot for customer support.",
      skills: ["Machine Learning", "Natural Language Processing", "Python"],
    },
  },
  "2": {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates.",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Firebase", "Material-UI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    futureWork: {
      title: "Add Team Collaboration Features",
      description:
        "Looking to expand the app with real-time collaboration tools.",
      skills: ["WebSocket", "Redux", "Firebase"],
    },
  },
};

function getProjectData(id: string): Project | undefined {
  return projectsData[id];
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-400">Project not found</p>
      </div>
    );
  }

  return (
    <>
      <ProjectSidebar project={project} />
      <ProjectDetails project={project} />
    </>
  );
}
