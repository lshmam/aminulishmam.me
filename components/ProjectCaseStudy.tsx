"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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


export default function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article className="min-h-screen">

      {/* Back Button */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      {/* ───────────────────────── HERO TEXT ───────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title + Tagline */}
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] leading-[1.1]">
            <span className="text-foreground/50">{project.title}.</span>{" "}
            <span className="text-foreground">{project.tagline}</span>
          </h1>

          {/* Overview */}
          <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.8] text-foreground/60 max-w-2xl">
            {project.overview}
          </p>

          {/* Website Link */}
          {project.websiteUrl && (
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                {project.websiteLabel || "Visit Website"} <ArrowUpRight size={14} />
              </Link>
              {project.gbpUrl && (
                <Link
                  href={project.gbpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/20 text-foreground text-[13px] font-medium rounded-[4px] hover:bg-foreground/5 transition-all active:scale-[0.98] tracking-tight"
                >
                  Google Business Profile <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* ───────────────────────── INFO CARDS ───────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5 mb-20">
          {[
            { label: "The Problem", content: project.accordion.problem },
            { label: "The Solution", content: project.accordion.solution },
            { label: "My Role", content: project.accordion.myRole },
            { label: "Business Impact", content: project.accordion.businessImpact },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-background p-8"
            >
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/35 font-medium mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[17px] font-medium tracking-tight text-foreground mb-3">{item.label}</h3>
              <p className="text-[14px] leading-[1.75] text-foreground/55">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ───────────────────────── SCROLL-SYNCED SECTIONS ───────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 space-y-40 pb-40">
        
        {/* Primary Hero Image */}
        <FadeIn delay={0.2} className="w-full">
          <div className="w-full overflow-hidden relative border border-foreground/10" style={{ aspectRatio: "16/11" }}>
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

        {/* Deep Dive Sections: Scroll-Sync Logic */}
        {project.sections.map((section, index) => (
          <section key={section.label} className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] xl:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column — Scrolling Content (Multiple Images) */}
            <div className="space-y-12">
              {section.images.map((img, imgIdx) => (
                <FadeIn key={imgIdx}>
                  <div className="w-full overflow-hidden relative border border-foreground/5" style={{ aspectRatio: "4/3" }}>
                    <Image
                      src={img}
                      alt={`${section.label} — image ${imgIdx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Right Column — Sticky Text (Fades in and stays fixed) */}
            <div className="lg:sticky lg:top-32 self-start py-4">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-6">
                0{index + 1} — {section.label}
              </p>
              
              {/* Skill Stack for Section */}
              {section.skills && (
                <div className="flex flex-wrap gap-1.5 mb-8">
                  <span className="text-[9px] uppercase tracking-wider text-foreground/30 mr-1 mt-1">Skill Stack</span>
                  {section.skills.map(skill => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/[0.03] border border-foreground/5 text-foreground/50">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <h3 className="text-[32px] sm:text-[40px] font-normal tracking-[-0.01em] text-foreground leading-[1.15] mb-8">
                {section.heading}
              </h3>
              <p className="text-[16px] xl:text-[18px] leading-[1.8] xl:leading-[1.9] text-foreground/60 max-w-2xl">
                {section.body}
              </p>
            </div>
          </section>
        ))}

        {/* Outcome Section — Centered Accent */}
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center pt-20 pb-10 border-t border-foreground/5">
            <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-8">
              Project Outcome
            </p>
            <p className="text-[32px] sm:text-[42px] font-normal leading-[1.25] tracking-[-0.02em] text-foreground italic decoration-foreground/20">
              &ldquo;{project.outcome}&rdquo;
            </p>

            {/* Redundant Website Link Button — Bottom */}
            {project.websiteUrl && (
              <div className="mt-12 flex justify-center">
                <Link 
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-foreground text-background text-[14px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
                >
                  {project.websiteLabel || "Visit Website"}
                </Link>
              </div>
            )}
          </div>
        </FadeIn>

      </div>

      {/* ───────────────────────── FOOTER NAV ───────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
        <FadeIn>
          <div className="flex items-center justify-between pt-8 border-t border-foreground/10 pb-24">
            <Link href="/" className="text-[13px] text-foreground/50 hover:text-foreground transition-colors">
              ← All Projects
            </Link>
            <div className="flex flex-col items-end gap-1">
              <p className="text-[12px] tracking-[0.08em] uppercase text-foreground/30 font-medium">
                {project.company}
              </p>
              {project.websiteUrl && (
                <Link 
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-foreground/40 hover:text-foreground transition-colors font-mono"
                >
                  {project.websiteLabel || project.websiteUrl.replace("https://", "")}
                </Link>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
