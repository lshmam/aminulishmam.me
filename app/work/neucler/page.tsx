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

export default function Neucler2Page() {
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
          href="https://neucler.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-foreground/50 hover:text-foreground transition-colors"
        >
          neucler.com <ArrowUpRight size={13} />
        </Link>
      </div>

      {/* ── HERO ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-7">
            UI / UX Design — 2025
          </p>
          <h1
            className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.04] tracking-[-0.03em] text-foreground mb-8 max-w-4xl"
            style={SERIF}
          >
            Designing Neucler: from a blank canvas to a clinical‑grade SaaS.
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.75] text-foreground/55 max-w-2xl">
            A behind-the-scenes look at how I approached the UI/UX of Neucler —
            a real‑time sales copilot built for med spa receptionists.
            The process involved two pivots, dozens of interviews, and hundreds
            of Figma iterations before a single line of code was written.
          </p>
        </motion.div>
      </div>

      {/* ── HERO IMAGE ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="w-full rounded-2xl overflow-hidden border border-foreground/8 shadow-xl">
            <Image
              src="/neucler-home-1.png"
              alt="Neucler dashboard"
              width={2400}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 1: THE PROBLEM ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            01 — The Problem
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-8 max-w-3xl"
            style={SERIF}
          >
            The front desk is the most revenue-critical role in the clinic — and the most underserved by software.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            <p className="text-[17px] leading-[1.85] text-foreground/58">
              I started by touring local med spas and booking consultations under the pretense of a patient —
              watching receptionists handle calls, juggle DMs, manually log notes, and struggle to upsell in real time.
              The friction was everywhere: scattered tools, no coaching, no visibility into whether a call even went well.
            </p>
            <p className="text-[17px] leading-[1.85] text-foreground/58">
              The core insight from this research: owners weren&apos;t losing leads to bad products —
              they were losing them to a human workflow that had no feedback loop.
              Receptionists couldn&apos;t improve what they couldn&apos;t see.
              That became the north star for the entire design: <em>make the invisible visible, without adding more work.</em>
            </p>
          </div>
        </FadeIn>
      </div>

      {/* ── DISCOVERY PULL QUOTE ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <blockquote
            className="text-[26px] sm:text-[34px] leading-[1.4] tracking-[-0.015em] text-foreground/70 border-l-[3px] border-foreground/20 pl-8 max-w-3xl"
            style={SERIF}
          >
            &ldquo;Every rejection was a data point.
            Every question they asked told me something
            the product needed to answer.&rdquo;
          </blockquote>
        </div>
      </FadeIn>

      {/* ── SECTION 2: DESIGN PRINCIPLES ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            02 — Design Principles
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-8 max-w-3xl"
            style={SERIF}
          >
            Three constraints that shaped every screen.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-foreground/8">
            {[
              {
                num: "I",
                title: "Glanceable at a glance",
                body: "A receptionist can't scan paragraphs mid-call. Every key metric needed to live in a number, a colour, or an icon — not a sentence.",
              },
              {
                num: "II",
                title: "Zero keyboard input",
                body: "The AI listens and extracts. The human confirms. Designing for this required stripping every manual entry field from the primary flow.",
              },
              {
                num: "III",
                title: "Calm under pressure",
                body: "High-contrast typography, generous whitespace, and no unnecessary motion. The interface had to feel like a quiet anchor during a stressful shift.",
              },
            ].map((p) => (
              <div key={p.num} className="py-10 px-0 sm:px-10 first:pl-0 last:pr-0">
                <span className="text-[10px] font-mono text-foreground/25 uppercase tracking-widest block mb-5">
                  {p.num}
                </span>
                <h3 className="text-[19px] font-medium text-foreground leading-snug mb-3">{p.title}</h3>
                <p className="text-[14px] leading-[1.8] text-foreground/55">{p.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* ── SECTION 3: THE DASHBOARD ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            03 — The Daily Dashboard
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Everything a receptionist needs, before they pick up the phone.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            The dashboard greets the receptionist with a live snapshot — calls handled, revenue tracked, conversion rate,
            and a priority queue that surfaces the leads most likely to convert right now.
            No manual report. No morning meeting required.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/neucler-home-1.png"
              alt="Neucler home dashboard"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 4: CALL REVIEW ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            04 — Call Review & Coaching
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Turning every call into structured, actionable feedback.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            I designed the Coaching → Review screen around a single question owners kept asking me:
            &ldquo;How do I know if my receptionist is actually doing a good job?&rdquo;
            The answer: AI scores each call 0–100, captures sentiment, and writes a plain-language summary —
            so managers can spot coaching gaps without listening to every recording.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-5">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/neucler-review-sc1.png"
              alt="Neucler AI call review screen"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl mt-5">
            <Image
              src="/neucler-review-sc2.png"
              alt="Neucler sales playbooks screen"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 5: OMNICHANNEL INBOX ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            05 — Omnichannel Inbox
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Every lead, every channel — in one place, with no context-switching.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            One of the biggest UX problems I uncovered: receptionists were juggling Instagram DMs, Facebook messages,
            WhatsApp, SMS, and phone calls across five separate apps simultaneously.
            The inbox collapsed all of that into one unified view, with AI-generated summaries so the receptionist
            understood every thread before responding.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/neucler-dms.png"
              alt="Neucler unified omnichannel inbox"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 6: AI LAYER ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            06 — Neucler AI
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Ask anything about your business. Get an honest answer.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            The AI layer was the most technically ambitious screen to design.
            The design challenge: make a Gemini-powered business intelligence tool feel simple enough
            that a non-technical clinic owner would actually use it.
            The answer was a plain conversational interface — no dashboards, no filters —
            where you just ask in plain English and get a grounded answer pulled from live data.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/neucler-ai.png"
              alt="Neucler AI business intelligence interface"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 7: BRAND ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            07 — Brand Identity
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            A name and mark that strips complexity, not adds it.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            &ldquo;Neucler&rdquo; is a play on &ldquo;nuclear&rdquo; — concentrated, powerful energy that clarifies rather than complicates.
            The wordmark had to balance authority with approachability.
            The &ldquo;eu&rdquo; suffix deliberately nods toward good UX — clean, purposeful, low-friction —
            exactly what the product aspired to be.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
          <div className="w-full aspect-[16/7] rounded-2xl overflow-hidden border border-foreground/8 bg-black flex items-center justify-center">
            <Image
              src="/Frame 79.png"
              alt="Neucler logo"
              width={260}
              height={260}
              className="object-contain w-[160px] sm:w-[220px]"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 8: WHAT I LEARNED ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-10">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            08 — What the process taught me
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-14 max-w-3xl"
            style={SERIF}
          >
            The best UX decisions came from standing in the clinic, not sitting at the desk.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                n: "01",
                title: "Research in context, not in surveys",
                body: "The most valuable design insights didn't come from questionnaires — they came from watching a receptionist scramble to find a caller's previous appointment history while the person was still on the line. Context is irreplaceable.",
              },
              {
                n: "02",
                title: "Removing features is design too",
                body: "My first dashboard had nine KPI cards. Every iteration removed one or two until only the four that receptionists actually looked at remained. Addition is easy. Subtraction is where the real design work happens.",
              },
              {
                n: "03",
                title: "The emotional load of the user matters",
                body: "Med spa receptionists are often customer-facing, multi-tasking, and emotionally engaged — all at once. Designing for calm under pressure meant rethinking contrast ratios, animation, and even font weight at every screen.",
              },
              {
                n: "04",
                title: "Brand and product should feel the same",
                body: "The visual identity of Neucler and the UI system share the same underlying principle: strip what isn't necessary, amplify what is. When they feel like the same thing, the product is coherent — and trust comes faster.",
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
                The product is live
              </p>
              <h2
                className="text-[28px] sm:text-[36px] leading-[1.2] tracking-[-0.02em] text-foreground max-w-lg"
                style={SERIF}
              >
                See Neucler in the wild.
              </h2>
            </div>
            <Link
              href="https://neucler.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[13px] font-medium rounded-[5px] hover:bg-foreground/85 active:scale-[0.97] transition-all tracking-tight shrink-0"
            >
              Visit neucler.com <ArrowUpRight size={14} />
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
          <Link href="/work/neucler" className="text-[13px] text-foreground/45 hover:text-foreground transition-colors">
            Neucler v1 (full case study) →
          </Link>
        </div>
      </FadeIn>

    </article>
  );
}
