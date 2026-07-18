"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

export default function AnimationPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // ── SCROLL PERCENTAGE TRACKER ──
  const [scrollPercent, setScrollPercent] = useState("0%");
  useMotionValueEvent(smooth, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100) + "%");
  });

  // ─────────────────────────────────────────────────────────────────────────
  // FRAMER-STYLE: each image is full-bleed (cover) and parallax-scrolled.
  // The images slide through at staggered scroll ranges so they cross-dissolve
  // via position overlap — no opacity needed, just Y translation.
  //
  //  Phase 0→0.33  : ani-1 rises from bottom → exits top   (white bg revealed → black bg)
  //  Phase 0.33→0.66: ani-2 rises from bottom → exits top  (transition gradient)
  //  Phase 0.66→1.0 : ani-3 rises from bottom → exits top  (outro / black to white)
  //
  // Each image travels from +100vh (below fold) to -100vh (above fold).
  // Because they're full-cover, they act as seamless scene transitions.
  // ─────────────────────────────────────────────────────────────────────────

  // ani-1: white bg, orange arc peaking from bottom — rises first
  const y1 = useTransform(smooth, [0, 0.4], ["100vh", "-120vh"]);

  // ani-2: black gradient hill — enters as ani-1 exits
  const y2 = useTransform(smooth, [0.28, 0.68], ["100vh", "-120vh"]);

  // ani-3: black top / orange arc / white bottom — enters as ani-2 exits
  const y3 = useTransform(smooth, [0.56, 1.0], ["100vh", "-120vh"]);

  // ── TEXT layers that ride on top of each scene ──
  // Text 1 appears while ani-1 is visible
  const textY1 = useTransform(smooth, [0.0, 0.28], ["60px", "-80px"]);
  const textOpacity1 = useTransform(smooth, [0.0, 0.08, 0.22, 0.28], [0, 1, 1, 0]);

  // Text 2 appears while ani-2 is visible
  const textY2 = useTransform(smooth, [0.28, 0.56], ["60px", "-80px"]);
  const textOpacity2 = useTransform(smooth, [0.28, 0.36, 0.5, 0.56], [0, 1, 1, 0]);

  // Text 3 appears while ani-3 is visible
  const textY3 = useTransform(smooth, [0.56, 1.0], ["60px", "-20px"]);
  const textOpacity3 = useTransform(smooth, [0.56, 0.64, 0.9, 1.0], [0, 1, 1, 0]);

  return (
    <main className="bg-white">
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-[200] origin-left"
        style={{ scaleX: smooth }}
      />
      <div className="fixed top-4 right-6 z-[200] font-mono text-xs font-bold text-black/30 pointer-events-none mix-blend-multiply">
        {scrollPercent}
      </div>

      {/* ── SCROLL CONTAINER ── */}
      <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ── BASE: white background ── */}
          <div className="absolute inset-0 bg-white" />

          {/* ── LAYER 1: ani-1 (orange arc on white) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: y1 }}
          >
            <img
              src="/ani-1.png"
              alt=""
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center bottom" }}
              draggable={false}
            />
          </motion.div>

          {/* ── TEXT 1 ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ y: textY1, opacity: textOpacity1 }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase text-black/40 mb-4"
              style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif" }}
            >
              Beginning
            </p>
            <h2
              className="text-[56px] sm:text-[80px] md:text-[96px] leading-none text-center text-black max-w-[860px]"
              style={{ fontFamily: "var(--font-tiempos), Georgia, serif", fontWeight: 400 }}
            >
              Rise and<br /><em>unfold.</em>
            </h2>
          </motion.div>

          {/* ── LAYER 2: ani-2 (dark gradient hill) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: y2 }}
          >
            <img
              src="/ani-2.png"
              alt=""
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center" }}
              draggable={false}
            />
          </motion.div>

          {/* ── TEXT 2 ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
            style={{ y: textY2, opacity: textOpacity2 }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-4"
              style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif" }}
            >
              Transition
            </p>
            <h2
              className="text-[56px] sm:text-[80px] md:text-[96px] leading-none text-center text-white max-w-[860px]"
              style={{ fontFamily: "var(--font-tiempos), Georgia, serif", fontWeight: 400 }}
            >
              Designed to<br /><em>feel different.</em>
            </h2>
          </motion.div>

          {/* ── LAYER 3: ani-3 (black top / white bottom) ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ y: y3 }}
          >
            <img
              src="/ani-3.png"
              alt=""
              className="w-full h-full"
              style={{ objectFit: "cover", objectPosition: "center" }}
              draggable={false}
            />
          </motion.div>

          {/* ── TEXT 3 ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
            style={{ y: textY3, opacity: textOpacity3 }}
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase text-black/40 mb-4"
              style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif" }}
            >
              Resolution
            </p>
            <h2
              className="text-[56px] sm:text-[80px] md:text-[96px] leading-none text-center text-black max-w-[860px]"
              style={{ fontFamily: "var(--font-tiempos), Georgia, serif", fontWeight: 400 }}
            >
              Built from<br /><em>first principles.</em>
            </h2>
          </motion.div>

        </div>
      </div>

      {/* ── FOOTER PADDING ── */}
      <div className="h-[20vh] w-full bg-white" />
    </main>
  );
}
