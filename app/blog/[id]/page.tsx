import Sidebar from "@/components/Sidebar"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This would typically come from a database or CMS
const getBlogPost = (id: string) => {
  const posts = [
    {
      id: "1",
      title: "The Future of UI Design: Trends to Watch",
      excerpt: "Exploring emerging UI design trends that are shaping the future of digital interfaces.",
      content: `
        <p>The landscape of UI design is constantly evolving, driven by technological advancements and changing user expectations. In this article, we'll explore the emerging trends that are shaping the future of digital interfaces.</p>
        
        <h2>1. Neumorphism and Soft UI</h2>
        <p>This design trend combines elements of skeuomorphism with flat design, creating interfaces that appear soft and extruded from the background. It's characterized by subtle shadows and highlights that give elements a tactile, physical feel while maintaining a modern aesthetic.</p>
        
        <h2>2. Microinteractions and Animation</h2>
        <p>Small, purposeful animations that provide feedback and enhance the user experience are becoming increasingly important. These subtle interactions help users understand how to interact with interfaces and provide delightful moments throughout their journey.</p>
        
        <h2>3. Dark Mode and Color Adaptation</h2>
        <p>With the rising popularity of dark mode interfaces, designers are creating more adaptive color systems that work seamlessly across both light and dark themes. This trend focuses on maintaining readability and reducing eye strain while preserving brand identity.</p>
      `,
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2023-05-15",
      author: "Aminul Ishmam",
      readTime: "5 min read",
      tags: ["Design", "UI/UX", "Trends"],
    },
    // Add more blog posts here
  ]
  return posts.find((post) => post.id === id)
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <>
      <Sidebar />
      <main className="max-w-3xl mx-auto space-y-8">
        <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span>{post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-p:text-gray-300 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  )
}

