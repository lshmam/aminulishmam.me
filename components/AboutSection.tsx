"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Inverted squash effect: starts very squashed (0.05) when it enters the viewport,
  // and expands to full height (1) as you scroll down.
  const scaleY = useTransform(scrollYProgress, [0, 0.15], [0.05, 1]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: "200vh",
        backgroundColor: "#FAFAFA",
      }}
    >
      {/* ani-2 parallax background */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/ani-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
          scaleY: scaleY,
          transformOrigin: "50% 100%",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent, black 30%, black 100%)",
        }}
      />

      {/* All content sits above the footer, inside the same container */}
      <div className="relative z-10 flex flex-col flex-1">

        {/* ── About Content ── */}
        <div className="w-full max-w-[500px] mx-auto px-6 pt-32 pb-32 font-sans text-[13px] md:text-[14px] leading-[1.6]">
          <h2 className="text-center text-[20px] md:text-[24px] font-medium mb-8 text-black">
            A little about me
          </h2>

          <div className="space-y-4 text-left text-black/80 font-medium">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>

          <div className="w-full max-w-[300px] mx-auto mt-16 aspect-[3/4] relative overflow-hidden bg-zinc-200">
            <Image
              src="/iona_formal (1 of 1) (1).jpg"
              alt="Portrait"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ── White text over the aura ── */}
        <div className="w-full max-w-[500px] mx-auto px-6 pb-24 text-white/90 text-[13px] md:text-[14px] leading-[1.6] space-y-8 text-center font-medium">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

      </div>
    </section>
  );
}
