"use client";

import { projects } from "@/lib/projects";
import Image from "next/image";

export default function VerticalProjectList() {
  const listProjects = projects.slice(0, 4);

  return (
    <section className="w-full bg-[#FAFAFA] py-32">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-32">
        {listProjects.map((project, index) => {
          return (
            <div 
              key={project.id} 
              className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
            >
              {/* Left Title */}
              <div className="w-full md:w-[200px] flex justify-start md:justify-end">
                <h2 className="text-[28px] md:text-[32px] font-medium tracking-tight text-black">
                  {project.title.toLowerCase()}
                </h2>
              </div>

              {/* Center Card */}
              <div className="w-full md:w-[500px] aspect-[4/3] bg-black rounded-[24px] relative overflow-hidden shadow-2xl flex-shrink-0">
                {/* Fallback styling for empty projects or placeholders */}
                {project.image ? (
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover opacity-80" 
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
              </div>

              {/* Right Description */}
              <div className="w-full md:w-[200px] flex justify-start">
                <p className="text-[13px] md:text-[14px] text-black/60 italic font-medium">
                  some text
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
