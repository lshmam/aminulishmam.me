"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="pt-12 pb-20 md:pt-20 md:pb-32"
    >
      <h1 className="text-[32px] sm:text-[44px] md:text-[56px] leading-[1.15] font-normal tracking-[-0.02em] text-foreground">
        0 to 1 Founder.
        <br />
        Interested in everything{" "}
        <span className="font-semibold">Product</span>
      </h1>
    </motion.section>
  );
}
