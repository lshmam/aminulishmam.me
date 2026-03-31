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
    <div className="mt-24 pt-10 border-t border-foreground/10 font-mono uppercase tracking-widest">
      <h2 className="text-[20px] sm:text-[28px] font-bold text-foreground mb-12 flex items-center gap-4">
        <span className="w-2.5 h-4 bg-foreground animate-pulse" />
        PROJECT LOG
      </h2>
      
      {/* Timeline Container */}
      <div className="relative pr-2 sm:pr-4">
        {/* Continuous Line */}
        <div className="absolute left-[13px] top-2 bottom-4 w-[1px] bg-foreground/20" />
        
        <div className="space-y-10 relative pb-4">
          {catalogItems.map((item) => (
            <div key={item.id} className="relative pl-12">
              {/* Timeline Node / Number — Military Box */}
              <div 
                className="absolute left-[0px] top-[2px] bg-foreground px-1.5 py-[2px] z-10 shadow-sm"
              >
                <span className="text-[10px] sm:text-[11px] font-bold text-background leading-none block">
                  {String(item.id).padStart(3, '0')}
                </span>
              </div>
              
              <div className="flex flex-col group cursor-default">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                  <h3 className="text-foreground text-[14px] sm:text-[15px] font-bold tracking-widest group-hover:text-foreground/80 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-foreground/50 tracking-widest">
                    [{item.year}]
                  </span>
                </div>
                <p className="text-foreground/70 text-[12px] sm:text-[13px] leading-relaxed tracking-wider lowercase">
                  &gt; {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
