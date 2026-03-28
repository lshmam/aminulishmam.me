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
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <h3 className="text-4xl font-semibold text-white tracking-tighter mix-blend-difference">
                      NetaBridge
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
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end z-20 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                <div className="flex items-center gap-3 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] tracking-[0.08em] uppercase font-medium text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-[-0.02em]">{project.title}</h3>
                <p className="text-[15px] sm:text-[16px] text-white/70 mt-2 font-light max-w-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
