"use client";

import React, { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  chart: string;
  title: string;
}

export default function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    
    const renderDiagram = async () => {
      try {
        if (!(window as any).mermaid) {
          // Dynamically load mermaid if not present
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
          document.head.appendChild(script);
          
          await new Promise((resolve) => {
            script.onload = resolve;
          });
          
          (window as any).mermaid.initialize({ 
            startOnLoad: false,
            theme: 'dark',
            fontFamily: 'Inter, sans-serif'
          });
        }
        
        // Use a unique ID for the mermaid render
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await (window as any).mermaid.render(id, chart);
        
        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err: any) {
        console.error("Failed to render mermaid diagram", err);
        if (isMounted) {
          setError(err.message || "Invalid diagram syntax");
        }
      }
    };

    renderDiagram();
    
    return () => {
      isMounted = false;
    };
  }, [chart]);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20">
      <div className="w-full bg-black/40 px-6 py-4 flex items-center justify-between border-b border-white/10">
        <h3 className="text-xl font-medium text-white tracking-wide">{title}</h3>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
      </div>
      
      <div className="p-8 w-full min-h-[300px] flex items-center justify-center overflow-auto custom-scrollbar">
        {error ? (
          <div className="text-red-400 font-mono text-sm bg-red-500/10 p-4 rounded-lg">
            Error rendering diagram: {error}
          </div>
        ) : svgContent ? (
          <div 
            className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm font-medium animate-pulse">Generating Diagram...</p>
          </div>
        )}
      </div>
    </div>
  );
}
