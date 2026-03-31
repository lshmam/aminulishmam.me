"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import BottomDock from "@/components/BottomDock";
import Image from "next/image";

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

const outcomes = [
  { value: "15+", label: "Pilot Clients", sub: "Med spa & clinic owners" },
  { value: "3x", label: "Lead Velocity", sub: "vs. manual tracking" },
  { value: "40%", label: "Upsell Rate ↑", sub: "after copilot adoption" },
  { value: "0→1", label: "Built Solo", sub: "Product, design & dev" },
];

const painPoints = [
  { label: "Leads not followed up", pct: 88, color: "bg-red-400/70" },
  { label: "No visibility into call quality", pct: 82, color: "bg-orange-400/70" },
  { label: "Missed upsell opportunities", pct: 76, color: "bg-yellow-400/70" },
  { label: "Manual CRM entry burden", pct: 70, color: "bg-purple-400/70" },
];

const pivotTimeline = [
  { step: "V0", label: "AI Receptionist", status: "pivoted", note: "Built in a weekend. Toured auto shops. People said: 'I want to talk to a person.'" },
  { step: "V1", label: "Receptionist Copilot", status: "pivoted", note: "Saw a reel about receptionists as salespeople. Pivoted to augmenting humans, not replacing them." },
  { step: "V2", label: "Med Spa Sales Copilot", status: "active", note: "Talked to med spa owners via LinkedIn & in person. Found the gap. Built the platform. Found product-market fit." },
];

const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "Python / FastAPI", category: "Backend" },
  { name: "OpenAI Whisper", category: "AI" },
  { name: "GPT-4", category: "AI" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Figma", category: "Design" },
  { name: "TypeScript", category: "Language" },
];

const categoryColors: Record<string, string> = {
  Framework: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  Backend: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  AI: "bg-green-500/10 border-green-500/20 text-green-400",
  Database: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  Design: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  Language: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
};

const pmSkills = [
  { label: "Market Research & Pivoting", level: 95 },
  { label: "Customer Discovery", level: 92 },
  { label: "Product Strategy", level: 88 },
  { label: "UI/UX Design", level: 90 },
  { label: "Sales & Outreach", level: 82 },
  { label: "Full-Stack Development", level: 78 },
];

const processSteps = [
  { step: "01", label: "The AI Receptionist", desc: "Built a weekend prototype, printed brochures, hit the streets. Auto shops were the target — high AOV per call. Reality check: people want to talk to people." },
  { step: "02", label: "The Pivot Signal", desc: "A social media reel changed everything: receptionists who sell well drive outsized revenue. The real problem wasn't the human — it was the lack of support around them." },
  { step: "03", label: "Customer Discovery", desc: "Talked to med spa owners in person and on LinkedIn. Ran structured discovery calls. The pain was real and consistent: no tracking, no coaching, no visibility into what's working." },
  { step: "04", label: "The Naming", desc: "I named it Neucler — a play on 'nuclear' energy and clarity. Less headache. More signal. The brand needed to feel powerful but not clinical. Designed the logo myself." },
  { step: "05", label: "Building the Platform", desc: "Rebuilt the product as a sales copilot CRM: automated note-taking, lead tracking, call insights, and follow-up sequences — all in one place." },
  { step: "06", label: "Pilot Launch", desc: "Onboarded 15+ med spa and clinic owners. Monitored usage, gathered feedback, iterated weekly. The upsell conversion rate climbed 40% within the first 8 weeks." },
];

// ────────────────────────────────────────────────────────────────────────────

export default function NeuclerPage() {
  const maxPain = Math.max(...painPoints.map((p) => p.pct));

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
              {["Product Management", "AI", "Sales Enablement", "CRM"].map((tag) => (
                <span key={tag} className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] leading-[1.1]">
              <span className="text-foreground/50">Neucler.</span>{" "}
              <span className="text-foreground">The sales copilot that turns every receptionist into a top closer.</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.8] text-foreground/60 max-w-2xl">
              What started as an AI receptionist became something far more valuable: a CRM and coaching platform built
              specifically for the med spa and clinic industry — automating the busywork so receptionists can focus on
              what actually drives revenue.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="https://neucler.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                neucler.com <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Hero Meta Strip */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-foreground/10">
              {[
                { label: "My Role", value: "Co-Founder & Product Lead" },
                { label: "Industry", value: "Med Spa / Health Clinics" },
                { label: "Stage", value: "Active — 2025–Present" },
                { label: "Built", value: "Solo (0 to 1)" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-foreground/35 font-medium">{label}</span>
                  <span className="text-[15px] font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── KEY STATS ── */}
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

        {/* ── 01: THE PIVOT STORY ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">01 — The Pivot</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                Three versions. Two pivots. One clear signal.
              </h2>

              <div className="mt-10 space-y-0">
                {pivotTimeline.map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className={`relative flex gap-6 pb-10 ${i < pivotTimeline.length - 1 ? "border-l border-foreground/10 ml-5" : "ml-5"}`}
                  >
                    {/* Dot */}
                    <div className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${item.status === "active" ? "border-foreground bg-foreground" : "border-foreground/20 bg-background"}`} />
                    
                    <div className="pl-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-mono text-foreground/30">{item.step}</span>
                        <span className={`text-[16px] font-medium ${item.status === "active" ? "text-foreground" : "text-foreground/50"}`}>{item.label}</span>
                        {item.status === "pivoted" && (
                          <span className="text-[9px] px-2 py-0.5 border border-foreground/10 rounded-full text-foreground/30 uppercase tracking-wider">pivoted</span>
                        )}
                        {item.status === "active" && (
                          <span className="text-[9px] px-2 py-0.5 border border-green-500/30 rounded-full text-green-400 uppercase tracking-wider bg-green-500/5">active</span>
                        )}
                      </div>
                      <p className="text-[14px] leading-[1.75] text-foreground/50 max-w-2xl">{item.note}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 02: THE PROBLEM ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">02 — The Problem</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                Med spa receptionists are the first touchpoint — and the most underserved
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                <div className="space-y-5">
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    After talking to med spa owners in person and through LinkedIn, the same picture emerged every time.
                    Receptionists were handling inbound interest, fielding questions, booking consultations — and consistently
                    leaving money on the table. Not from lack of effort, but from lack of tools.
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    There was no system for following up with leads. No visibility into what was said on calls. No coaching
                    on how to upsell treatments that patients were genuinely interested in. The CRM they used, if any,
                    was a spreadsheet.
                  </p>
                </div>
                {/* Pain points chart */}
                <div className="space-y-4">
                  <p className="text-[11px] uppercase tracking-wider text-foreground/40 mb-6 font-medium">
                    Top pain points — med spa discovery calls
                  </p>
                  {painPoints.map((p, i) => (
                    <div key={p.label} className="flex items-center gap-4">
                      <span className="text-[12px] text-foreground/50 w-52 shrink-0 text-right pr-2">{p.label}</span>
                      <div className="flex-1 flex items-center gap-3">
                        <motion.div
                          className={`h-6 rounded-sm ${p.color}`}
                          style={{ width: 0 }}
                          whileInView={{ width: `${(p.pct / maxPain) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <span className="text-[13px] font-light text-foreground/60 tabular-nums">{p.pct}%</span>
                      </div>
                    </div>
                  ))}
                  <p className="text-[11px] text-foreground/30 mt-4">* % of owners who cited this as a primary bottleneck</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 03: THE NAME ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">03 — Brand & Naming</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-8">
                Neucler: less headache, more signal
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-5">
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    The name&apos;s a play on &quot;nuclear&quot; — the idea of concentrated, powerful energy that clarifies
                    rather than complicates. Receptionists were already under pressure. The product needed to feel like it
                    removed weight, not added it.
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    I designed the logo myself — a wordmark that balances authority with approachability. The &quot;eu&quot;
                    suffix nods to clarity and good UX. The visual language throughout the product follows the same principle:
                    clean, purposeful, low-friction.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {["Automation", "Note-taking", "Lead tracking", "Sales insights"].map((p) => (
                      <span key={p} className="text-[12px] px-3 py-1.5 border border-foreground/10 rounded-full text-foreground/60 bg-foreground/[0.02]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Logo display */}
                <div className="flex items-center justify-center border border-foreground/5 bg-black rounded-sm aspect-square max-w-xs mx-auto w-full">
                  <Image
                    src="/Frame 79.png"
                    alt="Neucler Logo"
                    width={180}
                    height={180}
                    className="object-contain opacity-90"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 04: SALES & OUTREACH ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">04 — Sales & Market Validation</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                Every channel. Every door. Until the market answered.
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-start">
                <div className="space-y-5">
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    Validating Neucler wasn&apos;t a survey or a landing page — it was a full-contact sales campaign.
                    I went out and talked to real business owners across every channel available:
                    cold emails, Instagram DMs, LinkedIn outreach, cold calls, and showing up door-to-door
                    at clinics and med spas in person.
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    The goal wasn&apos;t just to sell — it was to listen. Every rejection was a data point.
                    Every question they asked told me something the product needed to answer. This grind gave me
                    a ground-level understanding of the market that no amount of research could have replaced.
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    The owners who were most receptive weren&apos;t looking for technology — they were looking for
                    relief. That reframe shaped everything: the pitch, the onboarding, the UI. Neucler couldn&apos;t
                    feel like software. It had to feel like help arrived.
                  </p>
                </div>
                {/* Outreach channel breakdown */}
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-wider text-foreground/40 mb-6 font-medium">
                    Outreach channels used for validation
                  </p>
                  {[
                    { channel: "LinkedIn DMs", icon: "↗", note: "Targeted med spa & clinic owners directly", color: "border-blue-500/20 bg-blue-500/5 text-blue-400" },
                    { channel: "Cold Email", icon: "✉", note: "Personalised sequences to practice managers", color: "border-purple-500/20 bg-purple-500/5 text-purple-400" },
                    { channel: "Instagram DMs", icon: "◈", note: "Reached owners through clinic social profiles", color: "border-pink-500/20 bg-pink-500/5 text-pink-400" },
                    { channel: "Door-to-Door", icon: "→", note: "Walked into clinics and pitched face-to-face", color: "border-orange-500/20 bg-orange-500/5 text-orange-400" },
                    { channel: "Cold Calls", icon: "◎", note: "Dialled local med spas from public listings", color: "border-green-500/20 bg-green-500/5 text-green-400" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.channel}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-start gap-4 p-4 border rounded-sm ${item.color}`}
                    >
                      <span className="text-[18px] mt-0.5 shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-[14px] font-medium mb-0.5">{item.channel}</p>
                        <p className="text-[12px] opacity-70">{item.note}</p>
                      </div>
                    </motion.div>
                  ))}
                  <div className="mt-6 p-5 border border-foreground/5 bg-foreground/[0.02] rounded-sm">
                    <p className="text-[13px] text-foreground/50 leading-[1.75]">
                      <strong className="text-foreground/70 font-medium">Key lesson:</strong>{" "}
                      The owners who responded best weren&apos;t always the most &apos;digitally savvy&apos; —
                      they were the ones whose revenue problem was most acute. Pain level predicted conversion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 05: PROCESS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">04 — Process</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-12">
                From AI receptionist to funded-worthy product
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5">
                {processSteps.map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-background p-8"
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

        {/* ── 05: PM SKILLS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">05 — Skills Applied</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                End-to-end product ownership
              </h2>

              <div className="space-y-5 max-w-2xl">
                {pmSkills.map((skill, i) => (
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

        {/* ── 06: TECH STACK ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">06 — Tech Stack</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                Tools that built Neucler
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
            </div>
          </FadeIn>
        </div>

        {/* ── 07: NEXT STEPS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">07 — What's Next</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-8">
                Closing the loop: real-time call coaching
              </h2>
              <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-3xl mb-8">
                The next phase of Neucler moves from passive analytics to active coaching. The platform will listen to live
                sales calls and provide receptionists with real-time prompts, objection-handling suggestions, and post-call
                breakdowns — turning every interaction into a learning opportunity.
              </p>
              <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-3xl mb-12">
                The goal is simple: close the feedback loop between what&apos;s being said on calls and what&apos;s driving
                revenue. Most clinics have no idea where they&apos;re losing clients in the sales conversation. Neucler will
                make that blindspot visible — and then fix it.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
                {[
                  { label: "Live Call Coaching", value: "In Dev", desc: "Real-time prompts during calls" },
                  { label: "Revenue Attribution", value: "Q3 2025", desc: "Tie call quality to bookings" },
                  { label: "Multi-location", value: "Roadmap", desc: "Scale across clinic franchises" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background p-8"
                  >
                    <p className="text-[32px] font-light text-foreground leading-none mb-2">{item.value}</p>
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
                <p className="text-[12px] tracking-[0.08em] uppercase text-foreground/30 font-medium">Neucler Inc.</p>
                <Link
                  href="https://neucler.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-foreground/40 hover:text-foreground transition-colors font-mono"
                >
                  neucler.com
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
