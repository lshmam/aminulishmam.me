import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, User, Briefcase, GraduationCap, Award, FileText } from "lucide-react"

export default function AboutSidebar() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <ul className="space-y-2">
          <li>
            <Link href="#personal-info" className="text-gray-300 hover:text-white flex items-center">
              <User className="w-4 h-4 mr-2" />
              Personal Information
            </Link>
          </li>
          <li>
            <Link href="#work-experience" className="text-gray-300 hover:text-white flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Work Experience
            </Link>
          </li>
          <li>
            <Link href="#education" className="text-gray-300 hover:text-white flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </Link>
          </li>
          <li>
            <Link href="#skills" className="text-gray-300 hover:text-white flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Skills & Expertise
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Download Resume</h2>
        <Button asChild className="w-full">
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 h-4 w-4" />
            View Full Resume
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Let's Connect</h2>
        <p className="text-gray-300 text-sm">
          Interested in working together or have any questions? Feel free to reach out!
        </p>
        <Button asChild className="w-full">
          <Link href="/start-project">
            Start a Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

