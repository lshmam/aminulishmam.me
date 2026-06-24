"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
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

const processSteps = [
  { step: "01", label: "User Research", desc: "Surveyed 15+ gym-goers. Time, knowledge, and motivation were the top three barriers." },
  { step: "02", label: "Market Research", desc: "Semantic analysis of top App Store fitness apps revealed a consistent gap: form feedback. Apps could show exercises. None could watch you do them." },
  { step: "03", label: "User Flow", desc: "Mapped the full workout journey — from first open to post-workout summary — across 6 core experience pillars." },
  { step: "04", label: "Branding", desc: "The JC mark is an apostrophe — a nod to the conversational coaching experience at the core of the product." },
  { step: "05", label: "Development", desc: "Built the web alpha in Next.js with multimodal AI for real-time voice coaching and pose estimation." },
  { step: "06", label: "Alpha Launch", desc: "Seeded Reddit. 100+ users in the first wave. Data used to iterate toward a full mobile launch." },
];

const skills = [
  { label: "User Research", level: 90 },
  { label: "UI/UX Design", level: 95 },
  { label: "Product Strategy", level: 85 },
  { label: "Frontend Dev", level: 88 },
  { label: "Go-to-Market", level: 75 },
  { label: "Computer Vision", level: 70 },
];

const uiScreens = [
  {
    title: "Onboarding / Conversation Screen",
    caption: "Onboarding via voice — reduces friction for users who don't know where to start.",
    image: "/project-mobile.png"
  },
  {
    title: "Home Dashboard",
    caption: "",
    image: "/project-mobile.png"
  },
  {
    title: "Real-time Workout Screen",
    caption: "Workout screen — minimal UI so the camera view stays front and center.",
    image: "/project-mobile.png"
  },
  {
    title: "Summary / Progress Screen",
    caption: "",
    image: "/project-mobile.png"
  },
  {
    title: "Social Feed",
    caption: "",
    image: "/project-mobile.png"
  }
];

export default function JimCoachPage() {
  const [activeTab, setActiveTab] = useState<'product' | 'ui-ux' | 'engineering'>('product');

  return (
    <>
      <article className="min-h-screen">
        {/* Back */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between gap-6 border-b border-foreground/10 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <Link href="/work/mytrials" className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-colors group">
            MyTrials
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="https://jim.coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                Visit Site → jim.coach <ArrowUpRight size={14} className="ml-1" />
              </Link>
            </div>

            {/* Hero Meta Strip */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-foreground/10">
              {[
                { label: "Role", value: "Product Designer & Developer" },
                { label: "Industry", value: "Health & Fitness" },
                { label: "Year", value: "2025" },
                { label: "Team", value: "4 people" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1 pr-6 sm:pr-12">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-foreground/35 font-medium">{label}</span>
                  <span className="text-[15px] font-medium text-foreground whitespace-pre-line">{value.replace(" & ", "\n& ")}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── TAB SWITCHER (BELOW HERO) ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 mt-4 mb-8">
          <div className="flex w-full overflow-hidden border-b border-foreground/10">
            {(['product', 'ui-ux', 'engineering'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 relative px-6 py-4 text-[13px] tracking-[0.06em] uppercase font-medium transition-colors ${
                  activeTab === tab
                    ? "text-foreground font-bold"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                {tab === 'product' ? 'Product' : tab === 'ui-ux' ? 'UI UX' : 'Engineering'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabJim"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-foreground"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONDITIONAL CONTENT BELOW ── */}
        <div className="min-h-[50vh]">
          {activeTab === 'product' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── PROBLEM SECTION ── */}
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
                <FadeIn>
                  <div className="border border-foreground/5 p-8 sm:p-12">
                    <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-8">
                      The Problem
                    </h2>
                    <div className="space-y-6 max-w-2xl text-[16px] leading-[1.85] text-foreground/60">
                      <p>
                        Most people don't work out because they don't know what to do, can't afford someone who does, and have no way to know if they're doing it right.
                      </p>
                      <p>
                        A gym membership doesn't solve this.<br />
                        A personal trainer costs $80/hr.<br />
                        Existing fitness apps show videos — but can't watch back.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>

              {/* ── PROCESS TIMELINE ── */}
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
                <FadeIn>
                  <div className="border border-foreground/5 p-8 sm:p-12">
                    <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-12">
                      Process
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

              {/* ── SKILLS APPLIED ── */}
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
                <FadeIn>
                  <div className="border border-foreground/5 p-8 sm:p-12">
                    <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                      Skills Applied
                    </h2>
                    <div className="space-y-5 max-w-2xl">
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

              {/* ── CLOSER ── */}
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
                <FadeIn>
                  <div className="border border-foreground/5 p-8 sm:p-12 text-center flex flex-col items-center">
                    <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-6">
                      What's Next
                    </h2>
                    <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-xl mb-8">
                      100+ alpha users confirmed the core hypothesis. The form feedback loop works.<br /><br />
                      Next: native mobile, progress tracking, social accountability, and App Store launch.
                    </p>
                    <Link
                      href="https://jim.coach"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[14px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
                    >
                      See the live alpha → jim.coach <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </motion.div>
          )}

          {activeTab === 'ui-ux' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── UI/UX SECTION ── */}
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
                <FadeIn>
                  <div className="border border-foreground/5 p-8 sm:p-12">
                    <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-6">
                      Designing for the Gym Floor
                    </h2>
                    <p className="text-[16px] leading-[1.85] text-foreground/60 max-w-2xl mb-16">
                      The core UX challenge: design an interface people can use mid-workout — sweaty hands, low attention, high adrenaline.<br /><br />
                      Every screen had to work in under 2 seconds.
                    </p>

                    <div className="flex flex-col gap-24">
                      {uiScreens.map((screen, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-full max-w-md aspect-[9/19] relative rounded-[32px] overflow-hidden border-[8px] border-foreground/10 bg-background shadow-2xl mb-6">
                            <Image
                              src={screen.image}
                              alt={screen.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="text-[18px] font-medium text-foreground mb-3">{screen.title}</h3>
                          {screen.caption && (
                            <p className="text-[14px] leading-[1.6] text-foreground/50 text-center max-w-sm">
                              {screen.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </motion.div>
          )}

          {activeTab === 'engineering' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* ── ENGINEERING SECTION ── */}
              <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
                <FadeIn>
                  <div className="border border-foreground/5 p-8 sm:p-12">
                    <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-6">
                      Built to Watch You Work Out
                    </h2>
                    
                    <div className="mb-10 p-6 bg-foreground/[0.02] border border-foreground/5 rounded-sm inline-block">
                      <p className="text-[11px] uppercase tracking-[0.1em] text-foreground/40 font-medium mb-3">Tech Stack</p>
                      <p className="text-[15px] font-medium text-foreground/80">
                        Next.js · Tailwind CSS · Framer Motion<br />
                        Multimodal AI · Computer Vision / Pose Estimation
                      </p>
                    </div>

                    <div className="space-y-6 max-w-3xl text-[16px] leading-[1.85] text-foreground/60">
                      <p>
                        The hardest engineering problem wasn't the AI — it was latency. Form feedback that arrives 3 seconds late is useless mid-rep.
                      </p>
                      <p>
                        The architecture was built around minimizing feedback loop time while keeping the experience smooth on a phone camera.
                      </p>
                      <p>
                        Alpha shipped as a web app to validate the core loop before investing in native mobile development.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </motion.div>
          )}
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
