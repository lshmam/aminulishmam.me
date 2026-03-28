import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    title: "The Art of the Pre-Launch: How I Got My First 1,000 Users Before Shipping",
    date: "March 2024",
    time: "8 min read",
    slug: "#",
  },
  {
    title: "Why Your Startup's First Hire Is Your Most Dangerous Decision",
    date: "January 2024",
    time: "6 min read",
    slug: "#",
  },
  {
    title: "Founder-Led Sales: The Only Way to Validate B2B in 2024",
    date: "November 2023",
    time: "10 min read",
    slug: "#",
  },
  {
    title: "How I Sold My First SaaS Before Building It",
    date: "September 2023",
    time: "5 min read",
    slug: "#",
  },
];

export default function WritingPage() {
  return (
    <main className="min-h-screen max-w-[620px] mx-auto px-5 sm:px-6">
      <Header />
      <section className="pt-6 pb-40">
        <h1 className="text-[26px] sm:text-[30px] font-normal tracking-[-0.01em] text-foreground mb-10">
          Writing
        </h1>
        <div>
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.slug}
              className="group flex flex-col py-5 border-t border-border transition-opacity hover:opacity-50"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[14px] font-normal leading-snug text-foreground">
                  {post.title}
                </h2>
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.8}
                  className="flex-shrink-0 mt-0.5 opacity-20 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-[11.5px] text-muted mt-1.5">
                {post.date} · {post.time}
              </p>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>
      <BottomDock />
    </main>
  );
}
