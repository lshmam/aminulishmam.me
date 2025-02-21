import Sidebar from "@/components/Sidebar"
import BlogPostsGrid from "@/components/BlogPostsGrid"

export default function AllBlogPostsPage() {
  return (
    <>
      <Sidebar />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold mb-8">All Blog Posts</h1>
        <BlogPostsGrid />
      </main>
    </>
  )
}

