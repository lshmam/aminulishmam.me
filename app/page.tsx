"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsMasonry from "@/components/ProjectsMasonry";
import BottomDock from "@/components/BottomDock";
// import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <Header />
      </div>
      <Hero />
      <ProjectsMasonry />

      <BottomDock />
    </main>
  );
}
