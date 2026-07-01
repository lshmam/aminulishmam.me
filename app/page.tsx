import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsMasonry from "@/components/ProjectsMasonry";
import Footer from "@/components/Footer";
import BottomDock from "@/components/BottomDock";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <Header />
      </div>
      <Hero />
      <ProjectsMasonry />
      <Footer />
      <BottomDock />
    </main>
  );
}
