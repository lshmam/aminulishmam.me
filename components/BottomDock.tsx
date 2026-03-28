"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowLeft } from "lucide-react";

const navItems = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function BottomDock() {
  const pathname = usePathname();
  const isWorkPage = pathname.startsWith("/work/");

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex items-center gap-1 px-4 py-3 rounded-full shadow-xl"
        style={{
          backgroundColor: "rgba(35, 35, 35, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href;

          if (isWorkPage && label === "Work") {
            return (
              <Link
                key="back"
                href="/"
                className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium text-white/60 hover:text-white transition-all duration-200"
              >
                <ArrowLeft size={14} strokeWidth={2.2} />
                Back
              </Link>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              className={`relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
                isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
