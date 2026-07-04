"use client";

import React from "react";

const catalogItems = [
  { id: 1, title: "Polar Bear Run", subtitle: "Endless runner mobile game", year: "2019" },
  { id: 2, title: "FoodShare", subtitle: "Community food surplus sharing platform", year: "2019" },
  { id: 3, title: "Ouroboros", subtitle: "Wrist based Oxygen monitor for patients with Covid", year: "2020", link: "https://devpost.com/software/ouroboros-fynt7u", youtube: "https://www.youtube.com/embed/6Q2t_e_E-7U?si=K5vV53Rzsm2dK6Gp" },
  { id: 4, title: "FloFinder", subtitle: "Attention management for people with ADHD", year: "2021", link: "https://drive.google.com/file/d/1OpYwh1S-USPLY5Ow20hwGp5815dt58Tr/view?usp=sharing", image: "/BMEG 401 Group 1_page-0001.jpg" },
  { id: 5, title: "Aero Fridge", subtitle: "Smart refrigerator for Covid vaccines", year: "2021", image: "/assemblyexploded.PNG" },
  { id: 6, title: "Simply Balanced", subtitle: "Tool to track sinus rinses", year: "2022", embed: "https://drive.google.com/file/d/10H6maqXwvUWtRK97kz35E6cylCe6yBgO/preview" },
  { id: 7, title: "MyTrials", subtitle: "Clinical trial patient matching system", year: "2023", link: "/work/mytrials" },
  { id: 8, title: "Faeth Studio", subtitle: "Creative design agency portfolio", year: "2024", link: "/work/faeth-studio" },
  { id: 9, title: "Jim Coach", subtitle: "AI-powered personal fitness trainer", year: "2025", link: "/work/jim-coach" },
  { id: 10, title: "Neucler", subtitle: "Sales Copilot for Receptionists", year: "2025 - Present", link: "/work/neucler" },
  { id: 11, title: "Arrive", subtitle: "AirBnB for parking", year: "2026" },
  { id: 12, title: "Netabridge", subtitle: "B2B Trade Network Marketplace", year: "2026 - Present", link: "/work/neta-bridge" },
];

export default function ProjectCatalog() {
  return (
    <div className="mt-16 pt-10 border-t border-foreground/10">

      {/* Timeline Container */}
      <div className="relative pr-2 sm:pr-4">
        {/* Continuous Line */}
        <div className="absolute left-[13px] top-2 bottom-4 w-[1px] bg-foreground/20" />

        <div className="space-y-10 relative pb-4">
          {catalogItems.map((item: any) => (
            <div key={item.id} className="relative pl-12">
              {/* Timeline Node / Number — Military Box */}
              <div
                className="absolute left-[0px] top-[2px] bg-foreground px-2 py-0.5 z-10 shadow-sm rounded"
              >
                <span className="text-[12px] font-bold text-background leading-none block">
                  {item.id}
                </span>
              </div>

              <div className="flex flex-col group cursor-default">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                  <h3 className="text-foreground text-[16px] sm:text-[18px] font-semibold group-hover:text-foreground/80 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[13px] text-foreground/50">
                    {item.year}
                  </span>
                </div>
                <p className="text-foreground/70 text-[14px] leading-relaxed">
                  {item.subtitle}
                </p>

                {item.image && (
                  <div className="mt-4 mb-1 w-full max-w-sm border border-foreground/10 p-1 opacity-90 transition-opacity hover:opacity-100 mix-blend-multiply sm:mix-blend-normal bg-white/5">
                    <img 
                      src={item.image} 
                      alt={`${item.title} Preview`} 
                      className="w-full h-auto grayscale-[15%]"
                    />
                  </div>
                )}

                {item.youtube && (
                  <div className="mt-4 mb-1 w-full max-w-sm aspect-video border border-foreground/10 p-1 opacity-90 transition-opacity hover:opacity-100 mix-blend-multiply sm:mix-blend-normal bg-white/5">
                    <iframe 
                      src={item.youtube} 
                      title={`${item.title} Video`} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      className="w-full h-full grayscale-[15%]"
                    />
                  </div>
                )}

                {item.embed && (
                  <div className="mt-4 mb-1 w-full max-w-sm aspect-video border border-foreground/10 p-1 opacity-90 transition-opacity hover:opacity-100 mix-blend-multiply sm:mix-blend-normal bg-white/5 overflow-hidden">
                    <iframe 
                      src={item.embed} 
                      title={`${item.title} Embed`} 
                      width="100%" 
                      height="100%" 
                      className="w-full h-full grayscale-[15%] pointer-events-none"
                    />
                  </div>
                )}



                {(item.link || item.gbp) && (
                  <div className="mt-3 flex flex-wrap gap-4">
                    {item.link && (
                      item.link.startsWith('/work/') ? (
                        <a 
                          href={item.link} 
                          className="inline-flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 px-4 py-2 text-[12px] font-medium text-foreground transition-all hover:gap-3 group/btn rounded-md"
                        >
                          View Project
                          <span className="text-[14px] leading-none text-foreground/40 group-hover/btn:text-foreground">→</span>
                        </a>
                      ) : (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground text-[13px] underline underline-offset-2 inline-block w-fit mt-2">
                          View project source
                        </a>
                      )
                    )}
                    {item.gbp && (
                      <a href={item.gbp} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground text-[13px] underline underline-offset-2 inline-block w-fit mt-2">
                        View Google Business Profile
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
