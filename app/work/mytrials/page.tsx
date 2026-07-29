"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

export default function MyTrialsPage() {
  return (
    <article className="min-h-screen" style={SANS}>

      {/* ── NAV ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-6 pb-5 flex items-center justify-between border-b border-foreground/8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-foreground/50 hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          All projects
        </Link>
        <Link
          href="https://mytrials.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-foreground/50 hover:text-foreground transition-colors"
        >
          mytrials.ai <ArrowUpRight size={13} />
        </Link>
      </div>

      {/* ── HERO ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-7">
            Healthcare / Product Research — 2023
          </p>
          <h1
            className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.04] tracking-[-0.03em] text-foreground mb-8 max-w-4xl"
            style={SERIF}
          >
            Making clinical trial enrollment accessible to every patient, everywhere.
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.75] text-foreground/55 max-w-2xl">
            A clinician on our team kept watching his patients miss out on treatments that could change their lives —
            not because the treatments didn&apos;t exist, but because the system to find them was built for researchers,
            not people. MyTrials was built to change that.
          </p>

          {/* Meta Strip */}
          <div className="flex flex-wrap gap-x-10 gap-y-5 mt-12 pt-10 border-t border-foreground/8">
            {[
              { label: "My Role", value: "Co-Founder & UX Designer" },
              { label: "Industry", value: "Healthcare" },
              { label: "Stage", value: "Completed — 2023" },
              { label: "Team", value: "5 people" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">{label}</span>
                <span className="text-[15px] font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── HERO IMAGE ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="w-full rounded-2xl overflow-hidden border border-foreground/8 shadow-xl">
            <Image
              src="/project-marketplace.png"
              alt="MyTrials platform"
              width={2400}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 1: THE ORIGIN ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            01 — The Origin
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            A doctor watched his patients miss life-changing treatments.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            One of our co-founders was a clinician who repeatedly saw the same situation unfold: a patient with a
            diagnosis that qualified them for a cutting-edge clinical trial — and no idea it existed. The trials were real.
            The hope was real. The pathway to find them was not. He brought the problem to our team. For many patients,
            clinical trials represent their best option — sometimes their only option — for treatment.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-marketplace.png"
              alt="MyTrials research"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── DISCOVERY PULL QUOTE ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <blockquote
            className="text-[26px] sm:text-[34px] leading-[1.4] tracking-[-0.015em] text-foreground/70 border-l-[3px] border-foreground/20 pl-8 max-w-3xl"
            style={SERIF}
          >
            &ldquo;Only 3% of eligible cancer patients ever enroll in a clinical trial.
            Not from reluctance. From a system that was never designed for them.&rdquo;
          </blockquote>
        </div>
      </FadeIn>

      {/* ── SECTION 2: THE PROBLEM ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            02 — The Problem
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            The data exists. The interface does not.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            We discovered ClinicalTrials.gov — the US government&apos;s authoritative database containing over 400,000
            active trials. The inventory exists. The problem is the interface. Eligibility criteria reads like
            legal-medical hybrid text. Terms like &ldquo;ECOG performance status ≤2&rdquo; or &ldquo;histologically confirmed NSCLC&rdquo;
            create an impenetrable wall between patients and the treatments designed to help them. The system
            was built by researchers for researchers — never for patients.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-marketplace.png"
              alt="MyTrials problem"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 3: THE SOLUTION ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            03 — The Solution
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            AI-powered simplification, tested to a 5th-grade reading level.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            We used GPT-4 to translate clinical trial eligibility criteria into plain English automatically. But we
            didn&apos;t stop there — we ran four rigorous rounds of user testing with non-medical participants, measuring
            reading level via Flesch-Kincaid scoring until we hit our target without losing essential meaning.
            Round 1 scored Grade 11 (too complex). Round 4 scored Grade 4.9 — our target hit. I named the product
            &ldquo;MyTrials&rdquo; — personal, possessive, and instantly clear.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-marketplace.png"
              alt="MyTrials solution"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 4: INVESTMENT ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            04 — Outcome
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            $200,000 raised on the strength of the mission.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            The investment thesis was clear: the problem is enormous and well-documented, the technology exists,
            and for the first time the user experience has been built for patients rather than researchers.
            Investors believed in both the social impact and the commercial opportunity. The platform expanded
            to cover 10,000+ active trials across 15 therapeutic areas.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-marketplace.png"
              alt="MyTrials investment"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── WHAT I LEARNED ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-10">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            05 — What this project taught me
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-14 max-w-3xl"
            style={SERIF}
          >
            Designing for health literacy is the highest form of empathy in product work.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                n: "01",
                title: "Test for the user's reading level, not your own",
                body: "We ran four full rounds of Flesch-Kincaid testing to get our clinical language down to a Grade 5 reading level without losing meaning. The work of simplification is infinitely harder than the work of complexity. Any expert can write something confusing. Clarity takes real effort.",
              },
              {
                n: "02",
                title: "A doctor on the team changes everything",
                body: "Having a clinician co-founder meant we had someone who could evaluate our plain-English translations for accuracy. A product that simplifies medical jargon incorrectly is worse than no product at all. Cross-domain teams are a product advantage, not just a cultural one.",
              },
              {
                n: "03",
                title: "The problem space validates the product",
                body: "The investment came before the full product was built because the problem was undeniable and measurable. Learning to lead with the problem — and the clear evidence of its scale — before pitching the solution made the fundraise more about validation than persuasion.",
              },
              {
                n: "04",
                title: "Social impact and commercial value can coexist",
                body: "MyTrials was built to help patients first. But the commercial model — connecting pharma companies to better-matched trial participants — meant the mission and the business model were aligned. The best products solve a real problem for a real person, and that alignment creates durable value for everyone.",
              },
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

      {/* ── FINAL CTA ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
          <div className="border-t border-foreground/10 pt-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-3">
                $200k raised — 10,000+ trials indexed
              </p>
              <h2
                className="text-[28px] sm:text-[36px] leading-[1.2] tracking-[-0.02em] text-foreground max-w-lg"
                style={SERIF}
              >
                See MyTrials in the wild.
              </h2>
            </div>
            <Link
              href="https://mytrials.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[13px] font-medium rounded-[5px] hover:bg-foreground/85 active:scale-[0.97] transition-all tracking-tight shrink-0"
            >
              Visit mytrials.ai <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* ── BOTTOM NAV ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-20 flex items-center justify-between border-t border-foreground/8 pt-8">
          <Link href="/" className="text-[13px] text-foreground/45 hover:text-foreground transition-colors">
            ← All projects
          </Link>
          <Link href="/work/faeth-studio" className="group flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">Next project</span>
            <span className="text-[14px] font-medium text-foreground/60 group-hover:text-foreground transition-colors">Faeth Studio →</span>
          </Link>
        </div>
      </FadeIn>

    </article>
  );
}
