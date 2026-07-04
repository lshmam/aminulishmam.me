import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import VennDiagram from "@/components/VennDiagram";
import BigFiveChart from "@/components/BigFiveChart";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-[620px] mx-auto px-5 sm:px-6">
      <Header />
      <section className="pt-6 pb-40">
        <h1 
          className="text-3xl sm:text-4xl font-serif text-foreground mb-10 leading-tight"
          style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}
        >
          About Me
        </h1>

        <div className="space-y-6 text-[15px] sm:text-[16px] leading-[1.8] text-foreground/80">
          <p>
            I&apos;m <strong className="text-foreground font-semibold">Aminul Islam</strong>, a product-focused founder specializing in zero-to-one implementation.
          </p>
          <p>
            Over the last 3 years, I&apos;ve built and deployed products across B2B SaaS, consumer apps, and marketplace sectors. I have bootstrapped, raised funding for, and successfully exited multiple operations.
          </p>
          <p>
            My core operational focus is the <strong>first mile</strong> — the chaotic, undefined space between conceptualization and product-market fit. I strongly believe that the most effective founders operate simultaneously as designers, engineers, and sales personnel.
          </p>

          <VennDiagram />

          <div className="pt-10">
            <h2 className="text-[18px] font-semibold text-foreground mb-6">
              Psychometrics & Traits
            </h2>
            <BigFiveChart />
            <p className="mt-8 text-[14px] leading-[1.7] text-foreground/70">
              High conscientiousness and extraversion indicate a strong operational drive and team leadership capacity. Elevated agreeableness and openness suggest a collaborative approach to problem-solving and adaptability, while low neuroticism denotes stable execution under high-stress conditions.
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
