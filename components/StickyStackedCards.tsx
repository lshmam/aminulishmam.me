"use client";

import { projects } from "@/lib/projects";
import Image from "next/image";

export default function StickyStackedCards() {
  const stackProjects = projects.slice(0, 4);

  return (
    <section className="relative w-full bg-[#FAFAFA] pt-32 pb-64">
      {/* Side Typography - Sticky */}
      <div className="sticky top-[50vh] w-full max-w-[1200px] mx-auto px-8 md:px-12 flex justify-between pointer-events-none z-0 h-0 overflow-visible">
        <span className="text-sm tracking-wider text-black font-medium -translate-y-1/2 block">
          Visual
        </span>
        <span className="text-sm tracking-wider text-black font-medium -translate-y-1/2 block">
          Experiments
        </span>
      </div>

      {/* Cards Stack */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto -mt-[20vh] px-4 sm:px-8">
        {stackProjects.map((project, index) => {
          return (
            <div key={project.id} className="h-[120vh] w-full flex justify-center items-start">
              <div
                className="sticky shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-[#F4F4F4] flex flex-col items-center p-6 md:p-12 border border-black/[0.03]"
                style={{
                  top: `calc(15vh + ${index * 30}px)`, // Stacks slightly lower each time
                  width: "100%",
                  aspectRatio: "1.1 / 1",
                  maxWidth: "520px",
                }}
              >
                <div className="w-full relative flex-1 mb-8 shadow-sm">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-black/80 font-medium tracking-wide text-[13px] md:text-sm mb-2">
                  {project.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
