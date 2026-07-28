import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";

import Link from "next/link";
import Image from "next/image";
export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-[800px] mx-auto px-3 sm:px-4">
      <Header />
      <section className="pt-6 pb-20">
        <h1 
          className="text-3xl sm:text-4xl font-serif text-foreground mb-10 leading-tight"
          style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}
        >
          About Me
        </h1>

        <div className="flex flex-col sm:flex-row gap-8 items-start mb-10">
          <div className="w-full sm:w-[320px] aspect-[4/5] relative overflow-hidden bg-zinc-100 rounded-lg shrink-0">
            <Image
              src="/iona_formal (1 of 1) (1).jpg"
              alt="Aminul Islam"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-foreground/80 flex-1">
            <p>
              I&apos;m <strong className="text-foreground font-semibold">Aminul Islam</strong>, a product-focused founder specializing in zero-to-one implementation.
            </p>
            <p>
              Over the last 3 years, I&apos;ve built and deployed products across B2B SaaS, consumer apps, and marketplace sectors. I have bootstrapped, raised funding for, and successfully exited multiple operations.
            </p>
            <p>
              My core operational focus is the <strong>first mile</strong> — the chaotic, undefined space between conceptualization and product-market fit. I strongly believe that the most effective founders operate simultaneously as designers, engineers, and sales personnel.
            </p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-foreground/10">
          <h2 className="text-[20px] font-semibold text-foreground mb-8">
            Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            {[
              "0→1 Product Strategy",
              "Go-to-Market Execution",
              "Fundraising & Pitching",
              "Founding Team Building",
              "Growth & Distribution",
              "Technical Product Sense",
            ].map((skill) => (
              <div key={skill} className="flex items-center gap-3 text-[15px] text-foreground/80">
                <span className="text-foreground/40 text-[10px]">●</span>
                {skill}
              </div>
            ))}
          </div>
        </div>



      </section>
      <BottomDock />
    </main>
  );
}
