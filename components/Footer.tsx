"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const contactInfo = [
  { label: "ishmam.aminul@gmail.com", href: "mailto:ishmam.aminul@gmail.com" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/lshmam" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aminulishmam/" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/animation-1") return null;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full bg-transparent pb-0 overflow-hidden relative z-10 border-t border-white/20"
    >
      {/* Background Gradient Image */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[800px] -z-10 pointer-events-none opacity-100"
        style={{
          backgroundImage: "url('/bg-gradient.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          transform: "rotate(180deg)"
        }}
      />
      {/* Statement */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-4 sm:pb-6">
        <h2
          className="text-[28px] sm:text-[40px] md:text-[52px] leading-[1.15] text-black max-w-[800px]"
          style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500 }}
        >
          Multidisciplinary in approach,
          <br />
          collaborative on vision.
          <br />
          <span 
            className="text-black/80"
            style={{ fontFamily: "var(--font-tiempos), Georgia, serif", fontWeight: 400 }}
          >
            Let&apos;s create together.
          </span>
        </h2>
      </div>

      {/* Info grid & Name */}
      <div
        className="w-full px-4 sm:px-8 md:px-12 flex flex-col items-center"
        style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {/* Info grid */}
        <div className="w-full pb-6 sm:pb-8 pt-12 border-t border-white/20 flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
          {/* Column 1: Name & bio */}
          <div className="flex flex-col">
            <p className="text-[14px] sm:text-[15px] font-medium text-white">
              Aminul Islam Ishmam
            </p>
            <p className="text-[14px] sm:text-[15px] text-white/80 leading-tight mt-1">
              Product Designer & Engineer<br />
              with a focus on 0-to-1<br />
              Product Development.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="flex flex-col">
            <p className="text-[14px] sm:text-[15px] font-medium text-white mb-1">
              Contact
            </p>
            <Link
              href="mailto:ishmam.aminul@gmail.com"
              className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4"
            >
              ishmam.aminul@gmail.com
            </Link>
            <p className="text-[14px] sm:text-[15px] text-white/80 mt-1">
              Vancouver, British Columbia
            </p>
          </div>

          {/* Column 3: Social */}
          <div className="flex flex-col">
            <p className="text-[14px] sm:text-[15px] font-medium text-white mb-1">
              Social
            </p>
            <Link
              href="https://github.com/lshmam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/aminulishmam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4 mt-1"
            >
              LinkedIn
            </Link>
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col">
            <p className="text-[14px] sm:text-[15px] font-medium text-white mb-1">
              Imprint
            </p>
            <Link
              href="#"
              className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4 mt-1"
            >
              Terms
            </Link>
            <span className="text-[14px] sm:text-[15px] text-white/80 mt-1">
              &copy; 2026
            </span>
          </div>
        </div>

        {/* Name at the bottom */}
        <div className="w-full pb-2 sm:pb-4 pt-0 flex justify-center overflow-hidden">
          <p
            className="whitespace-nowrap select-none pointer-events-none text-center"
            style={{
              fontFamily:
                "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(70px, 19vw, 255px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "white",
              opacity: 0.9,
            }}
          >
            Aminul Islam
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
