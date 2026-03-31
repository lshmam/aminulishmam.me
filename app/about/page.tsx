import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import VennDiagram from "@/components/VennDiagram";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-[620px] mx-auto px-5 sm:px-6">
      <Header />
      <section className="pt-6 pb-40 font-mono uppercase tracking-widest">
        <h1 className="text-[20px] sm:text-[28px] font-bold text-foreground mb-12 flex items-center gap-4">
          <span className="w-2.5 h-4 bg-foreground animate-pulse" />
          IDENTIFICATION / BIO
        </h1>

        <div className="space-y-6 text-[13px] leading-[1.8] text-foreground/80 lowercase">
          <p>
            &gt; subject: <strong className="text-foreground font-bold text-[14px]">aminul islam</strong> — product-focused founder specializing in zero-to-one implementation.
          </p>
          <p>
            &gt; record: over the last 7 years, deployed across b2b saas, consumer apps, and marketplace sectors. bootstrapped, raised, and exited multiple operations.
          </p>
          <p>
            &gt; operational focus: the [first mile] — the chaotic, undefined space between conceptualization and product-market fit. hypothesis: optimal founders operate simultaneously as designers, engineers, and sales personnel.
          </p>

          <VennDiagram />

          <div className="pt-8">
            <p className="mb-6">
              &gt; psychometric evaluation: big five personality traits.
            </p>
            <div className="w-full border border-foreground/10 rounded-sm p-1 mb-6 bg-white/50">
              <img 
                src="/ttfdletog.png" 
                alt="Big Five Psychometric Profile" 
                className="w-full h-auto mix-blend-multiply opacity-90 grayscale-[20%]"
              />
            </div>
            <p>
              &gt; analysis: high conscientiousness (103) and extraversion (94) indicate strong operational drive and team leadership capacity. elevated agreeableness (93) and openness (85) suggest collaborative problem-solving and adaptability. low neuroticism (46) denotes stable execution under high-stress conditions.
            </p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-foreground/10">
          <h2 className="text-[14px] font-bold text-foreground mb-8">
            CAPABILITIES SUMMARY
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            {[
              "0→1 product strategy",
              "go-to-market execution",
              "fundraising & pitching",
              "founding team building",
              "growth & distribution",
              "technical product sense",
            ].map((skill) => (
              <div key={skill} className="flex items-center gap-4 text-[13px] text-foreground/70 lowercase">
                <span className="text-foreground font-bold">[*]</span>
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-20 pt-10 border-t border-foreground/10">
          <h2 className="text-[20px] sm:text-[28px] font-bold text-foreground mb-12 flex items-center gap-4">
            <span className="w-2.5 h-4 bg-foreground animate-pulse" />
            COMMUNICATION PROTOCOLS
          </h2>

          <div className="space-y-6 text-[13px] leading-[1.8] text-foreground/80 lowercase mb-12">
            <p>
              &gt; directive: establish encrypted channels for operational coordination, deal flow exploration, or strategic exchange.
            </p>
            <p>
              &gt; response rate: slas indicate 24-48 business hours.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { label: "sys.email", value: "hello@aminul.com", href: "mailto:hello@aminul.com" },
              { label: "net.twitter", value: "x.com/aminulislam", href: "https://twitter.com" },
              { label: "net.linkedin", value: "linkedin.com/in/aminul", href: "https://linkedin.com" },
              { label: "git.source", value: "github.com/aminul", href: "https://github.com" },
            ].map(({ label, value, href }) => (
              <div key={label} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 items-start opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-[11px] font-bold text-foreground/50 lowercase">
                  [{label}]
                </span>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-foreground lowercase decoration-foreground/30 hover:underline underline-offset-4"
                >
                  {value}
                </Link>
              </div>
            ))}
          </div>
        </div>

      </section>
      <BottomDock />
    </main>
  );
}
