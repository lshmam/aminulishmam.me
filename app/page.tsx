"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsMasonry from "@/components/ProjectsMasonry";

// import VoiceAgent from "@/components/VoiceAgent";
// import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Gradient Image behind Hero */}
      <div
        className="absolute top-0 left-0 right-0 h-[800px] -z-10 pointer-events-none opacity-100"
        style={{
          backgroundImage: "url('/bg-gradient.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat"
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <Header theme="dark" />
      </div>
      <Hero />
      <ProjectsMasonry />


      {/* Voice Agent UI */}
      {/* <div className="fixed inset-0 pointer-events-none z-50">
        <VoiceAgent />
      </div> */}
    </main>
  );
}
