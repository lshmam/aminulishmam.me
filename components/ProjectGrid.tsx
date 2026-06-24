"use client";

import { projects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import ObjectBurst from "./animations/PrismaticBurst";
import { ParticlesBackground } from "./animations/particles-background";
import { useRef } from "react";

export default function ProjectGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || window.innerWidth * 0.7;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || window.innerWidth * 0.7;
      scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
    }
  };

  return (
    <div className="w-full py-6 md:py-12">
      {/* Header and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 flex items-end justify-between">
        <h2 className="text-[20px] sm:text-[28px] font-bold text-foreground flex items-center gap-4 uppercase font-mono tracking-widest">
          <span className="w-2.5 h-4 bg-foreground animate-pulse" />
          CASE STUDIES
        </h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/50 transition-colors"
            aria-label="Previous project"
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/50 transition-colors"
            aria-label="Next project"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Full Bleed Carousel Container */}
      <div 
        ref={scrollRef}
        className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 px-4 sm:px-[max(1.5rem,calc((100vw-80rem)/2))] pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {projects.map((project) => (
          <Link
            href={project.href}
            key={project.title}
            className="group relative overflow-hidden rounded-[24px] block shrink-0 snap-center w-[85vw] md:w-[75vw] max-w-[1100px] aspect-[4/3] md:aspect-[16/9]"
          >
            {project.title === "Neucler" ? (
              <>
                <div className="absolute inset-0 z-0 bg-black">
                  <ObjectBurst colors={['#FF5733', '#33FFCE', '#335BFF', '#F033FF']} />
                </div>
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                  <img src="/Frame 79.png" alt="Neucler UI" className="w-[15%] md:w-[10%] h-auto object-contain" />
                </div>
              </>
            ) : project.title === "Faeth Studio" ? (
              <>
                <div className="absolute inset-0 z-0 bg-black" />
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-[0.4em] uppercase">
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-[32px] sm:text-[48px] font-bold text-white mix-blend-difference text-center">
                      FAETH STUDIO
                    </h3>
                    <div className="h-[1px] w-24 bg-white/30" />
                    <span className="text-[10px] sm:text-[12px] text-white/50 tracking-[0.2em] text-center">0-TO-1 DESIGN AGENCY</span>
                  </div>
                </div>
              </>
            ) : project.title === "Jim Coach" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-right transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              >
                <source src="/jim-box.mp4" type="video/mp4" />
              </video>
            ) : project.title === "MyTrials" ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              >
                <source src="/MyTrials.ai Commercial.mp4" type="video/mp4" />
              </video>
            ) : project.title === "Neta Bridge" ? (
              <>
                <div className="absolute inset-0 z-0 bg-black">
                  <ParticlesBackground id="neta-particles" />
                </div>
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-widest uppercase">
                  <h3 className="text-[28px] sm:text-[36px] font-bold text-white mix-blend-difference">
                    NETABRIDGE
                  </h3>
                </div>
              </>
            ) : (
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

            {/* Hover Arrow */}
            <div className="absolute top-6 sm:top-8 right-6 sm:right-8 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-20 scale-90 group-hover:scale-100">
              <ArrowUpRight className="w-5 h-5" />
            </div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 flex flex-col justify-end z-20 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2 font-mono uppercase tracking-widest">
              <div className="hidden sm:flex items-center gap-3 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold text-white/70 lowercase bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                    [{tag}]
                  </span>
                ))}
              </div>
              <h3 className="text-[20px] sm:text-[32px] font-bold text-white leading-tight mb-2 sm:mb-3">{project.title}</h3>
              <p className="text-[12px] sm:text-[14px] text-white/80 leading-relaxed lowercase max-w-lg">
                &gt; {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
