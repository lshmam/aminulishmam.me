import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import BottomDock from "@/components/BottomDock";

export default function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-6 sm:px-12">
      <Header />
      <Hero />
      <ProjectGrid />
      <BottomDock />
    </main>
  );
}
