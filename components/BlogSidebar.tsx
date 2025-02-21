import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Tag, Clock, FlameIcon as Fire } from "lucide-react"

export default function BlogSidebar() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Blog Categories</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/blog?category=design" className="text-gray-300 hover:text-white">
              Design Trends
            </Link>
          </li>
          <li>
            <Link href="/blog?category=development" className="text-gray-300 hover:text-white">
              Web Development
            </Link>
          </li>
          <li>
            <Link href="/blog?category=career" className="text-gray-300 hover:text-white">
              Career Tips
            </Link>
          </li>
          <li>
            <Link href="/blog?category=tools" className="text-gray-300 hover:text-white">
              Tools & Resources
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Popular Tags</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/blog?tag=react"
            className="text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-full hover:bg-gray-600"
          >
            <Tag className="w-3 h-3 inline mr-1" />
            React
          </Link>
          <Link
            href="/blog?tag=ux"
            className="text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-full hover:bg-gray-600"
          >
            <Tag className="w-3 h-3 inline mr-1" />
            UX
          </Link>
          <Link
            href="/blog?tag=productivity"
            className="text-sm bg-gray-700 text-gray-200 px-2 py-1 rounded-full hover:bg-gray-600"
          >
            <Tag className="w-3 h-3 inline mr-1" />
            Productivity
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Blog Highlights</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/blog?sort=recent" className="text-gray-300 hover:text-white flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Recent Posts
            </Link>
          </li>
          <li>
            <Link href="/blog?sort=popular" className="text-gray-300 hover:text-white flex items-center">
              <Fire className="w-4 h-4 mr-2" />
              Popular Posts
            </Link>
          </li>
        </ul>
      </div>

      <Button asChild className="w-full mt-4">
        <Link href="/blog/subscribe">
          Subscribe to Newsletter
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

