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
  { value: "$200k", label: "Raised", sub: "Seed investment secured" },
  { value: "5", label: "Team Size", sub: "Cross-functional founders" },
  { value: "5th", label: "Grade Level", sub: "Target reading complexity" },
  { value: "97%", label: "Gap", sub: "Eligible patients who never enroll" },
];

const trialBenefits = [
  { label: "Free cutting-edge treatment", pct: 85, color: "bg-foreground/40" },
  { label: "Closer medical monitoring", pct: 78, color: "bg-foreground/30" },
  { label: "Access before public approval", pct: 65, color: "bg-foreground/20" },
  { label: "Contributing to medical science", pct: 72, color: "bg-foreground/15" },
];

const readabilityTests = [
  { round: "Round 1", score: 11.2, label: "Grade 11 — Too Complex", pass: false },
  { round: "Round 2", score: 8.4, label: "Grade 8 — Still Dense", pass: false },
  { round: "Round 3", score: 6.1, label: "Grade 6 — Borderline", pass: false },
  { round: "Round 4", score: 4.9, label: "Grade 5 — Target Hit ✓", pass: true },
];

const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "OpenAI GPT-4", category: "AI" },
  { name: "ClinicalTrials.gov API", category: "Data" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Custom Matching Algo", category: "Algorithm" },
  { name: "Figma", category: "Design" },
  { name: "TypeScript", category: "Language" },
];

const categoryColors: Record<string, string> = {
  Framework: "bg-foreground/5 border-foreground/10 text-foreground/70",
  AI: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Data: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Database: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Algorithm: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Design: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Language: "bg-foreground/5 border-foreground/10 text-foreground/70",
};

const processSteps = [
  { step: "01", label: "Clinician Brief", desc: "A doctor on our team surfaced the problem: his patients were missing life-changing trials simply because they didn't know they existed." },
  { step: "02", label: "Problem Validation", desc: "We mapped the clinical trial enrollment funnel. Only 3% of eligible cancer patients ever enroll — not from reluctance, but from a system that was never designed for patients." },
  { step: "03", label: "Source Discovery", desc: "We identified ClinicalTrials.gov as the authoritative database with 400,000+ active trials. The data was there. The usability was not." },
  { step: "04", label: "AI Simplification", desc: "We layered GPT-4 on top of the raw trial data to translate dense medical eligibility criteria into plain English that anyone could understand." },
  { step: "05", label: "Readability Testing", desc: "We ran 4 rounds of user testing with patients and non-medical professionals, targeting a 5th-grade Flesch-Kincaid reading level while preserving all essential meaning." },
  { step: "06", label: "Brand & Naming", desc: "I named the product 'MyTrials' — personal, possessive, and instantly clear. Matching algorithm built. Site launched. $200k raised." },
];

const pmSkills = [
  { label: "Stakeholder Management", level: 92 },
  { label: "User Research & Testing", level: 88 },
  { label: "Product Strategy", level: 85 },
  { label: "Health Literacy Design", level: 80 },
  { label: "Investor Storytelling", level: 78 },
  { label: "Cross-functional Leadership", level: 90 },
];

// ────────────────────────────────────────────────────────────────────────────

export default function MyTrialsPage() {
  const maxBenefit = Math.max(...trialBenefits.map((b) => b.pct));

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
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["Healthcare", "Product Management", "AI", "UX Research"].map((tag) => (
                <span key={tag} className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] leading-[1.1]">
              <span className="text-foreground/50">MyTrials.</span>{" "}
              <span className="text-foreground">Making clinical trials accessible to every patient, everywhere.</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.8] text-foreground/60 max-w-2xl">
              A clinician on our team kept watching his patients miss out on treatments that could change their lives —
              not because the treatments didn't exist, but because the system to find them was built for researchers, not people.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="https://mytrials.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                mytrials.ai <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-foreground/10">
              {[
                { label: "My Role", value: "Product Lead & UX Designer" },
                { label: "Industry", value: "Healthcare" },
                { label: "Stage", value: "Completed — 2023" },
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

        {/* ── 01: THE ORIGIN ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">01 — The Origin</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                A doctor watched his patients miss life-changing treatments
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                <div className="space-y-5">
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    One of our co-founders was a clinician who repeatedly saw the same situation unfold:
                    a patient with a diagnosis that qualified them for a cutting-edge clinical trial —
                    and no idea it existed. The trials were real. The hope was real. The pathway to find them was not.
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    He brought the problem to our team. We immediately understood the stakes.
                    Clinical trials aren&apos;t just research. For many patients, they represent their best option —
                    sometimes their only option — for treatment.
                  </p>
                </div>
                {/* Benefits Visual */}
                <div className="space-y-4">
                  <p className="text-[11px] uppercase tracking-wider text-foreground/40 mb-6 font-medium">
                    Why clinical trials matter to patients
                  </p>
                  {trialBenefits.map((b, i) => (
                    <div key={b.label} className="flex items-center gap-4">
                      <span className="text-[12px] text-foreground/50 w-52 shrink-0 text-right pr-2">{b.label}</span>
                      <div className="flex-1 flex items-center gap-3">
                        <motion.div
                          className={`h-6 rounded-sm ${b.color}`}
                          style={{ width: 0 }}
                          whileInView={{ width: `${(b.pct / maxBenefit) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <span className="text-[13px] font-light text-foreground/60 tabular-nums">{b.pct}%</span>
                      </div>
                    </div>
                  ))}
                  <p className="text-[11px] text-foreground/30 mt-4">* patients who cited each benefit as a primary motivator</p>
                </div>
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
                The data exists. The interface does not.
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-start">
                <div className="space-y-5">
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    We discovered ClinicalTrials.gov — the US government&apos;s authoritative database containing
                    over 400,000 active trials. The inventory exists. The problem is the interface.
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    Eligibility criteria reads like legal-medical hybrid text. Terms like
                    &quot;ECOG performance status ≤2&quot; or &quot;histologically confirmed NSCLC&quot; create
                    an impenetrable wall between patients and the treatments designed to help them.
                    The system was built by researchers for researchers — never for patients.
                  </p>
                </div>
                {/* Stat callout */}
                <div className="space-y-4">
                  <div className="border border-foreground/5 p-8 text-center">
                    <p className="text-[72px] font-light text-foreground leading-none mb-3">97%</p>
                    <p className="text-[14px] text-foreground/50">of eligible cancer patients<br />never enroll in a clinical trial</p>
                    <div className="mt-6 h-px bg-foreground/10" />
                    <p className="text-[12px] text-foreground/30 mt-4 uppercase tracking-wider">Not from reluctance. From a broken system.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 03: THE SOLUTION — READABILITY ROUNDS ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">03 — The Solution</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                AI-powered simplification, tested to a 5th-grade reading level
              </h2>
              <p className="text-[14px] leading-relaxed text-foreground/50 mb-12 max-w-2xl">
                We used GPT-4 to translate clinical trial eligibility criteria into plain English automatically.
                But we didn&apos;t stop there — we ran four rigorous rounds of user testing with non-medical participants,
                measuring reading level via Flesch-Kincaid scoring until we hit our target without losing essential meaning.
              </p>

              {/* Readability Progress */}
              <div className="space-y-4 max-w-xl">
                <p className="text-[11px] uppercase tracking-wider text-foreground/40 mb-6 font-medium">
                  Flesch-Kincaid Grade Level — User Testing Rounds
                </p>
                {readabilityTests.map((r, i) => (
                  <motion.div
                    key={r.round}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-4 border rounded-sm ${r.pass ? "border-foreground/30 bg-foreground/5" : "border-foreground/5 bg-foreground/[0.02]"}`}
                  >
                    <span className="text-[11px] font-mono text-foreground/40 w-16 shrink-0">{r.round}</span>
                    <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${r.pass ? "bg-foreground/60" : "bg-foreground/30"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(r.score / 12) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                    <span className={`text-[12px] font-medium w-48 shrink-0 ${r.pass ? "text-foreground/70" : "text-foreground/50"}`}>
                      {r.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 04: PROCESS TIMELINE ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">04 — Process</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-12">
                From clinical insight to funded product
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
                Product management across a high-stakes domain
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
                Tools that built MyTrials
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

        {/* ── 07: THE RAISE ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">07 — Investment</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-8">
                $200,000 raised on the strength of the mission
              </h2>
              <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-3xl mb-8">
                The investment thesis was clear: the problem is enormous and well-documented, the technology exists,
                and for the first time the user experience has been built for patients rather than researchers.
                Investors believed in both the social impact and the commercial opportunity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5 mt-10">
                {[
                  { label: "Seed Round", value: "$200k", desc: "Pre-product investment" },
                  { label: "Team", value: "5", desc: "Clinical + tech + design" },
                  { label: "Data Source", value: "400k+", desc: "Active ClinicalTrials.gov entries" },
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
                <p className="text-[12px] tracking-[0.08em] uppercase text-foreground/30 font-medium">MyTrials Inc.</p>
                <Link
                  href="https://mytrials.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-foreground/40 hover:text-foreground transition-colors font-mono"
                >
                  mytrials.ai
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
