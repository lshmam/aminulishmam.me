"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
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

const dashboardScreens = [
  { src: "/neucler-home-1.png", caption: "The Daily Dashboard — calls handled, revenue tracked, and a priority queue that surfaces leads most likely to convert right now." },
  { src: "/neucler-review-sc1.png", caption: "AI Call Scoring — every call gets a 0–100 score, sentiment analysis, and a plain-language summary. No more listening to every recording." },
  { src: "/neucler-review-sc2.png", caption: "Sales Playbooks — AI-generated objection scripts, upsell sequences, and real-time coaching suggestions surfaced mid-call." },
  { src: "/neucler-dms.png", caption: "Omnichannel Inbox — Instagram DMs, Facebook messages, WhatsApp, SMS, and phone calls collapsed into one unified view." },
  { src: "/neucler-ai.png", caption: "Neucler AI — ask anything about your business in plain English and get a grounded answer pulled from live data." },
];

function DashboardCarousel() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
      <FadeIn>
        {/* Main Image */}
        <div className="relative rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={dashboardScreens[active].src}
              alt={dashboardScreens[active].caption}
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Arrow buttons */}
          <button
            onClick={() => setActive((p) => Math.max(p - 1, 0))}
            disabled={active === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors disabled:opacity-20"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setActive((p) => Math.min(p + 1, dashboardScreens.length - 1))}
            disabled={active === dashboardScreens.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-foreground/10 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors disabled:opacity-20"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Caption */}
        <p className="text-[14px] leading-[1.75] text-foreground/45 mt-5 max-w-2xl">
          {dashboardScreens[active].caption}
        </p>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-5">
          {dashboardScreens.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all ${i === active ? "w-8 bg-foreground/60" : "w-2 bg-foreground/15"}`}
            />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}

export default function NeuclerPage() {
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
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-20 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-7">
            Product Design / AI SaaS — 2025
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

          {/* Meta Strip */}
          <div className="flex flex-wrap gap-x-10 gap-y-5 mt-12 pt-10 border-t border-foreground/8">
            {[
              { label: "My Role", value: "Founder" },
              { label: "Industry", value: "Health Tech / AI SaaS" },
              { label: "Year", value: "2025 — Present" },
              { label: "Team", value: "1 person" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">{label}</span>
                <span className="text-[15px] font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── LOGO IMAGE (first thing) ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="w-full aspect-[16/7] rounded-2xl overflow-hidden border border-foreground/8 bg-black flex items-center justify-center shadow-xl">
            <Image
              src="/Frame 79.png"
              alt="Neucler logo"
              width={260}
              height={260}
              className="object-contain w-[160px] sm:w-[220px]"
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
              I started by going undercover. I booked consultations at local med spas, sat in waiting rooms,
              and watched receptionists handle calls while juggling DMs, manually logging notes, and trying to
              upsell services they barely had time to mention. The friction was everywhere: scattered tools,
              no coaching in the moment, no visibility into whether a call even went well.
            </p>
            <p className="text-[17px] leading-[1.85] text-foreground/58">
              The core insight: owners weren&apos;t losing leads to bad products —
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

      {/* ── SECTION 2: DESIGN RESEARCH ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            02 — Design Research
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            I talked to 7 receptionists. I let them lead.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            I recruited 7 active receptionists from med spas across the city for structured interviews.
            Not surveys — real conversations. I asked them to walk me through a typical Tuesday: what they opened
            first, what slowed them down, what made a call go sideways. Three pain points came up in every single
            interview without exception. <strong className="text-foreground/75 font-medium">No system to track who called and what happened.</strong>{" "}
            <strong className="text-foreground/75 font-medium">No script for upsells mid-call.</strong>{" "}
            <strong className="text-foreground/75 font-medium">No way for managers to know who was performing and who wasn&apos;t.</strong>{" "}
            I sketched the core workflow on paper — the receptionist&apos;s journey from the moment a call comes in
            to the moment it&apos;s resolved. That sketch became the skeleton for every screen that followed.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl aspect-[4/3] sm:aspect-video relative bg-zinc-100 flex items-center justify-center">
            <Image
              src="/neucler-sketch.jpeg"
              alt="Hand-drawn wireframe sketches of the Neucler receptionist workflow"
              fill
              style={{ objectFit: 'contain', transform: 'rotate(-90deg) scale(1.7)' }}
            />
          </div>
          <p className="text-[13px] text-foreground/35 mt-4 font-mono">
            The first sketch. Left page: the daily dashboard layout. Right page: the receptionist workflow for an incoming call.
          </p>
        </div>
      </FadeIn>

      {/* ── SECTION 3: FIGMA DESIGN ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            03 — Figma Design
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Three constraints shaped every screen.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            Before touching Figma, I set three non-negotiable design constraints — rules that every screen had to satisfy
            before it could be considered finished. These weren&apos;t aesthetic choices. They were functional requirements
            derived directly from what receptionists told me they needed.
          </p>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-foreground/8">
            {[
              {
                num: "I",
                title: "Understandable at a glance",
                body: "A receptionist can't scan paragraphs mid-call. Every key metric needed to live in a number, a colour, or an icon — not a sentence.",
              },
              {
                num: "II",
                title: "Zero keyboard input",
                body: "The AI listens and extracts. The human confirms. Designing for this required stripping every manual entry field from the primary flow.",
              },
              {
                num: "III",
                title: "Quiet by design",
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

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-16">
        <FadeIn>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14 pt-8 border-t border-foreground/8">
            In Figma, the focus shifted entirely to the web design and the underlying UI/UX of the platform. We needed a layout that would feel native to the web but perform with the speed and reliability of a desktop app. By carefully structuring the navigational hierarchy and interaction patterns, I was able to build out the full user experience directly in Figma. This wasn&apos;t just about creating a visually appealing interface — it was about wireframing the exact logic and flow the receptionists would follow on a daily basis. Every click, hover, and state change was mapped out to ensure the final product would be completely frictionless.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/neucler-figma.png"
              alt="Neucler Figma web design and UI/UX flows"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
          <p className="text-[13px] text-foreground/35 mt-4 font-mono">
            The final Figma design — mapping out the complete UI/UX flow and web design structure.
          </p>
        </div>
      </FadeIn>

      {/* ── SECTION 4: DEVELOPMENT ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            04 — Development
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            From static design to a living product.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            I built the frontend in Next.js with TypeScript — deliberately choosing a stack where I could own every
            pixel without introducing framework abstraction. The real engineering challenge wasn&apos;t the UI, it was
            the <em>latency</em>. AI coaching that arrives 3 seconds after a relevant moment in a call is useless.
            I worked closely with the backend to ensure every AI suggestion rendered within 400ms of the trigger event.
            Below is the full suite of screens shipped in V1.
          </p>
        </FadeIn>
      </div>

      {/* CAROUSEL */}
      <DashboardCarousel />

      {/* ── SECTION 5: TESTING & ITERATION ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            05 — Testing &amp; Iteration
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            I gave the product to the same 7 receptionists. Then I watched.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            The same 7 receptionists from the research phase became our first test users. I set up Hotjar heatmaps
            across every screen, Clarity session recordings for full session replay, and ran bi-weekly 1:1 walkthroughs
            where I watched them use the product in real time — never prompting, never suggesting. Just watching.
            What I saw changed significant parts of the interface. The data didn&apos;t lie.
          </p>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                finding: "01 — Heatmaps",
                title: "Nobody was clicking the sidebar",
                body: "Heatmaps showed that 80% of all interaction was happening in a 300px strip down the center of the screen. The sidebar navigation — which I&apos;d spent two weeks designing — was invisible to receptionists mid-call. I collapsed it into a single icon that expanded on hover. Engagement with secondary features jumped 40%.",
              },
              {
                finding: "02 — Session Recordings",
                title: "The AI coaching bubble was in the wrong place",
                body: "Session recordings showed users&apos; eyes tracking to the top-right corner of the screen when a call started — exactly where system notifications appear on most computers. I moved the AI coaching bubble from the bottom-center to the top-right. Time to first interaction with a coaching suggestion dropped from 4.2s to 1.1s.",
              },
              {
                finding: "03 — 1:1 Walkthroughs",
                title: "The vocabulary was wrong",
                body: "Three receptionists asked me what &ldquo;conversion event&rdquo; meant. I&apos;d designed the dashboard around product manager terminology, not receptionist terminology. I replaced &ldquo;conversion event&rdquo; with &ldquo;booked appointment,&rdquo; &ldquo;lead score&rdquo; with &ldquo;how warm is this lead,&rdquo; and &ldquo;churn signal&rdquo; with &ldquo;might not come back.&rdquo; Comprehension testing improved 60%.",
              },
              {
                finding: "04 — Follow-up Interviews",
                title: "One feature nobody asked for became the most used",
                body: "The call summary auto-email — which I&apos;d added as a last-minute feature in week 8 — became the most-discussed feature in the follow-up interviews. Managers were forwarding the summaries to their phones every night. I hadn&apos;t predicted this use case at all. It reminded me: build the core well, and users will find the unexpected value.",
              },
            ].map((item) => (
              <div key={item.finding} className="border-t border-foreground/8 pt-8">
                <span className="text-[10px] font-mono text-foreground/25 uppercase tracking-widest block mb-3">{item.finding}</span>
                <h3 className="text-[19px] font-medium text-foreground mb-3 leading-snug">{item.title}</h3>
                <p className="text-[15px] leading-[1.85] text-foreground/55">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/neucler-review-sc2.png"
              alt="Neucler post-iteration interface"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
          <p className="text-[13px] text-foreground/35 mt-4 font-mono">
            V2 of the coaching screen — sidebar collapsed, AI bubble repositioned, vocabulary simplified.
          </p>
        </div>
      </FadeIn>

      {/* ── SECTION 6: WHAT I LEARNED ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-10">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            06 — What the process taught me
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
          <Link href="/work/neta-bridge" className="group flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">Next project</span>
            <span className="text-[14px] font-medium text-foreground/60 group-hover:text-foreground transition-colors">Neta Bridge →</span>
          </Link>
        </div>
      </FadeIn>

    </article>
  );
}
