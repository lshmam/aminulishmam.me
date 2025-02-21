import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, FlameIcon as Fire } from "lucide-react";

export default function ProjectsSidebar() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Project Categories</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/projects?category=web"
              className="text-gray-300 hover:text-white"
            >
              Web Development
            </Link>
          </li>
          <li>
            <Link
              href="/projects?category=mobile"
              className="text-gray-300 hover:text-white"
            >
              Mobile Apps
            </Link>
          </li>
          <li>
            <Link
              href="/projects?category=ui"
              className="text-gray-300 hover:text-white"
            >
              UI/UX Design
            </Link>
          </li>
          <li>
            <Link
              href="/projects?category=branding"
              className="text-gray-300 hover:text-white"
            >
              Branding
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Featured Projects</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/project/1"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Star className="w-4 h-4 mr-2" />
              E-commerce Platform
            </Link>
          </li>
          <li>
            <Link
              href="/project/2"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Star className="w-4 h-4 mr-2" />
              Task Management App
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Project Highlights</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/projects?sort=recent"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Clock className="w-4 h-4 mr-2" />
              Recent Projects
            </Link>
          </li>
          <li>
            <Link
              href="/projects?sort=popular"
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Fire className="w-4 h-4 mr-2" />
              Popular Projects
            </Link>
          </li>
        </ul>
      </div>

      <Button asChild className="w-full mt-4">
        <Link href="/start-project">
          Start a Project
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
