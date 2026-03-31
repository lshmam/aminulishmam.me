"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import BottomDock from "@/components/BottomDock";

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
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const barrierData = [
  { label: "Time", count: 6 },
  { label: "Exercise Knowledge", count: 5 },
  { label: "Motivation", count: 4 },
  { label: "Fatigue", count: 4 },
  { label: "Accountability", count: 2 },
  { label: "Cost", count: 1 },
];

const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "TailwindCSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Google Gemini", category: "AI" },
  { name: "Computer Vision", category: "AI" },
  { name: "Figma", category: "Design" },
  { name: "TypeScript", category: "Language" },
];

const categoryColors: Record<string, string> = {
  Framework: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  Styling: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  Animation: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  AI: "bg-green-500/10 border-green-500/20 text-green-400",
  Design: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  Language: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
};

const skills = [
  { label: "User Research", level: 90 },
  { label: "Product Strategy", level: 85 },
  { label: "UI/UX Design", level: 95 },
  { label: "Computer Vision", level: 70 },
  { label: "Frontend Dev", level: 88 },
  { label: "Go-to-Market", level: 75 },
];

const processSteps = [
  { step: "01", label: "User Research", desc: "Surveyed 15+ gym-goers to map friction across knowledge, motivation, cost, and time." },
  { step: "02", label: "Market Research", desc: "Semantic analysis of top App Store fitness apps to identify the 'Form Feedback Gap'." },
  { step: "03", label: "User Flow", desc: "Designed an end-to-end workout journey from onboarding to real-time CV coaching loop." },
  { step: "04", label: "Branding", desc: "Created the JC logo (an apostrophe) and a stern-but-friendly typographic system for coach-like authority." },
  { step: "05", label: "Development", desc: "Built the web Alpha using NextJS, integrating multimodal AI for voice and pose estimation." },
  { step: "06", label: "Alpha Launch", desc: "Seeded Reddit with early access. 100+ users provided the data to iterate toward App of the Day." },
];

const marketGaps = [
  { label: "Custom Workout Plans", covered: true },
  { label: "Progress Tracking", covered: true },
  { label: "Video Demonstrations", covered: true },
  { label: "Affordable Pricing", covered: false },
  { label: "Real-Time Form Correction", covered: false },
  { label: "AI Coaching Voice", covered: false },
];

const outcomes = [
  { value: "100+", label: "Alpha Users", sub: "via Reddit launch" },
  { value: "30fps", label: "Pose Tracking", sub: "real-time on device" },
  { value: "6wks", label: "To Validation", sub: "concept to product" },
  { value: "#1", label: "Form App", sub: "CV-based on App Store" },
];

// ────────────────────────────────────────────────────────────────────────────

export default function JimCoachPage() {
  const maxCount = Math.max(...barrierData.map((d) => d.count));

  return (
    <>
      <article className="min-h-screen">

        {/* Back */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* ── HERO ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {["Mobile App", "Health & Fitness", "Computer Vision", "AI"].map((tag) => (
                <span key={tag} className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] leading-[1.1]">
              <span className="text-foreground/50">Jim Coach.</span>{" "}
              <span className="text-foreground">An AI personal trainer in your pocket — form checked, reps counted, no gym membership required.</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.8] text-foreground/60 max-w-2xl">
              Jim Coach is a mobile AI fitness assistant built to eliminate the three biggest barriers to working out:
              not knowing what to do, not knowing if you&apos;re doing it right, and not being able to afford someone who does.
              Using computer vision and multimodal AI, it watches your form in real-time, counts your reps, and coaches you — like a personal trainer, but on your phone.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="https://jim.coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                jim.coach <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Hero Meta Strip */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-foreground/10">
              {[
                { label: "My Role", value: "Product Designer & Developer" },
                { label: "Industry", value: "Health & Fitness" },
                { label: "Stage", value: "Active — 2023–Present" },
                { label: "Team Size", value: "4 people" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-foreground/35 font-medium">{label}</span>
                  <span className="text-[15px] font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── OUTCOME STATS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-20">
          <FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-foreground/5 border border-foreground/5">
              {outcomes.map((o, i) => (
                <motion.div
                  key={o.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-background px-8 py-10 text-center"
                >
                  <p className="text-[40px] sm:text-[52px] font-light tracking-tight text-foreground leading-none mb-2">{o.value}</p>
                  <p className="text-[13px] font-medium text-foreground/70 mb-1">{o.label}</p>
                  <p className="text-[11px] tracking-wider uppercase text-foreground/30">{o.sub}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── USER RESEARCH BAR CHART ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">01 — User Research</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                What barriers do people face to working out?
              </h2>
              <p className="text-[14px] leading-relaxed text-foreground/50 mb-12 max-w-2xl">
                I conducted a survey of 15+ people from my gym. I wanted to understand the friction points.
                The most common words have been visualised below by frequency.
              </p>

              {/* Bar Chart */}
              <div className="space-y-4">
                {barrierData.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-[12px] text-foreground/50 w-40 shrink-0 text-right pr-2">{item.label}</span>
                    <div className="flex-1 flex items-center gap-3">
                      <motion.div
                        className="h-7 bg-foreground/90 rounded-sm"
                        style={{ width: 0 }}
                        whileInView={{ width: `${(item.count / maxCount) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <span className="text-[22px] font-light text-foreground/80 tabular-nums">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── MARKET GAP ANALYSIS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">02 — Market Research</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                Identifying the &apos;Form Gap&apos; in the App Store
              </h2>
              <p className="text-[14px] leading-relaxed text-foreground/50 mb-10 max-w-2xl">
                Top fitness apps did most things well. But a major gap emerged: no app could ensure exercises were performed with correct form — 
                the single feature that determines results and prevents injury.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {marketGaps.map((gap, i) => (
                  <motion.div
                    key={gap.label}
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className={`flex items-center gap-3 p-4 border rounded-sm ${
                      gap.covered
                        ? "border-foreground/5 bg-foreground/[0.02]"
                        : "border-foreground/15 bg-foreground/[0.04]"
                    }`}
                  >
                    <span className={`text-[16px] ${gap.covered ? "text-foreground/25" : "text-foreground"}`}>
                      {gap.covered ? "✓" : "✕"}
                    </span>
                    <span className={`text-[13px] font-medium ${gap.covered ? "text-foreground/40 line-through" : "text-foreground/80"}`}>
                      {gap.label}
                    </span>
                    {!gap.covered && (
                      <span className="ml-auto text-[9px] tracking-[0.1em] uppercase text-foreground/40 font-medium whitespace-nowrap">Gap</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── SKILLS APPLIED ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">03 — Skills Applied</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                End-to-end capability required
              </h2>

              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <div key={skill.label} className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[13px] font-medium text-foreground/70">{skill.label}</span>
                      <span className="text-[11px] font-mono text-foreground/30">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-foreground/70 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── TECH STACK ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">04 — Tech Stack</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                Tools that built Jim Coach
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={`p-4 border rounded-sm ${categoryColors[tech.category] || "bg-foreground/5 border-foreground/10 text-foreground/60"}`}
                  >
                    <p className="text-[9px] uppercase tracking-[0.1em] opacity-60 mb-1.5">{tech.category}</p>
                    <p className="text-[15px] font-medium">{tech.name}</p>
                  </motion.div>
                ))}
              </div>

              {/* Category legend */}
              <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-foreground/5">
                {Object.entries(categoryColors).map(([cat, cls]) => (
                  <span key={cat} className={`text-[10px] px-2.5 py-1 rounded border ${cls}`}>
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── PROCESS TIMELINE ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">05 — Process</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-12">
                From Gym Survey to App Store
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5">
                {processSteps.map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-background p-8 group"
                  >
                    <p className="text-[10px] font-mono text-foreground/25 mb-4">{s.step}</p>
                    <h3 className="text-[16px] font-medium text-foreground mb-3">{s.label}</h3>
                    <p className="text-[13px] leading-[1.7] text-foreground/50">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── DISTRIBUTION LESSON ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">06 — Lessons Learned</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-8">
                Distribution is the Final Boss
              </h2>
              <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-3xl mb-8">
                Early validation was strong, but scale didn&apos;t come from individual user acquisition — it clicked when I discovered
                the efficiency of <strong className="text-foreground/80 font-medium">nodes of distribution</strong>.
                Personal trainers weren&apos;t just users; they were multipliers. Each PT carried a roster of clients who had a real, 
                immediate need for Jim Coach.
              </p>
              <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-3xl mb-12">
                To understand this problem properly, I went all the way in: <strong className="text-foreground/80 font-medium">I got a job as a personal trainer.</strong>{" "}
                Living the PT experience gave me an insider&apos;s perspective on how coaches think about client progress, what 
                tools they trust, and exactly where Jim Coach could slot into their workflow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
                {[
                  { label: "Personal Trainers Approached", value: "12+", desc: "In local gyms & studios" },
                  { label: "Avg. Clients per PT", value: "20–40", desc: "Immediate distribution nodes" },
                  { label: "Next Step", value: "Mobile", desc: "Native camera & notifications" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background p-8"
                  >
                    <p className="text-[38px] font-light text-foreground leading-none mb-2">{item.value}</p>
                    <p className="text-[13px] font-medium text-foreground/65 mb-1">{item.label}</p>
                    <p className="text-[11px] text-foreground/35 uppercase tracking-wider">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── FOOTER ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <FadeIn>
            <div className="flex items-center justify-between pt-8 border-t border-foreground/10 pb-24">
              <Link href="/" className="text-[13px] text-foreground/50 hover:text-foreground transition-colors">
                ← All Projects
              </Link>
              <div className="flex flex-col items-end gap-1">
                <p className="text-[12px] tracking-[0.08em] uppercase text-foreground/30 font-medium">Jim Fitness</p>
                <Link
                  href="https://jim.coach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-foreground/40 hover:text-foreground transition-colors font-mono"
                >
                  jim.coach
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>

      </article>
      <BottomDock />
    </>
  );
}
