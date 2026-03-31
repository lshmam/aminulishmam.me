import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import ProjectCatalog from "@/components/ProjectCatalog";
import VennDiagram from "@/components/VennDiagram";

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

        <ProjectCatalog />
      </section>
      <BottomDock />
    </main>
  );
}
