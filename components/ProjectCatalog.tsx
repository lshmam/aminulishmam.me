"use client";

import React from "react";

const catalogItems = [
  { id: 1, title: "Polar Bear Run", subtitle: "Endless runner mobile game", year: "2019" },
  { id: 2, title: "FoodShare", subtitle: "Community food surplus sharing platform", year: "2019" },
  { id: 3, title: "Ouroboros", subtitle: "Circular economy tracking tool", year: "2020" },
  { id: 4, title: "FloFinder", subtitle: "Enterprise workflow optimization software", year: "2021" },
  { id: 5, title: "Aero Fridge", subtitle: "Smart refrigerator inventory management", year: "2021" },
  { id: 6, title: "Simply Balanced", subtitle: "Personal finance and budgeting app", year: "2022" },
  { id: 7, title: "MyTrials", subtitle: "Clinical trial patient matching system", year: "2023" },
  { id: 8, title: "Faeth Studio", subtitle: "Creative design agency portfolio", year: "2024" },
  { id: 9, title: "Jim Coach", subtitle: "AI-powered personal fitness trainer", year: "2025" },
  { id: 10, title: "Neucler", subtitle: "Automated B2B CRM and pipeline manager", year: "2025" },
  { id: 11, title: "Arrive", subtitle: "Next-gen travel logistics platform", year: "2026" },
  { id: 12, title: "Netabridge", subtitle: "B2B Trade Network Marketplace", year: "2026" },
];

export default function ProjectCatalog() {
  return (
    <div className="mt-16 pt-8 border-t border-border">
      <h2 className="text-[10.5px] font-medium tracking-[0.08em] uppercase text-muted mb-8">
        Project Catalog
      </h2>
      
      {/* Timeline Container */}
      <div className="relative pr-2 sm:pr-4">
        {/* Continuous Line */}
        <div className="absolute left-[13px] top-2 bottom-4 w-[1px] bg-border" />
        
        <div className="space-y-8 relative pb-4">
          {catalogItems.map((item) => (
            <div key={item.id} className="relative pl-10">
              {/* Timeline Node / Number */}
              <div 
                className="absolute left-[3px] top-[2px] w-[21px] h-[21px] rounded-full bg-background border border-border flex items-center justify-center z-10 shadow-sm"
              >
                <span className="text-[9px] font-mono font-medium text-foreground">{item.id}</span>
              </div>
              
              <div className="flex flex-col group cursor-default">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-foreground text-[14px] font-medium tracking-tight group-hover:text-foreground/80 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-muted font-mono bg-foreground/[0.04] border border-foreground/[0.05] px-2 py-0.5 rounded-full">
                    {item.year}
                  </span>
                </div>
                <p className="text-muted text-[13px] leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
