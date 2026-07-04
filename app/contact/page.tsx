import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen max-w-[620px] mx-auto px-5 sm:px-6">
      <Header />
      <section className="pt-6 pb-40">
        <h1 
          className="text-3xl sm:text-4xl font-serif text-foreground mb-10 leading-tight"
          style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}
        >
          Contact
        </h1>

        <div className="flex flex-col gap-6">
          {[
            { label: "Email", value: "hello@aminul.com", href: "mailto:hello@aminul.com" },
            { label: "Twitter/X", value: "x.com/aminulislam", href: "https://twitter.com" },
            { label: "LinkedIn", value: "linkedin.com/in/aminul", href: "https://linkedin.com" },
            { label: "GitHub", value: "github.com/aminul", href: "https://github.com" },
          ].map(({ label, value, href }) => (
            <div key={label} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 items-start opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-[14px] font-semibold text-foreground/50">
                {label}
              </span>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-foreground decoration-foreground/30 hover:underline underline-offset-4"
              >
                {value}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <BottomDock />
    </main>
  );
}
