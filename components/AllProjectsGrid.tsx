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
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and intuitive UI.",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Firebase", "Material-UI"],
  },
  {
    id: 3,
    title: "AI-Powered Chatbot",
    description: "An intelligent chatbot leveraging natural language processing for customer support.",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Python", "TensorFlow", "Flask", "React"],
  },
  {
    id: 4,
    title: "Fitness Tracking Mobile App",
    description: "A comprehensive fitness tracking app with personalized workout plans and progress analytics.",
    image:
      "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React Native", "Redux", "Node.js", "MongoDB"],
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description:
      "A centralized dashboard for managing multiple social media accounts with analytics and scheduling features.",
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Vue.js", "Vuex", "Express", "PostgreSQL"],
  },
  {
    id: 6,
    title: "Augmented Reality Art Gallery",
    description: "An innovative AR app that transforms physical spaces into virtual art galleries.",
    image:
      "https://images.pexels.com/photos/5417837/pexels-photo-5417837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Unity", "ARKit", "C#", "Blender"],
  },
]

export default function AllProjectsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <div key={project.id} className="group">
          <Link href={`/project/${project.id}`} className="block">
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-800 text-gray-200 px-2 py-1 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="group-hover:text-blue-400 transition-colors p-0">
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

