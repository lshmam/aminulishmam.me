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

export default function NetaBridgePage() {
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
          href="https://netabridge.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-foreground/50 hover:text-foreground transition-colors"
        >
          netabridge.com <ArrowUpRight size={13} />
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
            B2B Trade / Network Intelligence — 2026
          </p>
          <h1
            className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.04] tracking-[-0.03em] text-foreground mb-8 max-w-4xl"
            style={SERIF}
          >
            Turning a broker&apos;s 1,000+ contacts into an intelligent deal pipeline.
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.75] text-foreground/55 max-w-2xl">
            Brokers and traders in global commerce have always known the problem: thousands of contacts,
            dozens of live deals, and no efficient way to connect the right person to the right opportunity.
            Neta Bridge is built to solve that — starting with contact ingestion and deal tracking.
          </p>

          {/* Meta Strip */}
          <div className="flex flex-wrap gap-x-10 gap-y-5 mt-12 pt-10 border-t border-foreground/8">
            {[
              { label: "My Role", value: "Designer & Frontend Dev" },
              { label: "Industry", value: "B2B Trade & Commerce" },
              { label: "Stage", value: "2026 — Present" },
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
              src="/project-brand.png"
              alt="Neta Bridge platform"
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
            A broker with 7,000 contacts and no way to search them.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            Our co-founder had spent years in international trade. He&apos;d spoken to enough brokers to know their
            shared frustration: thousands of WhatsApp contacts, hundreds of active deals, and no system to surface
            &ldquo;who do I know that can supply X, right now?&rdquo; The problem wasn&apos;t the quantity of relationships.
            Brokers are deeply networked. The problem was that their network was locked in unstructured devices —
            phones, spreadsheets, memory — with no searchable, trackable layer on top.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-brand.png"
              alt="Neta Bridge contact pipeline"
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
            &ldquo;The answer: a contact ingestion pipeline paired with a deal-tracking interface.
            Not a marketplace to meet strangers — a system to unlock the value of relationships they already have.&rdquo;
          </blockquote>
        </div>
      </FadeIn>

      {/* ── SECTION 2: THE PRODUCT ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            02 — The Product
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Contact ingestion. Deal tracking. Network intelligence.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            The MVP is a two-part system: ingest a broker&apos;s contacts automatically — no manual entry —
            and overlay a deal-tracking pipeline on top. Phase two makes that network intelligent — searchable,
            filterable, connectable. Like LinkedIn&apos;s 2004 address book import, the product had to be valuable
            to one person with zero other users on the platform.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-brand.png"
              alt="Neta Bridge deal tracking"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 3: HOW WE BUILT IT ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            03 — Build Process
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            From broker interviews to live MVP.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            The first thing we built was a way for users to import their existing contacts — not manually, automatically.
            Then came a Kanban-style deal tracker where brokers can track active deals, assign contacts to opportunities,
            and see the status of every trade at a glance. CRM meets trade ops. The MVP is live and we are in active
            customer acquisition mode, turning early user feedback into product priorities.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-brand.png"
              alt="Neta Bridge MVP"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 4: COMPETITIVE LANDSCAPE ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            04 — Competitive Research
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            The network layer always precedes the marketplace.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            Our co-founder studied four defining companies — LinkedIn, Affinity, Faire, and Alibaba — to understand
            the order of operations. The pattern was clear: the one approach that has never worked at any scale is
            launching a generic, empty marketplace for &ldquo;anyone who wants to trade.&rdquo; We are building the
            network tool first. Contact ingestion → deal tracking → network intelligence. The marketplace layer
            grows naturally from a foundation of real users with real data — exactly like LinkedIn, exactly like Affinity.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-brand.png"
              alt="Neta Bridge competitive landscape"
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
            The best products solve an existing behavior, not a hypothetical one.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                n: "01",
                title: "Network before marketplace",
                body: "Studying LinkedIn, Affinity, Faire, and Alibaba taught me that the playbook is always the same: build real network value for one person first, then let the marketplace emerge organically from that density. Launching empty marketplaces has never worked at any scale.",
              },
              {
                n: "02",
                title: "Single-user value is the foundation",
                body: "The most important design constraint was: is this product valuable to a broker with zero other users? If the answer was yes, we were building the right thing. This forced us to prioritize the contact ingestion pipeline over any social or marketplace features.",
              },
              {
                n: "03",
                title: "The pain is in the workflow, not the vision",
                body: "Early conversations kept surfacing the same problem: not the lack of contacts, but the inability to search and act on them. Solving an existing, painful workflow — rather than imagining a new one — gave us a much clearer product direction from day one.",
              },
              {
                n: "04",
                title: "My role as designer and frontend developer",
                body: "On Neta Bridge I owned the frontend development and UI/UX design, working alongside a backend engineer and business co-founder. This dual role meant every design decision was grounded in what was actually buildable and maintainable at our current stage.",
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
                See Neta Bridge in the wild.
              </h2>
            </div>
            <Link
              href="https://netabridge.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[13px] font-medium rounded-[5px] hover:bg-foreground/85 active:scale-[0.97] transition-all tracking-tight shrink-0"
            >
              Visit netabridge.com <ArrowUpRight size={14} />
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
          <Link href="/work/jim-coach" className="group flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">Next project</span>
            <span className="text-[14px] font-medium text-foreground/60 group-hover:text-foreground transition-colors">Jim Coach →</span>
          </Link>
        </div>
      </FadeIn>

    </article>
  );
}
