"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="pt-12 pb-20 md:pt-20 md:pb-32 font-mono uppercase tracking-widest"
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-[28px] sm:text-[40px] md:text-[56px] leading-[1.2] font-bold text-foreground flex flex-col gap-2">
          <span>0 TO 1 FOUNDER.</span>
          <span className="text-foreground/70">
            INTERESTED IN EVERYTHING <span className="text-foreground">PRODUCT.</span>
          </span>
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <span className="w-3 h-5 bg-foreground animate-pulse" />
          <span className="text-[12px] sm:text-[14px] text-foreground/50 lowercase tracking-widest font-bold">
            &gt; system ready
          </span>
        </div>
      </div>
    </motion.section>
  );
}
