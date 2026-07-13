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

  const [scrollPercent, setScrollPercent] = useState("0%");
  useMotionValueEvent(smooth, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100) + "%");
  });

  // Container height is 1500vh. All breakpoints are scaled mathematically to ensure
  // the Intro and Text sections scroll at the exact same physical velocity as before
  // (when the container was 1000vh). The Outro now gets the remaining 500vh to perfectly mirror the Intro.

  // ── INTRO IMAGE SEQUENCE (Scaled x0.66) ──
  const img1Opacity = useTransform(smooth, [0.033, 0.100, 0.253, 0.320], [0, 1, 1, 0]);
  const img2Opacity = useTransform(smooth, [0.066, 0.133, 0.320, 0.366], [0, 1, 1, 0]);
  const img1Y = useTransform(smooth, [0.0, 0.366], ["180vh", "-20vh"]);
  const img2Y = useTransform(smooth, [0.0, 0.433], ["240vh", "-10vh"]);

  // ── BLACK OVERLAY (Fades to white before images fade out) ──
  const blackOpacity = useTransform(smooth, [0.166, 0.333, 0.860, 0.860], [0, 1, 1, 0]);

  // ── TEXT (Scaled x0.66) ──
  const textOpacity = useTransform(smooth, [0.360, 0.413, 0.466, 0.506], [0, 1, 1, 0]);
  const textY = useTransform(smooth, [0.360, 0.413, 0.466, 0.506], ["40px", "0px", "0px", "-40px"]);
  const subTextOpacity = useTransform(smooth, [0.386, 0.433, 0.480, 0.506], [0, 1, 1, 0]);
  const subTextY = useTransform(smooth, [0.386, 0.433, 0.480, 0.506], ["30px", "0px", "0px", "-30px"]);

  // ── OUTRO: Mirrored from Intro. Gets a full 0.366+ of scroll duration. ──
  const outImg1Opacity = useTransform(smooth, [0.633, 0.700, 0.920, 0.960], [0, 1, 1, 0]);
  const outImg1Y = useTransform(smooth, [0.600, 1.000], ["300vh", "-150vh"]);

  const outImg2Opacity = useTransform(smooth, [0, 0.599, 0.600, 1], [0, 0, 1, 1]);
  const outImg2Y = useTransform(smooth, [0.600, 1.000], ["300vh", "-150vh"]);

  // ── SCROLL HINT ──
  const hintOpacity = useTransform(smooth, [0, 0.04], [1, 0]); // Scaled down slightly

  return (
    <main className="bg-white">
      {/* ── SCROLL PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-white z-[100] origin-left mix-blend-difference"
        style={{ scaleX: smooth }}
      />
      <div className="fixed top-4 right-6 z-[100] font-mono text-sm font-bold text-white mix-blend-difference pointer-events-none">
        {scrollPercent}
      </div>

      <div ref={containerRef} className="relative" style={{ height: "1500vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

          {/* ── INTRO: ani-1 rises ── */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-25"
            style={{ opacity: img1Opacity, y: img1Y }}
          >
            <img src="/ani-1.png" alt="" className="w-full h-auto" />
          </motion.div>

          {/* ── INTRO: ani-2 rises (parallax) ── */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-30"
            style={{ opacity: img2Opacity, y: img2Y }}
          >
            <img src="/ani-2.png" alt="" className="w-full h-auto" />
          </motion.div>

          {/* ── BLACK BG: comes in, stays dark ── */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none z-20"
            style={{ opacity: blackOpacity }}
          />

          {/* ── TEXT ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-6 gap-6">
            <motion.h2
              className="text-white text-[44px] sm:text-[72px] md:text-[96px] leading-none text-center max-w-[900px]"
              style={{
                fontFamily: "var(--font-tiempos), Georgia, serif",
                fontWeight: 400,
                opacity: textOpacity,
                y: textY,
              }}
            >
              Designed to
              <br />
              <em>feel different.</em>
            </motion.h2>
            <motion.p
              className="text-white/50 text-[13px] sm:text-[16px] tracking-[0.2em] uppercase text-center max-w-[500px]"
              style={{
                fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif",
                opacity: subTextOpacity,
                y: subTextY,
              }}
            >
              Built from first principles. Crafted for people.
            </motion.p>
          </div>

          {/* ── OUTRO: Flipped ani-1 rises ── */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-25"
            style={{ opacity: outImg1Opacity, y: outImg1Y, rotate: 180 }}
          >
            <img src="/ani-1.png" alt="" className="w-full h-auto" />
          </motion.div>

          {/* ── OUTRO: Flipped ani-2 rises (parallax overlap) ── */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-30"
            style={{ opacity: outImg2Opacity, y: outImg2Y, rotate: 180 }}
          >
            <img src="/ani-2.png" alt="" className="w-full h-auto" />
          </motion.div>

          {/* ── SCROLL HINT ── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50"
            style={{ opacity: hintOpacity }}
          >
            <p
              className="text-black/30 text-[11px] tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif" }}
            >
              Scroll
            </p>
            <motion.div
              className="w-[1px] h-8 bg-black/20 origin-top"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </motion.div>

        </div>
      </div>
      {/* ── EXTRA WHITE SPACE BEFORE FOOTER ── */}
      <div className="h-[50vh] w-full bg-white" />
    </main>
  );
}
