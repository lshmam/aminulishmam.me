import Link from "next/link";

const socialLinks = [
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/aminulishmam/" },
  { label: "EMAIL", href: "mailto:ishmam.aminul@gmail.com" },
  { label: "GITHUB", href: "https://github.com/lshmam" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#d8d6d0] max-w-[1200px] mx-auto px-4 sm:px-6 py-5 sm:py-6 mb-20 sm:mb-0">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 sm:gap-0">
        <p className="text-[11px] text-muted uppercase tracking-widest text-center sm:text-left">
          Designed + coded with ♥ by Aminul
        </p>
        <nav className="flex items-center gap-4 sm:gap-5">
          {socialLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-muted uppercase tracking-widest hover:text-foreground transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
