"use client";
import React, { useEffect, useState, useRef } from 'react';
import { projects } from '@/lib/projects';
import Image from 'next/image';

interface ProjectCardViewerProps {
  slug: string;
  onNarrationRequest?: (text: string) => void;
  onClose?: () => void;
}

export default function ProjectCardViewer({ slug, onNarrationRequest, onClose }: ProjectCardViewerProps) {
  const project = projects.find(p => p.slug === slug);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const narratedProjectRef = useRef<string | null>(null);

  useEffect(() => {
    if (project && narratedProjectRef.current !== project.slug) {
      narratedProjectRef.current = project.slug;
      if (onNarrationRequest) {
        onNarrationRequest(`I am now looking at the project ${project.title}. It has ${project.sections.length} sections. Please read the sections data and use change_project_view to navigate through the sections one by one as you narrate the project.`);
      }
    }
  }, [slug, project, onNarrationRequest]);

  useEffect(() => {
    const handleProjectAction = (e: any) => {
      if (e.detail) {
        if (typeof e.detail.sectionIndex === 'number') {
          setSectionIndex(Math.max(0, Math.min(e.detail.sectionIndex, (project?.sections.length || 1) - 1)));
          setImageIndex(0);
        }
        if (typeof e.detail.imageIndex === 'number') {
          const sec = project?.sections[sectionIndex];
          if (sec) {
            setImageIndex(Math.max(0, Math.min(e.detail.imageIndex, (sec.images?.length || 1) - 1)));
          }
        }
      }
    };
    window.addEventListener('project-action', handleProjectAction);
    return () => window.removeEventListener('project-action', handleProjectAction);
  }, [project, sectionIndex]);

  if (!project) return null;

  const currentSection = project.sections[sectionIndex];
  // Fallback to project image if section has no images
  const currentImage = (currentSection?.images && currentSection.images.length > 0) 
    ? currentSection.images[imageIndex] 
    : project.image;

  return (
    <div className="fixed inset-0 bg-[#f8f9fa] z-[80] flex flex-col items-center justify-start pointer-events-auto p-4 md:p-8 pt-24 pb-32 overflow-y-auto font-sans">
      
      {/* Back button overlay */}
      <button 
        onClick={() => {
          if (onClose) onClose();
          else window.dispatchEvent(new CustomEvent('project-action', { detail: { action: 'close' } }));
        }}
        className="absolute top-6 left-6 md:left-12 px-4 py-2 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 text-sm font-medium z-[100] transition-colors pointer-events-auto"
      >
        ← Back
      </button>

      {/* Wrapper to keep gaps perfectly consistent */}
      <div className="w-full max-w-[1440px] flex flex-col gap-8 h-full min-h-0">
        
        {/* Top Pill Navigation */}
        <div className="pointer-events-auto shrink-0 flex w-full bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[1.5rem] p-2 overflow-x-auto hide-scrollbar">
        {project.sections.map((sec, idx) => (
          <button
            key={idx}
            onClick={() => { setSectionIndex(idx); setImageIndex(0); }}
            className={`px-5 py-2 rounded-full font-medium transition-colors text-sm whitespace-nowrap
              ${idx === sectionIndex ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`}
          >
            {idx === 0 && <span className="font-bold mr-2 text-black capitalize">{project.slug.replace('-', ' ')}</span>}
            {sec.label.toLowerCase()}
          </button>
        ))}
        </div>
  
        {/* Main Content Area */}
        <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 items-stretch pointer-events-auto min-h-0">
        
        {/* Left Side: Main Image */}
        <div className="flex-[2] relative rounded-3xl overflow-hidden bg-white shadow-2xl border border-gray-200 min-h-0">
          {currentImage && (
            <Image 
              src={currentImage} 
              alt={currentSection?.label || project.title}
              fill
              className="object-cover md:object-contain bg-gray-50"
              unoptimized
            />
          )}
          
          {/* Manual Image Navigation */}
          {currentSection?.images && currentSection.images.length > 1 && (
            <div className="absolute bottom-6 right-6 flex gap-2">
               <button 
                  onClick={() => setImageIndex(i => Math.max(0, i - 1))} 
                  className="bg-black/60 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-lg"
               >
                  &lt;
               </button>
               <button 
                  onClick={() => setImageIndex(i => Math.min(currentSection.images.length - 1, i + 1))} 
                  className="bg-black/60 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-lg"
               >
                  &gt;
               </button>
            </div>
          )}
        </div>

        {/* Right Side: Static Description Box */}
        <div className="flex-1 bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 overflow-y-auto min-h-0">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{currentSection?.heading || project.title}</h3>
          <div className="w-12 h-1 bg-black mb-6"></div>
          <p className="text-base md:text-lg leading-relaxed text-gray-600">
            {currentSection?.body || project.description}
          </p>
          </div>
  
        </div>
      </div>
    </div>
  );
}
