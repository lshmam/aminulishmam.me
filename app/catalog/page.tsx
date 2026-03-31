import Header from "@/components/Header";
import BottomDock from "@/components/BottomDock";
import ProjectCatalog from "@/components/ProjectCatalog";

export const metadata = {
  title: "Catalog — Aminul Islam",
  description: "All projects, experiments, and ventures — a complete project log.",
};

export default function CatalogPage() {
  return (
    <main className="min-h-screen max-w-[620px] mx-auto px-5 sm:px-6">
      <Header />
      <section className="pt-6 pb-40 font-mono uppercase tracking-widest">
        <h1 className="text-[20px] sm:text-[28px] font-bold text-foreground mb-4 flex items-center gap-4">
          <span className="w-2.5 h-4 bg-foreground animate-pulse" />
          PROJECT CATALOG
        </h1>
        <p className="text-[13px] text-foreground/50 lowercase tracking-wider mb-12">
          &gt; complete operational log — all ventures, experiments, and deployments.
        </p>
        <ProjectCatalog />
      </section>
      <BottomDock />
    </main>
  );
}
