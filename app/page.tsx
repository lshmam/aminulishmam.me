import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import BottomDock from "@/components/BottomDock";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header />
      </div>
      <ProjectGrid />
      <BottomDock />
    </main>
  );
}
