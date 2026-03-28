import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen max-w-[620px] mx-auto px-5 sm:px-6">
      <Header />
      <section className="pt-6 pb-40">
        <h1 className="text-[26px] sm:text-[30px] font-normal tracking-[-0.01em] text-foreground mb-3">
          Let&apos;s talk.
        </h1>
        <p className="text-[13.5px] leading-[1.7] text-muted mb-12">
          Whether you&apos;re a founder looking for a co-builder, an investor exploring deal flow, or just want to exchange ideas — reach out.
        </p>

        <div className="space-y-0">
          {[
            { label: "Email", value: "hello@aminul.com", href: "mailto:hello@aminul.com" },
            { label: "Twitter / X", value: "@aminulislam", href: "https://twitter.com" },
            { label: "LinkedIn", value: "linkedin.com/in/aminul", href: "https://linkedin.com" },
            { label: "GitHub", value: "github.com/aminul", href: "https://github.com" },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex items-center justify-between py-4 border-b border-border">
              <span className="text-[10.5px] font-medium tracking-[0.08em] uppercase text-muted">
                {label}
              </span>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-foreground hover:text-foreground/50 transition-colors"
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
