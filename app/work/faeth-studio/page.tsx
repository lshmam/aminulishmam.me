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

export default function FaethStudioPage() {
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
          href="https://faeth.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-foreground/50 hover:text-foreground transition-colors"
        >
          faeth.studio <ArrowUpRight size={13} />
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
            Web Design / UI UX — 2024
          </p>
          <h1
            className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.04] tracking-[-0.03em] text-foreground mb-8 max-w-4xl"
            style={SERIF}
          >
            Design that sells before a single word is read.
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.75] text-foreground/55 max-w-2xl">
            Faeth Studio is a direct-to-founder web design practice. The belief driving every project:
            a great website doesn&apos;t describe your product — it <em>is</em> your product.
            It communicates trust, clarity, and credibility within the first three seconds,
            or it loses the visitor forever.
          </p>

          {/* Meta Strip */}
          <div className="flex flex-wrap gap-x-10 gap-y-5 mt-12 pt-10 border-t border-foreground/8">
            {[
              { label: "My Role", value: "Founder & Design Lead" },
              { label: "Industry", value: "Web Design & UI UX" },
              { label: "Year", value: "2024 — Present" },
              { label: "Team", value: "Solo" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">{label}</span>
                <span className="text-[15px] font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── HERO MEDIA ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden border border-foreground/8 shadow-xl relative bg-black">
            <div className="absolute inset-0 flex items-center justify-center font-mono tracking-[0.4em] uppercase">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <h3 className="text-[28px] sm:text-[40px] md:text-[56px] font-bold text-white text-center">
                  FAETH STUDIO
                </h3>
                <div className="h-[1px] w-16 sm:w-24 bg-white/30" />
                <span className="text-[10px] sm:text-[13px] text-white/50 tracking-[0.2em] text-center">
                  0-TO-1 DESIGN AGENCY
                </span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 1: THE PHILOSOPHY ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            01 — Design Philosophy
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            A website is the first UX your customer ever has with your brand.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            Most early-stage founders treat their website like a business card — something to point at when someone asks for a link.
            I treat it like a product. It has users. It has a job to do. It succeeds or fails at that job every single time
            someone lands on it. The job is always the same: establish credibility, communicate value, and make the next
            action obvious — in that order, in under three seconds.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-brand.png"
              alt="Faeth Studio design philosophy"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── PULL QUOTE ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <blockquote
            className="text-[26px] sm:text-[34px] leading-[1.4] tracking-[-0.015em] text-foreground/70 border-l-[3px] border-foreground/20 pl-8 max-w-3xl"
            style={SERIF}
          >
            &ldquo;The best-designed sites don&apos;t feel designed at all.
            They just feel obvious.&rdquo;
          </blockquote>
        </div>
      </FadeIn>

      {/* ── SECTION 2: THE DESIGN PROCESS ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            02 — The Design Process
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Typography first. Everything else follows.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            Every Faeth project starts with a type system — not a color palette, not a logo, not a layout.
            Typography is the most expressive tool in web design and the most commonly ignored. The font you choose
            is the first thing a visitor feels, even before they consciously register it. Serif says authority.
            Geometric sans says precision. Extended tracking says luxury. I pick typefaces based on what the founder
            needs the visitor to <em>feel</em>, not what looks trendy. From there, a spatial scale, a color system
            built from a single hue, and a component library that never needs to be explained — it just works.
          </p>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-foreground/8">
            {[
              {
                num: "I",
                title: "Type as tone",
                body: "The typeface does 60% of the emotional work before a single word is read. I select and pair fonts before opening a single layout frame.",
              },
              {
                num: "II",
                title: "Space as hierarchy",
                body: "Whitespace isn't empty — it's a signal. Tight spacing = energy. Generous spacing = confidence. I use spatial relationships to direct the eye without a single arrow.",
              },
              {
                num: "III",
                title: "Color as context",
                body: "I start every project with one primary color and derive the full palette from it. Monochromatic systems are harder to get wrong and easier to get right.",
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

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24 pt-14">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-brand.png"
              alt="Faeth Studio type system"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 3: UI UX CRAFT ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            03 — UI / UX Craft
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Micro-interactions are where trust is built or lost.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            The difference between a site that feels premium and one that feels cheap is almost never the visual design —
            it&apos;s the interaction design. How a button responds to hover. Whether a scroll-triggered animation feels
            fluid or mechanical. Whether the mobile navigation opens with snap or lag. I spend as much time on the 100ms
            transitions as I do on the hero layout, because visitors feel those details even when they can&apos;t name them.
            Every Faeth site ships with custom scroll animations, optimized Core Web Vitals, and zero layout shift — because
            perceived performance is part of the design.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-brand.png"
              alt="Faeth Studio interaction design"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 4: CLIENT VOICE ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            04 — Client Voice
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            What founders say when the design actually works.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Aminul is fast responding and professional. I only gave the general ideas and Aminul is able to create my company website in the cleanest and most professional way within 2 days! Highly recommend!",
                name: "乔英凯",
                context: "Company website — delivered in 2 days",
              },
              {
                quote: "Amazing work! They made my personal portfolio page in less than two days and it was phenomenal! Aminul was also very professional and responded quickly to my requests. Highly recommend to anyone making custom portfolios, websites or brand pages.",
                name: "Sayem Nazmuz",
                context: "Personal portfolio — full build in 48 hours",
              },
            ].map((r) => (
              <div key={r.name} className="border border-foreground/8 rounded-2xl p-8 bg-foreground/[0.01]">
                <p
                  className="text-[18px] sm:text-[20px] leading-[1.65] text-foreground/70 mb-8"
                  style={SERIF}
                >
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="border-t border-foreground/8 pt-6 flex items-end justify-between">
                  <div>
                    <p className="text-[14px] font-medium text-foreground">{r.name}</p>
                    <p className="text-[12px] text-foreground/35 mt-0.5 font-mono">{r.context}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-foreground/40 text-[12px]">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

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
            Speed and quality are not a trade-off. They&apos;re the same discipline.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                n: "01",
                title: "The brief is never the full story",
                body: "Founders say 'clean and professional' when they mean 'I want investors to take me seriously.' Learning to hear the real need underneath the brief — and design for that — is what separates a good website from one that actually moves the needle.",
              },
              {
                n: "02",
                title: "Constraints make better design",
                body: "The projects with the tightest timelines produced some of my sharpest work. Unlimited time leads to unlimited options, which leads to decision paralysis. A 48-hour deadline forces you to trust your instincts, kill your darlings, and ship what actually matters.",
              },
              {
                n: "03",
                title: "Mobile-first is not a checkbox",
                body: "Over 65% of visitors on every site I've built arrive on a phone. Designing desktop-first and adapting down to mobile produces sites that work on both but feel native to neither. I now sketch every layout on a 390px canvas before touching a desktop frame.",
              },
              {
                n: "04",
                title: "Performance is a design decision",
                body: "A site that scores 60 on Lighthouse is not a 60% design — it's a failed design. Core Web Vitals directly impact how a site feels to real users. Every font load, every image format, every animation timing decision is a design decision with a performance cost. I track both.",
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
                10+ startups served — 5 stars on Google
              </p>
              <h2
                className="text-[28px] sm:text-[36px] leading-[1.2] tracking-[-0.02em] text-foreground max-w-lg"
                style={SERIF}
              >
                See Faeth Studio in the wild.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="https://faeth.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[13px] font-medium rounded-[5px] hover:bg-foreground/85 active:scale-[0.97] transition-all tracking-tight"
              >
                Visit faeth.studio <ArrowUpRight size={14} />
              </Link>
              <Link
                href="https://share.google/33RMwEtz7IXJYXFjv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-foreground/20 text-foreground hover:bg-foreground/5 text-[13px] font-medium rounded-[5px] active:scale-[0.97] transition-all tracking-tight"
              >
                See Reviews <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* ── BOTTOM NAV ── */}
      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-20 flex items-center justify-between border-t border-foreground/8 pt-8">
          <Link href="/" className="text-[13px] text-foreground/45 hover:text-foreground transition-colors">
            ← All projects
          </Link>
          <Link href="/work/neucler" className="group flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">Back to first</span>
            <span className="text-[14px] font-medium text-foreground/60 group-hover:text-foreground transition-colors">Neucler →</span>
          </Link>
        </div>
      </FadeIn>

    </article>
  );
}
