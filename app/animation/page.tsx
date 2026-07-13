"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

export default function AnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });

  // ── SCROLL PERCENTAGE TRACKER ──
  const [scrollPercent, setScrollPercent] = useState("0%");
  useMotionValueEvent(smooth, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100) + "%");
  });

  // 1. Intro: ani-2 scrolls up and out
  const introY = useTransform(smooth, [0, 0.40], ["100vh", "-100vh"]);

  // 2. Black card with text: scrolls in after intro, scrolls out before outro
  const cardY = useTransform(smooth, [0.38, 0.62], ["100vh", "-100vh"]);

  // 3. Outro: ani-2 rotated 180° scrolls up and out
  const outroY = useTransform(smooth, [0.60, 1.0], ["200vh", "-200vh"]);

  return (
    <main className="bg-white">
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-black z-[100] origin-left"
        style={{ scaleX: smooth }}
      />
      <div className="fixed top-4 right-6 z-[100] font-mono text-sm font-bold text-black pointer-events-none">
        {scrollPercent}
      </div>

      <div ref={containerRef} className="relative" style={{ height: "1500vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

          {/* 1. INTRO: ani-2 rises and scrolls off the top */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
            style={{ y: introY }}
          >
            <img src="/ani-2.png" alt="" className="w-full h-auto" />
          </motion.div>

          {/* 2. BLACK CARD + TEXT: scrolls in from bottom, out to top */}
          <motion.div
            className="absolute left-0 right-0 bg-black flex flex-col items-center justify-center px-6 gap-4 pointer-events-none"
            style={{ y: cardY, height: "100vh", top: "-100vh" }}
          >
            <h2
              className="text-white text-[44px] sm:text-[72px] md:text-[96px] leading-none text-center max-w-[900px]"
              style={{ fontFamily: "var(--font-tiempos), Georgia, serif", fontWeight: 400 }}
            >
              Designed to
              <br />
              <em>feel different.</em>
            </h2>
            <p
              className="text-white/50 text-[13px] sm:text-[16px] tracking-[0.2em] uppercase text-center"
              style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif" }}
            >
              Built from first principles. Crafted for people.
            </p>
          </motion.div>

          {/* 3. OUTRO: ani-2 rotated 180° scrolls up and out */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none"
            style={{ y: outroY, rotate: 180 }}
          >
            <img src="/ani-2.png" alt="" className="w-full h-auto" />
          </motion.div>

        </div>
      </div>

      <div className="h-[30vh] w-full bg-white" />
    </main>
  );
}
