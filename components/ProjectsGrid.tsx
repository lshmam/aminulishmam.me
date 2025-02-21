import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Update the mock data with Pexels images
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern, responsive e-commerce solution built with Next.js and Stripe integration.",
    image:
      "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Next.js", "React", "Stripe", "Tailwind CSS"],
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and intuitive UI.",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Firebase", "Material-UI"],
    featured: true,
  },
  {
    id: 3,
    title: "AI-Powered Chatbot",
    description: "An intelligent chatbot leveraging natural language processing for customer support.",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Python", "TensorFlow", "Flask", "React"],
    featured: false,
  },
]

export default function ProjectsGrid({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const displayedProjects = featuredOnly ? projects.filter((project) => project.featured) : projects

  return (
    <div className="space-y-12">
      {displayedProjects.map((project) => (
        <div key={project.id} className="group">
          <Link href={`/project/${project.id}`} className="block">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-200 hover:text-black group-hover:bg-blue-400 transition-all duration-200 ease-in-out"
                >
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

