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

const outcomes = [
  { value: "$50M+", label: "GMV Tracked", sub: "B2B transaction volume" },
  { value: "5", label: "Team Size", sub: "Product + Engineering" },
  { value: "200+", label: "Verified Orgs", sub: "Importers & Exporters" },
  { value: "85%", label: "Retention", sub: "Quarterly re-trade rate" },
];

const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "WebSockets", category: "Real-time" },
  { name: "Figma", category: "Design" },
  { name: "TypeScript", category: "Language" },
  { name: "TailwindCSS", category: "Styling" },
];

const categoryColors: Record<string, string> = {
  Framework: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Backend: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Database: "bg-foreground/5 border-foreground/10 text-foreground/70",
  "Real-time": "bg-foreground/5 border-foreground/10 text-foreground/70",
  Design: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Language: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Styling: "bg-foreground/5 border-foreground/10 text-foreground/70",
};

const pmSkills = [
  { label: "Marketplace Strategy", level: 92 },
  { label: "User Discovery (B2B)", level: 88 },
  { label: "Technical PM", level: 85 },
  { label: "UI/UX Design", level: 90 },
  { label: "Supply Chain Logistics", level: 75 },
  { label: "Growth Operations", level: 82 },
];

const processSteps = [
  { step: "01", label: "User Research", desc: "Interviewed 50+ SMB traders to map the 'trust deficit' in cross-border commerce." },
  { step: "02", label: "Network Mapping", desc: "Verified that high-value trades follow social networks. Trust isn't binary; it's relational." },
  { step: "03", label: "MVP Design", desc: "Built a high-fidelity dark UI focused on transaction states and verification signals." },
  { step: "04", label: "Real-time Matching", desc: "Architected the event-driven system to match buyers and sellers as opportunities arise." },
  { step: "05", label: "Network Growth", desc: "Implemented a referral-based onboarding model that leveraged existing trade relationships." },
  { step: "06", label: "Scale Results", desc: "Facilitated $50M+ in volume within Q1 with a retention rate of 85% among verified businesses." },
];

// ────────────────────────────────────────────────────────────────────────────

export default function NetaBridgePage() {
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
              {["Marketplace", "B2B", "Supply Chain", "Fintech"].map((tag) => (
                <span key={tag} className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] leading-[1.1]">
              <span className="text-foreground/50">Neta Bridge.</span>{" "}
              <span className="text-foreground">Turn your network into trade opportunities.</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.8] text-foreground/60 max-w-2xl">
              A B2B marketplace turning professional networks into trade opportunities by architecting
              trust signals into every transaction layer — moving over $50M in the first quarter alone.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="https://netabridge.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                netabridge.com <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Hero Meta Strip */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-foreground/10">
              {[
                { label: "My Role", value: "Designer & Frontend Developer" },
                { label: "Industry", value: "B2B Marketplace" },
                { label: "Stage", value: "2026 - Present" },
                { label: "Team Size", value: "5 people" },
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

        {/* ── 01: THE CHALLENGE ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12 text-center">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">01 — The Challenge</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-6 mx-auto max-w-3xl">
                Cross-border trade is built on trust, yet the existing platforms feel impersonal and opaque.
              </h2>
              <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-2xl mx-auto">
                Small and medium-sized importers struggle to find reliable partners. I interviewed over 50 traders
                to map exactly where the trust breaks down: verification, transaction clarity, and social proof.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ── 02: SKILLS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">02 — Skills Applied</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                Strategic PM Execution
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

        {/* ── 03: PROCESS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">03 — Process</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-12">
                From interview to $50M GMV
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

        {/* ── 04: TECH STACK ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">04 — Tech Stack</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                Built for real-time commerce
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

        {/* ── FOOTER ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <FadeIn>
            <div className="flex items-center justify-between pt-8 border-t border-foreground/10 pb-24">
              <Link href="/" className="text-[13px] text-foreground/50 hover:text-foreground transition-colors">
                ← All Projects
              </Link>
              <div className="flex flex-col items-end gap-1">
                <p className="text-[12px] tracking-[0.08em] uppercase text-foreground/30 font-medium">Neta Network</p>
                <p className="text-[11px] text-foreground/40 font-mono">B2B Trade, Architected</p>
              </div>
            </div>
          </FadeIn>
        </div>

      </article>
      <BottomDock />
    </>
  );
}
