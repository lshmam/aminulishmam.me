import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Update the mock data with Pexels images
const blogPosts = [
  {
    id: 1,
    title: "The Future of UI Design: Trends to Watch",
    excerpt: "Exploring emerging UI design trends that are shaping the future of digital interfaces.",
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2023-05-15",
    featured: true,
  },
  {
    id: 2,
    title: "Optimizing React Performance: Best Practices",
    excerpt: "Learn how to boost your React application's performance with these proven techniques.",
    image:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2023-06-02",
    featured: true,
  },
  {
    id: 3,
    title: "The Role of AI in Modern Web Development",
    excerpt: "Examining how artificial intelligence is transforming the landscape of web development.",
    image:
      "https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    date: "2023-06-20",
    featured: false,
  },
]

export default function BlogPostsGrid({ featuredOnly = false, limit }: { featuredOnly?: boolean; limit?: number }) {
  let displayedPosts = featuredOnly ? blogPosts.filter((post) => post.featured) : blogPosts
  if (limit) {
    displayedPosts = displayedPosts.slice(0, limit)
  }

  return (
    <div className="space-y-12">
      {displayedPosts.map((post) => (
        <div key={post.id} className="group">
          <Link href={`/blog/${post.id}`} className="block">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold group-hover:text-blue-400 transition-colors">{post.title}</h3>
                <p className="text-gray-300">{post.excerpt}</p>
                <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-200 hover:text-black group-hover:bg-blue-400 transition-all duration-200 ease-in-out"
                >
                  Read More
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

