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
      <section className="pt-6 pb-40">
        <h1 
          className="text-3xl sm:text-4xl font-serif text-foreground mb-4 leading-tight"
          style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}
        >
          Project Catalog
        </h1>
        <p className="text-[15px] sm:text-[16px] text-foreground/70 mb-12">
          A complete operational log — all ventures, experiments, and deployments.
        </p>
        <ProjectCatalog />
      </section>
      <BottomDock />
    </main>
  );
}
