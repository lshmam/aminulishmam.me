"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useVelocity, useSpring, useMotionValue, useAnimationFrame, useTransform, useInView, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone, X } from "lucide-react";
import Header from "@/components/Header";
import { projects } from "@/lib/projects";
import ObjectBurst from "@/components/animations/PrismaticBurst";
import { ParticlesBackground } from "@/components/animations/particles-background";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);

  // ── SCROLL RESPONSIVE ROTATION ──
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 100, stiffness: 50, mass: 2 });
  const baseRotation = useMotionValue(0);

  // ── SCROLL PERCENTAGE TRACKER ──
  const [scrollPercent, setScrollPercent] = useState("0%");
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100) + "%");
  });

  useAnimationFrame((t, delta) => {
    let moveBy = 3 * (delta / 1000);
    const velocityFactor = Math.abs(smoothVelocity.get());
    moveBy += velocityFactor * 0.003 * (delta / 1000);
    baseRotation.set(baseRotation.get() + moveBy);
  });

  const rotateYStr = useTransform(baseRotation, (r) => `translateZ(2200px) rotateY(${r}deg)`);

  // ── PARALLAX OVERLAP LOGIC ──
  const { scrollYProgress: s1Progress } = useScroll({
    target: section1Ref,
    offset: ["start start", "end end"],
  });

  // Carousel moves up slowly
  const carouselY = useTransform(s1Progress, [0, 1], ["0vh", "-100vh"]);
  // ani-2 moves up faster, starting from below the screen and ending fully off the top to leave a solid black screen
  const ani2Y = useTransform(s1Progress, [0, 0.7], ["100vh", "-100vh"]);
  // Stretch effect
  const ani2ScaleY = useTransform(s1Progress, [0, 0.7], [1, 1.8]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => section.classList.toggle("text-visible", entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-zinc-900 z-[100] origin-left mix-blend-difference"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="fixed top-4 right-6 z-[100] font-mono text-sm font-bold text-white mix-blend-difference pointer-events-none">
        {scrollPercent}
      </div>

      <style>{`
        .text-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .text-visible .text-content {
          opacity: 1;
          transform: translateY(0);
        }
        .carousel-scene {
          width: 800px;
          height: 500px;
          perspective: 1200px;
          margin: 0 auto;
        }
        .carousel-ring {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        .carousel-card {
          position: absolute;
          width: 800px;
          height: 500px;
          border-radius: 16px;
          overflow: hidden;
          left: 0;
          top: 0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          text-decoration: none;
          display: block;
          backface-visibility: hidden;
        }
        .carousel-card:hover .card-overlay { opacity: 0.85 !important; }
        .fan-bottom-mist {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: linear-gradient(to top, #ffffff, transparent);
          pointer-events: none;
          z-index: 30;
        }
      `}</style>

      {/* ── SECTION 1: Parallax Carousel + ani-2 overlap ── */}
      <section
        ref={section1Ref}
        style={{
          height: "300vh",
          background: "#000",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            height: "135vh",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Main Landing Page Header */}
          <div className="absolute top-0 left-0 right-0 z-50 max-w-[1200px] mx-auto px-4 sm:px-6 w-full mix-blend-difference">
            <Header />
          </div>

          {/* 

          <motion.div className="carousel-scene" style={{ y: carouselY }}>
            <motion.div className="carousel-ring" style={{ transform: rotateYStr }}>
              {[...projects, ...projects, ...projects, ...projects].map((project, i, arr) => {
                const angle = (360 / arr.length) * i;
                const radius = 2600;
                return (
                  <Link
                    key={`${project.id}-${i}`}
                    href={project.href}
                    className="carousel-card group"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(-${radius}px)`,
                    }}
                  >
                    <CardMedia project={project} />

                    {/* Frosted fade at the bottom *\/}
                    <div className="absolute bottom-0 left-0 right-0 h-40 backdrop-blur-2xl bg-gradient-to-t from-white/60 to-transparent z-10 pointer-events-none [mask-image:linear-gradient(to_top,black_10%,transparent_100%)]" />

                    <div
                      className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-20 transition-opacity duration-500"
                      style={{ opacity: 0.6 }}
                    />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-30 scale-90 group-hover:scale-100">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </motion.div>
          */}

          {/* Full Screen Video Hero */}
          <motion.div className="absolute top-20 md:top-24 left-0 right-0 w-full h-[75vh] p-4 md:p-8 mx-auto max-w-[1600px]" style={{ y: carouselY }}>
            <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl relative bg-zinc-900">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="/MyTrials.ai Commercial.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* ani-2 — anchored to top inside sticky, moved by parallax y */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              x: "-50%",
              width: "100%",
              zIndex: 10,
              pointerEvents: "none",
              y: ani2Y,
              scaleY: ani2ScaleY,
              transformOrigin: "bottom center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ani-2.png" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: Black background with text ── */}
      <section
        ref={sectionRef}
        style={{
          height: "150vh",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          gap: "16px",
        }}
      >
        <CallWidget />
      </section>

      {/* ── SECTION 4: ani-2 rotated 180deg ── */}
      <section
        style={{
          height: "161vh",
          backgroundImage: "url('/ani-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "rotate(180deg)",
        }}
      />
    </>
  );
}
