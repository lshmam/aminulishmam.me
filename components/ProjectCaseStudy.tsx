"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Project } from "@/lib/projects";

// Fade-in on scroll component
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax image component
function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
      </motion.div>
    </div>
  );
}

export default function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article className="min-h-screen">


      {/* Hero Text */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-[11px] tracking-[0.1em] uppercase text-muted font-medium mb-5">
            {project.role}
          </p>
          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-normal tracking-[-0.02em] text-foreground leading-[1.1]">
            {project.tagline}
          </h1>
          <p className="text-[18px] sm:text-[22px] text-muted font-light mt-6 max-w-2xl">
            {project.title}
          </p>
        </motion.div>
      </div>

      {/* Primary Image below text */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
        <FadeIn delay={0.2}>
          <div className="w-full rounded-[24px] overflow-hidden relative" style={{ height: 'auto', aspectRatio: '16/9' }}>
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </FadeIn>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20 space-y-32">

        {/* Overview + stats row */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/40 font-medium mb-2">Role</p>
                <p className="text-[15px] text-foreground">{project.role}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/40 font-medium mb-2">Year</p>
                <p className="text-[15px] text-foreground">{project.year}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/40 font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[12px] px-3 py-1 rounded-full border border-foreground/15 text-foreground/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/40 font-medium mb-4">Overview</p>
              <p className="text-[18px] sm:text-[22px] font-normal leading-[1.6] text-foreground">
                {project.overview}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Full-width feature image */}
        <FadeIn>
          <div className="w-full rounded-[24px] overflow-hidden relative" style={{ height: 560 }}>
            <Image
              src={project.images[1]}
              alt={`${project.title} — feature`}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </FadeIn>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-foreground/[0.04] rounded-[20px] p-8 sm:p-10 h-full">
              <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/40 font-medium mb-4">The Challenge</p>
              <p className="text-[16px] leading-[1.7] text-foreground/80">{project.challenge}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="bg-foreground rounded-[20px] p-8 sm:p-10 h-full">
              <p className="text-[10px] tracking-[0.1em] uppercase text-white/40 font-medium mb-4">The Solution</p>
              <p className="text-[16px] leading-[1.7] text-white/80">{project.solution}</p>
            </div>
          </FadeIn>
        </div>

        {/* 2-up image grid */}
        <div className="grid grid-cols-2 gap-5">
          <FadeIn className="col-span-1">
            <div className="rounded-[20px] overflow-hidden" style={{ aspectRatio: "3/4", position: "relative" }}>
              <Image src={project.images[2]} alt={`${project.title} detail A`} fill className="object-cover" sizes="50vw" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="col-span-1 flex flex-col gap-5">
            <div className="rounded-[20px] overflow-hidden flex-1" style={{ position: "relative", minHeight: 200 }}>
              <Image src={project.images[3]} alt={`${project.title} detail B`} fill className="object-cover" sizes="50vw" />
            </div>
            <div className="rounded-[20px] overflow-hidden flex-1" style={{ position: "relative", minHeight: 200 }}>
              <Image src={project.images[4]} alt={`${project.title} detail C`} fill className="object-cover" sizes="50vw" />
            </div>
          </FadeIn>
        </div>

        {/* Outcome */}
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/40 font-medium mb-5">Outcome</p>
            <p className="text-[24px] sm:text-[32px] font-normal leading-[1.4] text-foreground">
              {project.outcome}
            </p>
          </div>
        </FadeIn>

        {/* Final full-width image */}
        <FadeIn>
          <div className="w-full rounded-[24px] overflow-hidden" style={{ height: 480, position: "relative" }}>
            <Image src={project.images[0]} alt={`${project.title} — final`} fill className="object-cover" sizes="100vw" />
          </div>
        </FadeIn>

        {/* Next project link */}
        <FadeIn>
          <div className="flex items-center justify-between pt-8 border-t border-foreground/10 pb-24">
            <Link href="/" className="text-[13px] text-foreground/50 hover:text-foreground transition-colors">
              ← All Projects
            </Link>
            <p className="text-[12px] tracking-[0.08em] uppercase text-foreground/30 font-medium">
              {project.company}
            </p>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
