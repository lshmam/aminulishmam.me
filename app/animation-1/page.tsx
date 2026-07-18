"use client";

import { useRef, useState, useEffect } from "react";
import { useAnimationFrame, useInView, AnimatePresence } from "framer-motion";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { projects } from "@/lib/projects";
import ObjectBurst from "@/components/animations/PrismaticBurst";
import { ParticlesBackground } from "@/components/animations/particles-background";
import VerticalProjectList from "@/components/VerticalProjectList";
import AboutSection from "@/components/AboutSection";

// ── Call Widget Component ──
function CallWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-30% 0px -30% 0px" });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setExpanded(true), 600);
      return () => clearTimeout(timer);
    } else {
      setExpanded(false);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full h-full">
      <motion.div
        layout
        initial={{ borderRadius: 64, width: 64, height: 64, opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.8,
          width: expanded ? 320 : 64,
          borderRadius: expanded ? 40 : 64,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-[#1c1c1e] flex items-center p-2 overflow-hidden shadow-2xl"
      >
        <motion.div layout className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500" />
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between flex-1 ml-4 mr-1 whitespace-nowrap"
            >
              <div className="flex flex-col justify-center">
                <span className="text-white/50 text-[11px] uppercase tracking-wider font-semibold leading-tight">Hey</span>
                <span className="text-white font-medium text-[15px] leading-tight">I'm Aminul</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                  <X className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#34c759] flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ── Exact same CardMedia from ProjectsMasonry ──
function CardMedia({ project }: { project: (typeof projects)[number] }) {
  if (project.title === "Neucler") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black">
          <ObjectBurst colors={["#FF5733", "#33FFCE", "#335BFF", "#F033FF"]} />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img src="/Frame 79.png" alt="Neucler UI" className="w-[30%] h-auto object-contain" />
        </div>
      </>
    );
  }
  if (project.title === "Faeth Studio") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black" />
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-[0.4em] uppercase">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-[28px] font-bold text-white mix-blend-difference text-center">FAETH STUDIO</h3>
            <div className="h-[1px] w-16 bg-white/30" />
            <span className="text-[10px] text-white/50 tracking-[0.2em] text-center">0-TO-1 DESIGN AGENCY</span>
          </div>
        </div>
      </>
    );
  }
  if (project.title === "Jim Coach") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-black flex flex-col items-center justify-center p-8">
        <div className="w-24 h-24 rounded-full border-2 border-blue-500/30 flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-widest uppercase text-center">JIM COACH</h3>
        <p className="text-blue-300/60 mt-2 text-sm tracking-widest uppercase">AI Fitness Tracking</p>
      </div>
    );
  }
  if (project.title === "MyTrials") {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-emerald-900 to-black flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xs h-32 rounded-xl border border-emerald-500/20 bg-black/50 p-4 flex flex-col justify-between mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="w-3/4 h-3 rounded-full bg-emerald-500/40" />
          <div className="w-1/2 h-3 rounded-full bg-emerald-500/20" />
          <div className="w-full h-12 mt-4 rounded-lg bg-emerald-500/10" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-widest uppercase text-center">MYTRIALS</h3>
        <p className="text-emerald-300/60 mt-2 text-sm tracking-widest uppercase">Clinical Dashboard</p>
      </div>
    );
  }
  if (project.title === "Neta Bridge") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black">
          <ParticlesBackground id="neta-particles-fan" />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-widest uppercase">
          <h3 className="text-[28px] font-bold text-white mix-blend-difference">NETABRIDGE</h3>
        </div>
      </>
    );
  }
  return (
    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="w-full h-full object-cover" />
  );
}

export default function Animation1Page() {
  // ── CAROUSEL ROTATION ──
  const baseRotation = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    let moveBy = 3 * (delta / 1000);
    baseRotation.set(baseRotation.get() + moveBy);
  });

  const rotateYStr = useTransform(baseRotation, (r) => `translateZ(2200px) rotateY(${r}deg)`);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The section is very tall, so we make the scale effect finish by 25% scroll progress
  // so it's extremely obvious while the user is still viewing the top of the page.
  const scaleY = useTransform(scrollYProgress, [0, 0.25], [1, 0.05]);

  return (
    <>


      {/* ── HERO + PROJECTS: one seamless section with ani-3 bg ── */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          backgroundColor: "#FAFAFA",
        }}
      >
        {/* ani-3 background fading to white at the bottom */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "260vh",
            backgroundImage: "url('/ani-3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            transformOrigin: "50% 0%",
            scaleY: scaleY,
          }}
        />

        {/* Name + Tagline */}
        <div className="relative z-20 flex flex-col items-center text-center pt-32 mb-20 pointer-events-none px-4">
          <h1
            className="text-white leading-none tracking-tight"
            style={{
              fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 90px)",
              letterSpacing: "-0.03em",
            }}
          >
            Aminul Islam Ishmam
          </h1>
          <p
            className="text-white/60 mt-3 tracking-widest uppercase text-[12px] md:text-[13px]"
            style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: "0.2em" }}
          >
            Designer&nbsp;&nbsp;&middot;&nbsp;&nbsp;Founder&nbsp;&nbsp;&middot;&nbsp;&nbsp;Engineer
          </p>
        </div>

        {/* 3D Carousel — static, no sticky, overflow clipped */}
        <div style={{ overflow: "hidden", width: "100%", padding: "120px 0" }} className="mb-10">
        <div
          className="relative z-10"
          style={{ width: 360, height: 240, perspective: 3000, margin: "0 auto", overflow: "visible" }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: rotateYStr,
            }}
          >
            {[...projects, ...projects, ...projects, ...projects].map((project, i, arr) => {
              const angle = (360 / arr.length) * i;
              const radius = 1300;
              return (
                <Link
                  key={`${project.id}-${i}`}
                  href={project.href}
                  className="group"
                  style={{
                    position: "absolute",
                    width: 360,
                    height: 240,
                    borderRadius: 32,
                    left: 0,
                    top: 0,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                    textDecoration: "none",
                    display: "block",
                    backfaceVisibility: "hidden",
                    transform: `rotateY(${angle}deg) translateZ(-${radius}px)`,
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 32, WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                    <CardMedia project={project} />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-20 transition-opacity duration-500"
                      style={{ opacity: 0.6 }}
                    />
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-30 scale-90 group-hover:scale-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
        </div>{/* end carousel overflow wrapper */}


        {/* Vertical Projects List — same container, seamless */}
        <VerticalProjectList />
      </section>

      {/* ── About Bio Section (Includes Footer) ── */}
      <AboutSection />
    </>
  );
}
