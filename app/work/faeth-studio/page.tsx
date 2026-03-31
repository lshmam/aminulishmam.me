"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Star } from "lucide-react";
import BottomDock from "@/components/BottomDock";

const reviews = [
  {
    name: "乔英凯",
    stars: 5,
    timeAgo: "11 weeks ago",
    body: "Aminul is fast responding and professional. I only gave the general ideas and Aminul is able to create my company website in the cleanest and most professional way within 2 days! Highly recommend! Thank you again Aminul!",
  },
  {
    name: "Sayem Nazmuz",
    stars: 5,
    timeAgo: "24 weeks ago",
    body: "Amazing work! They made my personal portfolio page in less than two days and it was phenomenal! Aminul was also very professional and responded quickly to my requests. Highly recommend to anyone making custom portfolios, websites or brand pages.",
  },
];

const processSteps = [
  { step: "01", label: "Outreach", desc: "Identifying the right clients and initiating contact with precision." },
  { step: "02", label: "Sales", desc: "Understanding the founder's vision, scope, and goals in detail." },
  { step: "03", label: "Discuss", desc: "Deep-diving into brand, audience, and technical requirements." },
  { step: "04", label: "Develop", desc: "Building the product with speed, craft, and clarity of intent." },
  { step: "05", label: "Reiterate", desc: "Rapid feedback loops until every detail is exactly right." },
  { step: "06", label: "Handoff", desc: "Clean delivery with documentation, access, and ownership transferred." },
];

export default function FaethStudioPage() {
  return (
    <>
      <article className="min-h-screen">

        {/* Back Button */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium text-foreground/50 hover:text-foreground transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Hero */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pt-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {["Agency", "Design", "Products"].map((tag) => (
                <span key={tag} className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] leading-[1.1]">
              <span className="text-foreground/50">Faeth Studio.</span>{" "}
              <span className="text-foreground">A website by itself is a self-contained product.</span>
            </h1>
            <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.8] text-foreground/60 max-w-2xl">
              Faeth Studio is a direct-to-founder design agency. We don&apos;t just make things look good — we build
              digital tools that sell, communicate, and grow your business from day one.
            </p>

            {/* CTA Links */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="https://faeth.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background text-[13px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                faeth.studio <ArrowUpRight size={14} />
              </Link>
              <Link
                href="https://share.google/33RMwEtz7IXJYXFjv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-foreground/20 text-foreground text-[13px] font-medium rounded-[4px] hover:bg-foreground/5 transition-all active:scale-[0.98] tracking-tight"
              >
                See Reviews <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Hero Meta Strip */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-foreground/10">
              {[
                { label: "My Role", value: "Founder & Design Lead" },
                { label: "Industry", value: "Design Agency" },
                { label: "Stage", value: "Active — 2024–Present" },
                { label: "Team Size", value: "1 person" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-foreground/35 font-medium">{label}</span>
                  <span className="text-[15px] font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="h-px bg-foreground/5 w-full" />
        </div>

        {/* Process Steps */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-12">
              The Process
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-background p-8"
              >
                <p className="text-[11px] font-mono text-foreground/30 mb-4">{s.step}</p>
                <h3 className="text-[20px] font-medium tracking-tight text-foreground mb-3">{s.label}</h3>
                <p className="text-[14px] leading-[1.7] text-foreground/55">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="h-px bg-foreground/5 w-full" />
        </div>

        {/* PM Analogy Section */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-6">
              Agency Work as Product Management
            </p>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] text-foreground mb-6">
              Running an agency is just product management with a different name.
            </h2>
            <p className="text-[16px] leading-[1.8] text-foreground/60">
              Every engagement at Faeth Studio mirrors the end-to-end ownership a product manager exercises over a full product lifecycle — from identifying the right customer to shipping, iterating, and handing off. A website <em>is</em> a product. The client <em>is</em> the user. The problem space is the market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5 border border-foreground/5">
            {[
              {
                agencyPhase: "Finding Customers",
                pmEquivalent: "Customer Discovery",
                agencyDesc: "Identifying founders who need design help — cold outreach, referrals, social proof. Knowing which segment to target and why.",
                pmDesc: "A PM identifies the right user segment, validates their pain, and builds a pipeline of feedback before writing a single spec.",
              },
              {
                agencyPhase: "Sales & Negotiation",
                pmEquivalent: "Stakeholder Alignment & Scoping",
                agencyDesc: "Pitching design value, pricing the scope, managing objections, and closing without over-promising.",
                pmDesc: "A PM aligns executives, engineering, and design on what to build, negotiates trade-offs, and defines the MVP scope before committing resources.",
              },
              {
                agencyPhase: "Understanding Requirements",
                pmEquivalent: "User Research & PRD",
                agencyDesc: "Deep discovery: understanding the brand, audience, competitors, and what success looks like for the client.",
                pmDesc: "A PM runs user interviews, defines personas, maps jobs-to-be-done, and writes a PRD to anchor the team.",
              },
              {
                agencyPhase: "Develop",
                pmEquivalent: "Sprint Execution",
                agencyDesc: "Designing, building, and shipping with speed and craft — making decisions and unblocking progress daily.",
                pmDesc: "A PM works alongside engineers in sprints, writes tickets, unblocks blockers, and keeps the team shipping toward a clear goal.",
              },
              {
                agencyPhase: "Feedback & Reiterate",
                pmEquivalent: "Iteration Cycles",
                agencyDesc: "Presenting work, collecting structured feedback, revising rapidly, and repeating until the client signs off.",
                pmDesc: "A PM runs usability tests, interprets signals, prioritizes fixes, and ships incremental improvements on a tight loop.",
              },
              {
                agencyPhase: "Constant Communication",
                pmEquivalent: "Stakeholder Management",
                agencyDesc: "Proactive updates at every stage. No client should ever wonder what's happening — trust is built through transparency.",
                pmDesc: "A PM sends weekly syncs and executive readouts that keep leadership informed and aligned without slowing the team.",
              },
              {
                agencyPhase: "Handoff",
                pmEquivalent: "Launch & Knowledge Transfer",
                agencyDesc: "Clean delivery of all assets, credentials, and documentation. The client owns the product fully and can operate it independently.",
                pmDesc: "A PM coordinates a launch checklist, writes runbooks, and transfers institutional knowledge so the org can maintain what was built.",
              },
              {
                agencyPhase: "Self-Contained Product",
                pmEquivalent: "End-to-End Ownership",
                agencyDesc: "Every website is a complete business asset — it handles outreach, sales, trust-building, and conversion on its own, 24/7.",
                pmDesc: "A great PM treats every feature as a mini-product with its own user, outcome, and metric. Ownership never ends at ship.",
              },
            ].map((row, i) => (
              <motion.div
                key={row.agencyPhase}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="bg-background p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-5">
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 font-medium mb-1">Agency</p>
                    <p className="text-[16px] font-semibold text-foreground tracking-tight">{row.agencyPhase}</p>
                  </div>
                  <div className="hidden sm:block w-px self-stretch bg-foreground/8" />
                  <div className="flex-1">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-foreground/30 font-medium mb-1">PM Equivalent</p>
                    <p className="text-[16px] font-semibold text-foreground/60 tracking-tight">{row.pmEquivalent}</p>
                  </div>
                </div>
                <div className="h-px bg-foreground/5 mb-5" />
                <div className="flex flex-col sm:flex-row gap-5">
                  <p className="flex-1 text-[13px] leading-[1.7] text-foreground/55">{row.agencyDesc}</p>
                  <p className="flex-1 text-[13px] leading-[1.7] text-foreground/35 italic">{row.pmDesc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="h-px bg-foreground/5 w-full" />
        </div>

        {/* Reviews */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-12">
              Client Reviews — Google Business Profile
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-foreground/8 rounded-[4px] p-8 bg-foreground/[0.02]"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, si) => (
                    <Star key={si} size={14} className="fill-foreground/40 text-foreground/40" />
                  ))}
                </div>
                <p className="text-[15px] leading-[1.8] text-foreground/70 mb-6 italic">
                  &ldquo;{r.body}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-foreground">{r.name}</p>
                  <p className="text-[12px] text-foreground/35">{r.timeAgo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center pt-20 border-t border-foreground/5"
          >
            <p className="text-[32px] sm:text-[42px] font-normal leading-[1.25] tracking-[-0.02em] text-foreground italic">
              &ldquo;Consistent communication, rapid iteration, and a clean handoff — every time.&rdquo;
            </p>
            <div className="mt-12 flex justify-center gap-4 flex-wrap">
              <Link
                href="https://faeth.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-[14px] font-medium rounded-[4px] hover:bg-foreground/90 transition-all active:scale-[0.98] tracking-tight"
              >
                Visit faeth.studio <ArrowUpRight size={16} />
              </Link>
              <Link
                href="https://share.google/33RMwEtz7IXJYXFjv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-foreground/20 text-foreground text-[14px] font-medium rounded-[4px] hover:bg-foreground/5 transition-all active:scale-[0.98] tracking-tight"
              >
                See Reviews <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer Nav */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between pt-8 border-t border-foreground/10 pb-24">
            <Link href="/" className="text-[13px] text-foreground/50 hover:text-foreground transition-colors">
              ← All Projects
            </Link>
            <p className="text-[12px] tracking-[0.08em] uppercase text-foreground/30 font-medium">
              Faeth Studio
            </p>
          </div>
        </div>

      </article>
      <BottomDock />
    </>
  );
}
