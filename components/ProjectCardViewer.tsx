import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import projectNarration from '@/data/project-narration.json';
import projectImages from '@/data/project-images.json';

interface ProjectCardViewerProps {
  slug: string;
  onNarrationRequest: (text: string) => void;
}

export default function ProjectCardViewer({ slug, onNarrationRequest }: ProjectCardViewerProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // Extract content
  const narrationData = (projectNarration as any)[slug] || { intro: "Overview", points: ["Details here."], outro: "Conclusion" };
  const imagesData = (projectImages as any)[slug] || (projectImages as any)['default'];

  // Build slides from narration data
  const slides = [
    { text: narrationData.intro, image: imagesData[0]?.path },
    ...(narrationData.points || []).map((pt: string, i: number) => ({ text: pt, image: imagesData[i+1]?.path || imagesData[0]?.path })),
    { text: narrationData.outro, image: imagesData[imagesData.length - 1]?.path }
  ].filter(s => s.text); // remove empty slides

  useEffect(() => {
    // Narrate first slide automatically when opened
    if (slides[0]) {
      onNarrationRequest(`I am now looking at a slide that says: "${slides[0].text}". Please narrate it to me as if you are presenting it.`);
    }
  }, [slug]);

  const handleNext = () => {
    const nextIndex = Math.min(slideIndex + 1, slides.length - 1);
    setSlideIndex(nextIndex);
    if (slides[nextIndex]) {
      onNarrationRequest(`I am now looking at a slide that says: "${slides[nextIndex].text}". Please briefly narrate it.`);
    }
  };

  return (
    <div className="relative w-[750px] xl:w-[850px] h-[550px]">
      <h2 className="text-center font-medium text-3xl tracking-wide uppercase text-gray-900 mb-8 px-8 py-3 rounded-full">
        {slug.replace('-', ' ')}
      </h2>

      <div className="relative w-full h-[460px]">
        {/* Render stacked cards */}
        <AnimatePresence>
          {slides.map((slide, i) => {
            if (i < slideIndex) return null; // past slides
            
            const isFront = i === slideIndex;
            const offset = (i - slideIndex) * 16; // 0, 16, 32...

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ 
                  opacity: 1 - (i - slideIndex) * 0.15, 
                  y: offset, 
                  scale: 1 - (i - slideIndex) * 0.05,
                  zIndex: 10 - i
                }}
                exit={{ opacity: 0, x: -100, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute top-0 left-0 w-full h-full bg-[#a3a3a3] rounded-[1.5rem] shadow-2xl p-6 flex flex-col"
              >
                <div className="flex flex-1 gap-8 h-[300px]">
                  {/* Left: Image Box */}
                  <div className="w-1/2 bg-white rounded-xl shadow-inner overflow-hidden flex items-center justify-center">
                    {slide.image ? (
                      <img src={slide.image} alt="Project visual" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 animate-pulse" />
                    )}
                  </div>
                  {/* Right: Text Content */}
                  <div className="w-1/2 text-gray-900 font-medium text-[17px] leading-relaxed pr-2 overflow-y-auto pt-2">
                    {slide.text}
                  </div>
                </div>

                {/* Bottom NEXT Button */}
                {isFront && i < slides.length - 1 && (
                  <div className="mt-auto flex justify-end pb-2">
                    <button 
                      onClick={handleNext}
                      className="bg-[#1c1c1c] text-white flex items-center gap-3 px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors shadow-md active:scale-95 tracking-widest text-sm"
                    >
                      <Volume2 size={18} />
                      NEXT
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
