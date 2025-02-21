import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, Clock, DollarSign, MessageSquare } from "lucide-react"

export default function StartProjectSidebar() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Project Guidelines</h2>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-300">
            <Lightbulb className="w-4 h-4 mr-2" />
            Be as specific as possible about your project needs
          </li>
          <li className="flex items-center text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            Provide an estimated timeline if you have one in mind
          </li>
          <li className="flex items-center text-gray-300">
            <DollarSign className="w-4 h-4 mr-2" />
            Include your budget range to help tailor the proposal
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Why Work With Me</h2>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li>✓ Years of experience in design and development</li>
          <li>✓ Tailored solutions to meet your specific needs</li>
          <li>✓ Collaborative approach throughout the project</li>
          <li>✓ Commitment to delivering high-quality results</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Not Ready Yet?</h2>
        <p className="text-gray-300 text-sm">
          If you're not ready to start a project but have questions, feel free to reach out for a casual chat.
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href="mailto:ishmam.aminul@gmail.com">
            <MessageSquare className="mr-2 h-4 w-4" />
            Get in Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

