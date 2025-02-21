"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Linkedin,
  FileText,
  ChevronLeft,
  DribbbleIcon as Behance,
  User,
  Mail,
  BookOpen,
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import ProjectsSidebar from "./ProjectsSidebar"
import BlogSidebar from "./BlogSidebar"
import StackSidebar from "./StackSidebar"
import MessagesSidebar from "./MessagesSidebar"

// Add after imports
import "@/styles/scrollbar.css"

export default function Sidebar() {
  const pathname = usePathname()
  const isMainPage = pathname === "/"

  const renderSidebarContent = () => {
    if (pathname.startsWith("/projects") || pathname.startsWith("/project/")) {
      return <ProjectsSidebar />
    } else if (pathname.startsWith("/blog")) {
      return <BlogSidebar />
    } else if (pathname === "/stack") {
      return <StackSidebar />
    } else if (pathname === "/messages") {
      return <MessagesSidebar />
    } else {
      return (
        <div className="space-y-8">
          {/* Bio */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              I specialize in crafting visually striking and user-friendly digital experiences. With a passion for
              blending aesthetics and functionality, I bring ideas to life, creating innovative solutions in the dynamic
              world of web design and engineering.
            </p>
            <div className="flex flex-col gap-4">
              <Button variant="default" className="rounded-full" asChild>
                <Link href="/about">
                  <User className="mr-2 h-4 w-4" />
                  About Me
                </Link>
              </Button>
              <Button variant="default" className="rounded-full" asChild>
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </Link>
              </Button>
              <Button variant="default" className="rounded-full" asChild>
                <Link href="/start-project">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Start a Project
                </Link>
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Connect with Me</h2>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.linkedin.com/in/aminulishmam" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.behance.net/aminulishmam" target="_blank" rel="noopener noreferrer">
                  <Behance className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:ishmam.aminul@gmail.com">
                  <Mail className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://medium.com/@aminulishmam" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="space-y-8 pb-6">
      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto pr-4 space-y-8 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent hover:scrollbar-thumb-gray-700">
        {!isMainPage && (
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Main Page
          </Link>
        )}

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-mono">AMINUL ISHMAM</h1>
            <p className="text-gray-400">DESIGN ENGINEER</p>
          </div>
        </div>

        {renderSidebarContent()}
      </div>
    </div>
  )
}

