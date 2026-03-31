"use client";

import { projects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ObjectBurst from "./animations/PrismaticBurst";
import { ParticlesBackground } from "./animations/particles-background";
import AnimatedLogo from "./animations/AnimatedLogo";

export default function ProjectGrid() {
  return (
    <div className="w-full py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              href={project.href}
              key={project.title}
              className={`group relative overflow-hidden rounded-[24px] block aspect-[4/3] ${
                project.title === "Neucler" ? "md:col-span-2 md:aspect-[2/1]" : ""
              }`}
            >
              {project.title === "Neucler" ? (
                <>
                  <div className="absolute inset-0 z-0 bg-black">
                    {/* Passing vibrant colors to PrismaticBurst on a black background */}
                    <ObjectBurst colors={['#FF5733', '#33FFCE', '#335BFF', '#F033FF']} />
                  </div>
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <img src="/Frame 79.png" alt="Neucler UI" className="w-[15%] md:w-[10%] h-auto object-contain" />
                  </div>
                </>
              ) : project.title === "Faeth Studio" ? (
                <>
                  <div className="absolute inset-0 z-0 bg-black/40" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-[0.4em] uppercase">
                    <div className="flex flex-col items-center gap-4">
                      <h3 className="text-[32px] sm:text-[48px] font-bold text-white mix-blend-difference">
                        FAETH STUDIO
                      </h3>
                      <div className="h-[1px] w-24 bg-white/30" />
                      <span className="text-[10px] text-white/50 tracking-[0.2em]">0-TO-1 DESIGN AGENCY</span>
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
              ) : project.title === "Arrive" ? (
                <div className="absolute inset-0 z-0">
                  <AnimatedLogo />
                </div>
              ) : (
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-20 scale-90 group-hover:scale-100">
                <ArrowUpRight className="w-5 h-5" />
              </div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end z-20 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2 font-mono uppercase tracking-widest">
                <div className="flex items-center gap-3 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-white/70 lowercase">
                      [{tag}]
                    </span>
                  ))}
                </div>
                <h3 className="text-[20px] sm:text-[24px] font-bold text-white leading-tight mb-2">{project.title}</h3>
                <p className="text-[12px] sm:text-[13px] text-white/80 leading-relaxed lowercase max-w-sm">
                  &gt; {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
