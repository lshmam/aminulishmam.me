"use client";

import { motion } from "framer-motion";

const experiences = [
  { year: "2026", company: "Neucler Inc.", role: "Co-Founder & Product Lead" },
  { year: "2026", company: "Neta Bridge", role: "Product Manager & Designer" },
  { year: "2025", company: "Faeth Studio", role: "Founder & Design Lead" },
  { year: "2025", company: "Jim Coach", role: "Product Designer & Developer" },
  { year: "2023", company: "MyTrials", role: "Co-Founder" },
];

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-32 sm:pb-48 flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-[700px]">
        <h1
          className="leading-[1.25] text-white font-serif"
          style={{
            fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 400,
            fontFamily: "var(--font-tiempos), Georgia, serif",
          }}
        >
          I&apos;m Aminul, a product <br />
          designer who <em className="italic" style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}>engineers</em>.
        </h1>
      </div>
    </motion.section>
  );
}
