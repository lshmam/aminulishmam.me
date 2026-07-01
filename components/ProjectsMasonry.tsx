"use client";

import { projects } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ObjectBurst from "./animations/PrismaticBurst";
import { ParticlesBackground } from "./animations/particles-background";

function CardMedia({ project }: { project: (typeof projects)[number] }) {
  if (project.title === "Neucler") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black">
          <ObjectBurst colors={["#FF5733", "#33FFCE", "#335BFF", "#F033FF"]} />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img
            src="/Frame 79.png"
            alt="Neucler UI"
            className="w-[15%] md:w-[10%] h-auto object-contain"
          />
        </div>
      </>
    );
  }
  if (project.title === "Faeth Studio") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black" />
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-[0.4em] uppercase">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <h3 className="text-[24px] sm:text-[36px] md:text-[48px] font-bold text-white mix-blend-difference text-center">
              FAETH STUDIO
            </h3>
            <div className="h-[1px] w-16 sm:w-24 bg-white/30" />
            <span className="text-[9px] sm:text-[12px] text-white/50 tracking-[0.2em] text-center">
              0-TO-1 DESIGN AGENCY
            </span>
          </div>
        </div>
      </>
    );
  }
  if (project.title === "Jim Coach") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover object-right transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
      >
        <source src="/jim-box.mp4" type="video/mp4" />
      </video>
    );
  }
  if (project.title === "MyTrials") {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
      >
        <source src="/MyTrials.ai Commercial.mp4" type="video/mp4" />
      </video>
    );
  }
  if (project.title === "Neta Bridge") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black">
          <ParticlesBackground id="neta-particles" />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-widest uppercase">
          <h3 className="text-[22px] sm:text-[28px] md:text-[36px] font-bold text-white mix-blend-difference">
            NETABRIDGE
          </h3>
        </div>
      </>
    );
  }
  return (
    <Image
      src={project.image || "/placeholder.svg"}
      alt={project.title}
      fill
      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
    />
  );
}

function ProjectCard({
  project,
  className = "",
}: {
  project: (typeof projects)[number];
  className?: string;
}) {
  return (
    <Link
      href={project.href}
      className={`group relative overflow-hidden rounded-[18px] sm:rounded-[24px] block ${className}`}
    >
      <CardMedia project={project} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none z-20" />

      {/* Hover arrow — hidden on touch, visible on hover for pointer devices */}
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-30 scale-90 group-hover:scale-100">
        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 w-full p-5 sm:p-7 md:p-10 flex flex-col justify-end z-30 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2 font-mono uppercase tracking-widest">
        <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] sm:text-[10px] font-bold text-white/70 lowercase bg-black/30 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-md"
            >
              [{tag}]
            </span>
          ))}
        </div>
        <h3 
          className="text-[20px] sm:text-[28px] md:text-[36px] font-normal normal-case tracking-normal text-white leading-tight mb-1 sm:mb-2 md:mb-3 font-serif"
          style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}
        >
          {project.title}
        </h3>
        <p className="text-[11px] sm:text-[13px] md:text-[14px] text-white/80 leading-relaxed lowercase max-w-lg">
          &gt; {project.description}
        </p>
      </div>
    </Link>
  );
}

export default function ProjectsMasonry() {
  const [neucler, ...rest] = projects;
  const row2 = rest.slice(0, 2);
  const row3 = rest.slice(2, 4);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 pb-24 flex flex-col gap-3 sm:gap-4 md:gap-5">
      {/* Row 1: Neucler — full width */}
      <ProjectCard
        project={neucler}
        className="w-full aspect-[4/3] sm:aspect-[16/8] md:aspect-[16/7]"
      />

      {/* Row 2: 2 columns (stacks to 1 on small mobile) */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        {row2.map((p) => (
          <ProjectCard key={p.id} project={p} className="aspect-[4/3]" />
        ))}
      </div>

      {/* Row 3: 2 columns (stacks to 1 on small mobile) */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        {row3.map((p) => (
          <ProjectCard key={p.id} project={p} className="aspect-[4/3]" />
        ))}
      </div>
    </section>
  );
}
