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

export default function JimCoachPage() {
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
          href="https://jim.coach"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-foreground/50 hover:text-foreground transition-colors"
        >
          jim.coach <ArrowUpRight size={13} />
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
            Mobile App / Health &amp; Fitness — 2025
          </p>
          <h1
            className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.04] tracking-[-0.03em] text-foreground mb-8 max-w-4xl"
            style={SERIF}
          >
            An AI personal trainer in your pocket — form checked, reps counted, no gym required.
          </h1>
          <p className="text-[18px] sm:text-[20px] leading-[1.75] text-foreground/55 max-w-2xl">
            Jim Coach is a mobile AI fitness assistant born from a personal mission to lower the barriers to entry
            for strength training. By combining computer vision with real-time coaching, it solves the friction
            of knowledge, motivation, and accountability — all at once.
          </p>

          {/* Meta Strip */}
          <div className="flex flex-wrap gap-x-10 gap-y-5 mt-12 pt-10 border-t border-foreground/8">
            {[
              { label: "My Role", value: "Product Designer & Dev" },
              { label: "Industry", value: "Health & Fitness" },
              { label: "Stage", value: "2025" },
              { label: "Team", value: "4 people" },
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
              src="/project-mobile.png"
              alt="Jim Coach app"
              width={2400}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 1: USER RESEARCH ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            01 — User Research
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            What barriers do people face to go and work out?
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            I conducted a survey of 15+ gym-goers to understand the friction points. The findings were clear:
            Time, Exercise Knowledge, Motivation, and Cost were the killers. To make the process seamless, the
            solution had to be accessible, educational, and quick. A well-designed app was the only way to solve
            all of these at once.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-mobile.png"
              alt="Jim Coach user research"
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
            &ldquo;Bad form doesn&apos;t just slow your gains — it ends your training.
            We built the coach that catches it before it costs you.&rdquo;
          </blockquote>
        </div>
      </FadeIn>

      {/* ── SECTION 2: MARKET RESEARCH ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            02 — Market Research
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Identifying the &apos;Form Gap&apos; in the App Store.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            I analyzed top fitness apps and user reviews. While users valued custom plans and progress tracking,
            they were frustrated by high costs and a major gap: zero apps ensured correct form. This presented
            a clear opportunity — integrating live audio-visual form correction using computer vision and
            multimodal AI. No app could watch you back.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-mobile.png"
              alt="Jim Coach market research"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 3: DESIGN ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            03 — Design
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Designing a &apos;Stern but Friendly&apos; Coach.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            I chose a sporty, stern font to invoke a &lsquo;coach&rsquo; feeling — he&apos;s your friend but he&apos;ll push you.
            The JC logo resembles an apostrophe, depicting the conversational aspect of the app.
            The UI was optimized for &lsquo;sweaty hands&rsquo; and quick glances during intense sets.
            Every screen had to work in under 2 seconds.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-mobile.png"
              alt="Jim Coach UI design"
              width={2400}
              height={1400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </FadeIn>

      {/* ── SECTION 4: DEVELOPMENT ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-8">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/35 font-medium mb-4">
            04 — Development &amp; Launch
          </p>
          <h2
            className="text-[32px] sm:text-[44px] leading-[1.15] tracking-[-0.02em] text-foreground mb-6 max-w-3xl"
            style={SERIF}
          >
            Distribution is the final boss.
          </h2>
          <p className="text-[17px] leading-[1.85] text-foreground/55 max-w-2xl mb-14">
            I developed a web platform to test the core vision using Next.js and Framer Motion — a highly responsive
            experience that felt native. We launched an Alpha on Reddit, getting 100+ users who provided the critical
            usage data needed to iterate. Early validation was strong, but the real lesson was efficiency of distribution:
            instead of fighting for every user, we partnered with personal trainers who already had clients. I even
            got a job as a personal trainer myself to understand this properly.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
          <div className="rounded-2xl overflow-hidden border border-foreground/8 shadow-2xl">
            <Image
              src="/project-mobile.png"
              alt="Jim Coach alpha launch"
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
            The best UX decisions came from standing in the gym, not sitting at the desk.
          </h2>
        </FadeIn>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 pb-28">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                n: "01",
                title: "Validate the core loop first",
                body: "Shipping a web alpha before building a native app let us validate the most important assumption — that real-time form feedback is useful in practice — without over-investing. 100+ Reddit users confirmed the loop. The form feedback worked. That signal was worth more than any prototype test.",
              },
              {
                n: "02",
                title: "Design for the emotional state of the user",
                body: "A person mid-workout is sweaty, focused, and doesn't want to read. Every screen in Jim Coach had to be scannable in under 2 seconds. This forced a design discipline of radical reduction — if an element didn't help within one glance, it got cut.",
              },
              {
                n: "03",
                title: "Distribution is built, not found",
                body: "Seeding Reddit worked as a proof of concept, but the real insight was that trainers are nodes of distribution. A single personal trainer brings 20 existing clients. Getting the product into that hands of trainers first — not users — was the more efficient growth path.",
              },
              {
                n: "04",
                title: "Research in context, not in surveys",
                body: "Working as a personal trainer myself gave me a completely different understanding of what clients actually needed versus what they said they needed. Real context research — being in the gym, watching, feeling — is irreplaceable.",
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
                The alpha is live
              </p>
              <h2
                className="text-[28px] sm:text-[36px] leading-[1.2] tracking-[-0.02em] text-foreground max-w-lg"
                style={SERIF}
              >
                See Jim Coach in the wild.
              </h2>
            </div>
            <Link
              href="https://jim.coach"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[13px] font-medium rounded-[5px] hover:bg-foreground/85 active:scale-[0.97] transition-all tracking-tight shrink-0"
            >
              Visit jim.coach <ArrowUpRight size={14} />
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
          <Link href="/work/mytrials" className="group flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.14em] text-foreground/30 font-medium">Next project</span>
            <span className="text-[14px] font-medium text-foreground/60 group-hover:text-foreground transition-colors">MyTrials →</span>
          </Link>
        </div>
      </FadeIn>

    </article>
  );
}
