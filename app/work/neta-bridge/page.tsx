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
  { value: "MVP", label: "Stage", sub: "Live & acquiring customers" },
  { value: "5", label: "Team Size", sub: "Engineering + Business" },
  { value: "1000s", label: "Contacts", sub: "Per broker, untracked" },
  { value: "2026", label: "Active Since", sub: "Ongoing development" },
];

const techStack = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma ORM", category: "Database" },
  { name: "Figma", category: "Design" },
  { name: "TypeScript", category: "Language" },
  { name: "TailwindCSS", category: "Styling" },
];

const categoryColors: Record<string, string> = {
  Framework: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Backend: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Database: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Design: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Language: "bg-foreground/5 border-foreground/10 text-foreground/70",
  Styling: "bg-foreground/5 border-foreground/10 text-foreground/70",
};

const skills = [
  { label: "Frontend Development", icon: "⌨" },
  { label: "UI/UX Design", icon: "◈" },
  { label: "B2B Product Thinking", icon: "⬡" },
  { label: "System Architecture", icon: "⊞" },
  { label: "Pipeline Design", icon: "⇌" },
  { label: "User Research", icon: "↗" },
];

const buildProcess = [
  {
    step: "01",
    label: "Problem Discovery",
    desc: "Our co-founder spoke to dozens of brokers and traders. One recurring pain point emerged: they had thousands of contacts and hundreds of active deals — all living in WhatsApp threads and spreadsheets with no way to surface the right person at the right time.",
  },
  {
    step: "02",
    label: "Contact Ingestion Pipeline",
    desc: "The first thing we built was a way for users to import their existing contacts. Not manually — automatically. Like LinkedIn's 2004 address book import, we knew the product had to be valuable to ONE person with zero other users on the platform.",
  },
  {
    step: "03",
    label: "Deal Tracking Interface",
    desc: "We designed a pipeline view where brokers can track their active deals, assign contacts to opportunities, and see the status of every trade at a glance. CRM meets trade ops.",
  },
  {
    step: "04",
    label: "MVP Launch",
    desc: "The MVP is live. We are in active customer acquisition mode, turning early user feedback into product priorities. The network intelligence layer comes next.",
  },
];

const competitors = [
  {
    name: "LinkedIn",
    founded: "2003",
    lesson: "Launched with profiles only. No marketplace for 2 years. The marketplace worked because millions of real profiles existed first.",
    tag: "Network First",
  },
  {
    name: "Affinity CRM",
    founded: "2014",
    lesson: "Proved that 'search your own network' is a massive standalone business worth $120M+ raised — with no public marketplace, ever.",
    tag: "Network Only",
  },
  {
    name: "Faire",
    founded: "2017",
    lesson: "Started impossibly narrow (indie retailers + artisan brands) and seeded the marketplace with existing relationships, not strangers.",
    tag: "Marketplace First",
  },
  {
    name: "Alibaba",
    founded: "1999",
    lesson: "Manually recruited suppliers for years before the marketplace worked. An empty marketplace for 'everyone' has never worked at any scale.",
    tag: "Manual Seed",
  },
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
              {["B2B Trade", "Network Intelligence", "CRM", "Frontend Dev"].map((tag) => (
                <span key={tag} className="text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full border border-foreground/15 text-foreground/50 font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] font-normal tracking-[-0.02em] leading-[1.1]">
              <span className="text-foreground/50">Neta Bridge.</span>{" "}
              <span className="text-foreground">Turning a broker&apos;s 1,000+ contacts into an intelligent deal pipeline.</span>
            </h1>

            <p className="mt-6 text-[16px] sm:text-[18px] leading-[1.8] text-foreground/60 max-w-2xl">
              Brokers and traders in global commerce have always known the problem:
              thousands of contacts, dozens of live deals, and no efficient way to connect the right person
              to the right opportunity. Neta Bridge is being built to solve that — starting with contact ingestion and deal tracking.
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
                { label: "Industry", value: "B2B Trade & Commerce" },
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

        {/* ── 01: THE ORIGIN ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">01 — The Origin</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                A broker with 7,000 contacts and no way to search them
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
                <div className="space-y-5">
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    Our co-founder had spent years in international trade. He&apos;d spoken to enough brokers
                    to know their shared frustration: thousands of WhatsApp contacts, hundreds of active
                    deals, and no system to surface &ldquo;who do I know that can supply X, right now?&rdquo;
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    The problem wasn&apos;t the quantity of relationships. Brokers are deeply networked.
                    The problem was that their network was locked in unstructured devices — phones,
                    spreadsheets, memory — with no searchable, trackable layer on top.
                  </p>
                  <p className="text-[16px] leading-[1.85] text-foreground/60">
                    The answer: a contact ingestion pipeline paired with a deal-tracking interface.
                    Not a marketplace to meet strangers — a system to unlock the value of relationships they already have.
                  </p>
                </div>

                {/* Pain point callout */}
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-wider text-foreground/40 mb-6 font-medium">The untracked broker reality</p>
                  {[
                    { label: "Contacts per active broker", stat: "1,000 – 7,000+" },
                    { label: "Deals tracked simultaneously", stat: "Dozens" },
                    { label: "Primary tracking tool", stat: "WhatsApp + Spreadsheets" },
                    { label: "Time lost finding the right contact", stat: "Unmeasured" },
                  ].map((row, i) => (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between border border-foreground/5 bg-foreground/[0.02] px-5 py-4 rounded-sm"
                    >
                      <span className="text-[13px] text-foreground/50">{row.label}</span>
                      <span className="text-[13px] font-medium text-foreground">{row.stat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 02: WHAT WE'RE BUILDING ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">02 — The Product</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                Contact ingestion. Deal tracking. Network intelligence.
              </h2>
              <p className="text-[14px] leading-relaxed text-foreground/50 mb-12 max-w-2xl">
                The MVP is a two-part system: ingest a broker&apos;s contacts automatically (no manual entry),
                and overlay a deal-tracking pipeline on top. Phase two makes that network intelligent — searchable, filterable, connectable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/5">
                {[
                  {
                    label: "Contact Ingestion",
                    icon: "⬡",
                    desc: "Import contacts from existing sources without manual data entry. The platform organizes them into searchable, filterable profiles — supplier, buyer, product type, geography.",
                    phase: "MVP — Live",
                  },
                  {
                    label: "Deal Pipeline",
                    icon: "⇌",
                    desc: "A Kanban-style deal tracker that attaches contacts to active opportunities. Track status, parties, products, and timelines across every deal simultaneously.",
                    phase: "MVP — Live",
                  },
                  {
                    label: "Network Intelligence",
                    icon: "◈",
                    desc: "Surface warm introductions, identify who in your network can supply a given product, and map relationship strength — like Affinity CRM, but for trade operators.",
                    phase: "Phase 2 — Roadmap",
                  },
                  {
                    label: "Marketplace Layer",
                    icon: "⊞",
                    desc: "Once the network has real users and real data, a marketplace layer allows verified members to discover vetted opportunities beyond their existing circle.",
                    phase: "Phase 3 — Vision",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-background p-8"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[28px] text-foreground/20">{item.icon}</span>
                      <span className={`text-[9px] uppercase tracking-[0.12em] font-medium px-2 py-1 rounded-full border ${item.phase.includes("Live") ? "border-foreground/20 text-foreground/60 bg-foreground/5" : "border-foreground/8 text-foreground/30"}`}>
                        {item.phase}
                      </span>
                    </div>
                    <h3 className="text-[17px] font-medium text-foreground mb-3">{item.label}</h3>
                    <p className="text-[13px] leading-[1.7] text-foreground/50">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 03: HOW WE BUILT IT ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">03 — Build Process</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-12">
                From broker interviews to live MVP
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/5">
                {buildProcess.map((s, i) => (
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

        {/* ── 04: COMPETITIVE LANDSCAPE (THE CO-FOUNDER RESEARCH) ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">04 — How They Built It</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-4">
                Companies that combined network intelligence with marketplaces
              </h2>
              <p className="text-[14px] leading-relaxed text-foreground/50 mb-12 max-w-3xl">
                Our co-founder studied four defining companies — LinkedIn, Affinity, Faire, and Alibaba — to understand the order of operations.
                The pattern was clear: the network layer always precedes the marketplace. The one approach that has never worked at any scale is launching a generic, empty marketplace for &ldquo;anyone who wants to trade.&rdquo;
              </p>

              {/* Company Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-foreground/5 mb-12">
                {competitors.map((co, i) => (
                  <motion.div
                    key={co.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background p-8"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="text-[20px] font-medium text-foreground tracking-tight">{co.name}</p>
                        <p className="text-[11px] text-foreground/35 font-mono mt-0.5">est. {co.founded}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.12em] font-semibold px-2.5 py-1 rounded-full bg-foreground/[0.04] border border-foreground/10 text-foreground/40">
                        {co.tag}
                      </span>
                    </div>
                    <p className="text-[13px] leading-[1.75] text-foreground/55">{co.lesson}</p>
                  </motion.div>
                ))}
              </div>

              {/* Comparison Table */}
              <div>
                <p className="text-[11px] uppercase tracking-wider text-foreground/40 mb-6 font-medium">The order that worked</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[13px]">
                    <thead>
                      <tr className="border-b border-foreground/5">
                        {["Company", "Started With", "Marketplace Added", "Key Insight"].map((h) => (
                          <th key={h} className="pb-4 pr-8 text-[10px] uppercase tracking-[0.1em] text-foreground/35 font-medium whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5">
                      {[
                        { co: "LinkedIn", started: "Profiles + address book import", market: "2 years after launch", insight: "Real profiles first, marketplace second" },
                        { co: "Affinity", started: "Email/calendar sync (auto CRM)", market: "Never — network tool only", insight: "Search your own network = $120M+ business" },
                        { co: "Faire", started: "Net-60 terms for indie retailers", market: "Day 1, seeded by existing relationships", insight: "Viral because real relationships migrated" },
                        { co: "Alibaba", started: "Manual factory recruitment", market: "After years of supply-side building", insight: "Empty marketplace for 'everyone' never works" },
                      ].map((row, i) => (
                        <motion.tr
                          key={row.co}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <td className="py-4 pr-8 font-medium text-foreground">{row.co}</td>
                          <td className="py-4 pr-8 text-foreground/50">{row.started}</td>
                          <td className="py-4 pr-8 text-foreground/50">{row.market}</td>
                          <td className="py-4 pr-8 text-foreground/60 italic">{row.insight}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 p-6 border border-foreground/8 bg-foreground/[0.02]">
                  <p className="text-[13px] leading-[1.75] text-foreground/60 max-w-3xl">
                    <strong className="text-foreground/80 font-medium">What this means for Neta Bridge:</strong>{" "}
                    We are building the network tool first. Contact ingestion → deal tracking → network intelligence. The marketplace layer grows naturally from a foundation of real users with real data — exactly like LinkedIn, exactly like Affinity. That&apos;s the playbook.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── 05: SKILLS APPLIED ── */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 pb-24">
          <FadeIn>
            <div className="border border-foreground/5 p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.12em] uppercase text-foreground/40 font-medium mb-2">05 — Skills Applied</p>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.01em] text-foreground leading-[1.2] mb-10">
                My contribution to the build
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="p-5 border border-foreground/8 bg-foreground/[0.02] flex flex-col gap-3"
                  >
                    <span className="text-[22px] text-foreground/25">{skill.icon}</span>
                    <span className="text-[14px] font-medium text-foreground/70">{skill.label}</span>
                  </motion.div>
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
                Built for real-time trade intelligence
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
                <Link
                  href="https://netabridge.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-foreground/40 hover:text-foreground transition-colors font-mono"
                >
                  netabridge.com
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
