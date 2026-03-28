"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, X, ArrowUpRight } from "lucide-react";
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

// Accordion Item
function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`bg-foreground/[0.03] border border-foreground/5 rounded-[4px] overflow-hidden transition-all duration-300 ${isOpen ? "bg-foreground/[0.05] border-foreground/10" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-6 text-left group cursor-pointer transition-all duration-300 hover:bg-foreground/[0.02]"
      >
        <span className={`text-[13px] sm:text-[14px] font-medium transition-colors duration-300 ${isOpen ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"} tracking-tight`}>
          {title}
        </span>
        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-foreground bg-foreground text-background rotate-90" : "border-foreground/40 text-foreground/60 group-hover:border-foreground/40 group-hover:text-foreground"}`}>
          {isOpen ? <X size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="px-6 pb-8">
              <p className="text-[13px] leading-[1.8] text-foreground/60 max-w-[90%] font-light">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Section layouts
const sectionLayouts = ["text-left", "text-right", "full-dark", "text-left"] as const;

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const accordionItems = [
    { title: "The Problem", content: project.accordion.problem },
    { title: "The Solution", content: project.accordion.solution },
    { title: "My Role", content: project.accordion.myRole },
    { title: "Business Impact", content: project.accordion.businessImpact },
  ];

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
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] text-foreground leading-[1.1]">
            {project.title}.{" "}
            <span className="text-foreground/50">{project.impactStatement}</span>
          </h1>

          {/* PM Skill Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.pmSkills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ───────────────────────── CONTENT GRID (Left: Scroll, Right: Sticky Accordion) ───────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.5fr_400px] gap-8 lg:gap-16 items-start">
          
          {/* Left Column — Primary Image & Deep Dives */}
          <div className="w-full space-y-24 lg:space-y-32">
            
            {/* Primary Image */}
            <FadeIn delay={0.2} className="w-full">
              <div className="w-full overflow-hidden relative border border-foreground/10" style={{ aspectRatio: "16/11" }}>
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            </FadeIn>

            {/* Deep Dive Sections */}
            <div className="space-y-24 lg:space-y-32">
              {project.sections.map((section, index) => {
                const layout = sectionLayouts[index % sectionLayouts.length];

                if (layout === "full-dark") {
                  return (
                    <FadeIn key={section.label}>
                      <div className="bg-foreground p-8 sm:p-12 md:p-16">
                        <p className="text-[10px] tracking-[0.12em] uppercase text-white/40 font-medium mb-4">
                          {section.label}
                        </p>
                        <h3 className="text-[24px] sm:text-[32px] md:text-[36px] font-normal tracking-[-0.01em] text-white leading-[1.2] max-w-3xl mb-6">
                          {section.heading}
                        </h3>
                        <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/60 max-w-3xl mb-12">
                          {section.body}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {section.images.map((img, imgIdx) => (
                            <div key={imgIdx} className="overflow-hidden relative" style={{ aspectRatio: "16/10" }}>
                              <Image src={img} alt={`${section.label} ${imgIdx + 1}`} fill className="object-cover" sizes="50vw" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  );
                }

                // text-left or text-right alternating layouts
                const isReversed = layout === "text-right";

                return (
                  <FadeIn key={section.label}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                      {/* Text Side */}
                      <div className={`${isReversed ? "md:order-2" : "md:order-1"}`}>
                        <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-4">
                          {section.label}
                        </p>
                        <h3 className="text-[24px] sm:text-[28px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-6">
                          {section.heading}
                        </h3>
                        <p className="text-[15px] sm:text-[16px] leading-[1.7] text-foreground/60">
                          {section.body}
                        </p>
                      </div>

                      {/* Image Side */}
                      <div className={`${isReversed ? "md:order-1" : "md:order-2"} space-y-5`}>
                        {section.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="overflow-hidden relative" style={{ aspectRatio: imgIdx === 0 ? "4/3" : "16/10" }}>
                            <Image src={img} alt={`${section.label} ${imgIdx + 1}`} fill className="object-cover" sizes="50vw" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            {/* Outcome */}
            <FadeIn>
              <div className="max-w-4xl mx-auto text-center py-16">
                <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-6">
                  Outcome
                </p>
                <p className="text-[28px] sm:text-[36px] font-normal leading-[1.3] tracking-[-0.01em] text-foreground">
                  &ldquo;{project.outcome}&rdquo;
                </p>
              </div>
            </FadeIn>

            {/* Final Image */}
            <FadeIn>
              <div className="w-full overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
                <Image src={project.images[0]} alt={`${project.title} — final`} fill className="object-cover" sizes="100vw" />
              </div>
            </FadeIn>

          </div>

          {/* Right Column — Sticky Accordion */}
          <div className="w-full lg:sticky lg:top-12 pt-4 lg:pt-0">
            <FadeIn delay={0.3} className="w-full">
              <div className="flex flex-col gap-[2px]">
                {accordionItems.map((item, i) => (
                  <AccordionItem
                    key={item.title}
                    title={item.title}
                    content={item.content}
                    isOpen={openAccordion === i}
                    onToggle={() => setOpenAccordion(openAccordion === i ? null : i)}
                  />
                ))}

                {/* Website Link Button - Integrated with gap-2px */}
                {project.websiteUrl && (
                  <div className="flex">
                    <Link 
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
                    >
                      {project.websiteLabel || "Visit Website"}
                    </Link>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

      {/* ───────────────────────── FOOTER NAV ───────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
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
