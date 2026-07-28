"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail } from "lucide-react";

const GithubIcon = ({ size = 15, ...props }: { size?: number; [key: string]: any }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 15, ...props }: { size?: number; [key: string]: any }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/lshmam", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/aminulishmam/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ishmam.aminul@gmail.com", label: "Email" },
];

export default function Header({ 
  theme = 'light',
  className = ''
}: { 
  theme?: 'light' | 'dark',
  className?: string
}) {
  return (
    <header
      className={`flex items-center justify-between py-5 sm:py-6 overflow-hidden max-w-full ${className}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <img 
          src="/aminul-logo.svg" 
          alt="Aminul Logo" 
          className={`w-9 h-9 sm:w-12 sm:h-12 ${theme === 'dark' ? 'invert' : ''}`} 
        />
        <div>
          <p className={`text-[12px] sm:text-[13px] font-medium leading-tight ${theme === 'dark' ? 'text-white' : 'text-foreground'}`}>
            Aminul Islam Ishmam
          </p>
          <p className={`text-[11px] sm:text-[12px] leading-tight mt-0.5 ${theme === 'dark' ? 'text-white/60' : 'text-foreground/60'}`}>
            Founder · Designer · Engineer
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-3.5 shrink-0">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-200 p-1 ${theme === 'dark' ? 'text-white hover:text-white/80' : 'text-foreground/60 hover:text-foreground'}`}
          >
            <Icon size={15} />
          </Link>
        ))}
      </div>
    </header>
  );
}
