import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import ProjectCatalog from "@/components/ProjectCatalog";

export default function AboutPage() {
  return (
    <main className="min-h-screen max-w-[620px] mx-auto px-5 sm:px-6">
      <Header />
      <section className="pt-6 pb-40">
        <h1 className="text-[26px] sm:text-[30px] font-normal tracking-[0.01em] text-foreground mb-10">
          About
        </h1>

        <div className="space-y-5 text-[13.5px] leading-[1.7] text-muted">
          <p>
            I&apos;m <strong className="text-foreground font-medium">Aminul Islam</strong> — a product-focused founder who specializes in taking ideas from zero to one.
          </p>
          <p>
            Over the past four years, I&apos;ve founded and co-founded five companies across B2B SaaS, consumer apps, and marketplace products. I&apos;ve bootstrapped, raised, and sold. I&apos;ve hired my first employee, fired my first hire, and learned everything the hard way.
          </p>
          <p>
            My obsession is the <em>first mile</em> — the messy, exciting, undefined space between napkin sketch and product-market fit. I believe the best founders are equal parts designer, engineer, and salesperson.
          </p>
          <p>
            Currently available for advisory roles and angel investments.
          </p>
        </div>

        <div className="mt-14 pt-8 border-t border-border">
          <h2 className="text-[10.5px] font-medium tracking-[0.08em] uppercase text-muted mb-5">
            What I bring
          </h2>
          <div className="grid grid-cols-2 gap-y-3 gap-x-8">
            {[
              "0→1 Product Strategy",
              "Go-to-Market Execution",
              "Fundraising & Pitching",
              "Founding Team Building",
              "Growth & Distribution",
              "Technical Product Sense",
            ].map((skill) => (
              <div key={skill} className="flex items-center gap-2.5 text-[12.5px] text-foreground">
                <span className="w-1 h-1 rounded-full bg-foreground/30 flex-shrink-0" />
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
