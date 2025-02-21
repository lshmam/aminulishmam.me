import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ProjectSidebar({ project }) {
  return (
    <div className="space-y-8">
      <Link href="/projects" className="inline-flex items-center text-gray-400 hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Projects
      </Link>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>

        <div className="aspect-video relative rounded-lg overflow-hidden">
          <Image
            src={
              project.image ||
              "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ||
              "/placeholder.svg"
            }
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <p className="text-gray-300">{project.description}</p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              View Live Site
            </a>
          </Button>
          <Button variant="outline" asChild className="bg-gray-800 text-white hover:bg-gray-700">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>

        {project.futureWork && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Future Work & Collaboration</h2>
            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <h3 className="text-lg font-semibold mb-2">{project.futureWork.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{project.futureWork.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.futureWork.skills.map((skill) => (
                  <span key={skill} className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <Button asChild className="w-full mt-4">
          <Link href="mailto:ishmam.aminul@gmail.com">
            <Mail className="mr-2 h-4 w-4" />
            Collaborate on This Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

