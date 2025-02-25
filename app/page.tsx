import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import ProjectsGrid from "@/components/ProjectsGrid";
import BlogPostsGrid from "@/components/BlogPostsGrid";
import ContactForm from "@/components/ContactForm";
import { ArrowRight } from "lucide-react";

export default function Portfolio() {
  return (
    <>
      <Sidebar />
      <main className="space-y-16">
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-mono">Featured Project</h2>
            <Link
              href="/projects"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All Projects
              <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </Link>
          </div>
          <ProjectsGrid featuredOnly />
        </section>

        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-mono">Latest Blog Post</h2>
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All Posts
              <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </Link>
          </div>
          <BlogPostsGrid featuredOnly limit={1} />
        </section>

        {/* Stack Section */}
        <section className="bg-blue-600 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-mono">My Stack</h2>
            <Link
              href="/stack"
              className="text-white hover:text-gray-200 transition-colors"
            >
              View full stack
              <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Design</h3>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white rounded-md" />
                <div className="w-8 h-8 bg-white rounded-md" />
                <div className="w-8 h-8 bg-white rounded-md" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Engineering</h3>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-white rounded-md" />
                <div className="w-8 h-8 bg-white rounded-md" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-mono">Leave a Message</h2>
            <Link
              href="/messages"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Message Board
              <ArrowRight className="inline-block ml-2 h-4 w-4" />
            </Link>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl">
            Have something to say? Leave an anonymous message! You can view all
            messages on the message board.
          </p>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
