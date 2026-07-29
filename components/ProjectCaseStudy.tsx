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
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SERIF = { fontFamily: "var(--font-tiempos), Georgia, serif" };
const SANS  = { fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif" };

export default function ProjectCaseStudy({ 
  project, 
  hideHeroImage = false 
}: { 
  project: Project;
  hideHeroImage?: boolean;
}) {
  return (
    <article className="min-h-screen pb-20" style={SANS}>
      
      {/* ── NAV ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-6 pb-5 flex items-center justify-between border-b border-foreground/8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-foreground/50 hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          All projects
        </Link>
        {project.websiteUrl && (
          <Link
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-foreground/50 hover:text-foreground transition-colors"
          >
            {project.websiteLabel || project.title} <ArrowUpRight size={13} />
          </Link>
        )}
      </div>

      {/* ── HERO ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-7">
            {project.tags.slice(0, 2).join(" / ")} — {project.year}
          </p>
          <h1
            className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.04] tracking-[-0.03em] text-foreground mb-8 max-w-4xl"
            style={SERIF}
          >
            {project.tagline || project.title}
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.75] text-foreground/55 max-w-2xl">
            {project.overview}
          </p>
        </motion.div>
      </div>

      {/* ── HERO IMAGE ── */}
      {!hideHeroImage && project.images?.[0] && (
        <FadeIn>
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
            <div className="w-full rounded-2xl overflow-hidden border border-foreground/8 shadow-xl">
              <Image
                src={project.images[0]}
                alt={`${project.title} hero`}
                width={2400}
                height={1200}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── DYNAMIC SECTIONS ── */}
      {project.sections.map((section, idx) => (
        <div key={idx}>
          {/* Section Text */}
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
            <FadeIn>
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
                0{idx + 1} — {section.label}
              </p>
              <h2
                className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
                style={SERIF}
              >
                {section.heading}
              </h2>
              <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
                {section.body}
              </p>
            </FadeIn>
          </div>

          {/* Section Images */}
          {section.images?.map((img, imgIdx) => (
            <FadeIn key={imgIdx}>
              <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
                <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
                  <Image
                    src={img}
                    alt={`${section.label} image ${imgIdx + 1}`}
                    width={2400}
                    height={1400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      ))}

      {/* ── HIGHLIGHTS GRID ── */}
      {project.accordion && (
        <>
          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-10">
            <FadeIn>
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
                Summary — Project Details
              </p>
              <h2
                className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-14 max-w-3xl"
                style={SERIF}
              >
                Key details from {project.title}.
              </h2>
            </FadeIn>
          </div>

          <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {[
                  { n: "01", title: "The Problem", body: project.accordion.problem },
                  { n: "02", title: "The Solution", body: project.accordion.solution },
                  { n: "03", title: "My Role", body: project.accordion.myRole },
                  { n: "04", title: "Business Impact", body: project.accordion.businessImpact },
                ].map((item) => (
                  <div key={item.n}>
                    <span className="text-[10px] font-mono text-foreground/25 uppercase tracking-widest block mb-4">{item.n}</span>
                    <h3 className="text-[19px] font-medium text-foreground mb-3 leading-snug">{item.title}</h3>
                    <p className="text-[15px] leading-[1.85] text-foreground/55">{item.body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </>
      )}

      {/* ── FINAL CTA ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
          <div className="border-t border-foreground/10 pt-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-3">
                Project Outcome
              </p>
              <h2
                className="text-[28px] sm:text-[36px] leading-[1.2] tracking-[-0.02em] text-foreground max-w-xl"
                style={SERIF}
              >
                &ldquo;{project.outcome}&rdquo;
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-4 shrink-0">
              {project.websiteUrl && (
                <Link
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[13px] font-medium rounded-[5px] hover:bg-foreground/85 active:scale-[0.97] transition-all tracking-tight"
                >
                  Visit {project.websiteLabel || project.title} <ArrowUpRight size={14} />
                </Link>
              )}
              {project.gbpUrl && (
                <Link
                  href={project.gbpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-foreground/20 text-foreground bg-transparent hover:bg-foreground/5 text-[13px] font-medium rounded-[5px] active:scale-[0.97] transition-all tracking-tight"
                >
                  View Profile <ArrowUpRight size={14} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── BOTTOM NAV ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-10 flex items-center justify-between border-t border-foreground/8 pt-8">
          <Link href="/" className="text-[13px] text-foreground/45 hover:text-foreground transition-colors">
            ← All projects
          </Link>
        </div>
      </FadeIn>

    </article>
  );
}
