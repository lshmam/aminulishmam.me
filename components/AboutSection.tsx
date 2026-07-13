"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <>
    {/* ── About Content ── */}
    <section className="relative z-10 w-full bg-[#FAFAFA] pb-32">
      <div className="max-w-[500px] mx-auto px-6 font-sans text-[13px] md:text-[14px] leading-[1.6] text-black pb-32">
        <h2 className="text-center text-[20px] md:text-[24px] font-medium mb-8 text-black">
          A little about me
        </h2>
        
        <div className="space-y-4 text-left text-black/80 font-medium">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>

        <div className="w-full max-w-[300px] mx-auto mt-16 aspect-[3/4] relative overflow-hidden bg-zinc-200">
           <Image 
              src="/project-saas.png" 
              alt="Portrait" 
              fill 
              className="object-cover" 
           />
        </div>
      </div>
    </section>

    {/* ── Footer with ani-2 Background ── */}
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: "200vh",
        backgroundColor: "#FAFAFA",
      }}
    >
      {/* ani-2 background image with top fade */}
      <div
        style={{
          position: "absolute",
          inset: -50,
          backgroundImage: "url('/ani-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          zIndex: 0,
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 100%)",
        }}
      />

      {/* Text over the aura */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto px-6 mb-auto pt-32 text-white/90 text-[13px] md:text-[14px] leading-[1.6] space-y-8 text-center font-medium">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      {/* Footer */}
      <footer className="w-full bg-transparent pb-0 overflow-hidden relative z-10">
        <div
          className="w-full px-4 sm:px-8 md:px-12 flex flex-col items-center text-white"
          style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          <div className="w-full pb-6 sm:pb-8 pt-12 border-t border-white/20 flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
            <div className="flex flex-col">
              <p className="text-[14px] sm:text-[15px] font-medium text-white">Aminul Islam Ishmam</p>
              <p className="text-[14px] sm:text-[15px] text-white/80 leading-tight mt-1">
                Product Designer & Engineer<br />
                with a focus on 0-to-1<br />
                Product Development.
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-[14px] sm:text-[15px] font-medium text-white mb-1">Contact</p>
              <Link href="mailto:ishmam.aminul@gmail.com" className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4">
                ishmam.aminul@gmail.com
              </Link>
              <p className="text-[14px] sm:text-[15px] text-white/80 mt-1">Vancouver, British Columbia</p>
            </div>
            <div className="flex flex-col">
              <p className="text-[14px] sm:text-[15px] font-medium text-white mb-1">Social</p>
              <Link href="https://github.com/lshmam" target="_blank" className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4">
                GitHub
              </Link>
              <Link href="https://www.linkedin.com/in/aminulishmam/" target="_blank" className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4 mt-1">
                LinkedIn
              </Link>
            </div>
            <div className="flex flex-col">
              <p className="text-[14px] sm:text-[15px] font-medium text-white mb-1">Imprint</p>
              <Link href="#" className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4">Privacy Policy</Link>
              <Link href="#" className="text-[14px] sm:text-[15px] text-white/80 hover:text-white transition-colors duration-200 underline decoration-1 underline-offset-4 mt-1">Terms</Link>
              <span className="text-[14px] sm:text-[15px] text-white/80 mt-1">&copy; 2026</span>
            </div>
          </div>
          <div className="w-full pb-2 sm:pb-4 pt-0 flex justify-center overflow-hidden">
            <p
              className="whitespace-nowrap select-none pointer-events-none text-center"
              style={{
                fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(70px, 19vw, 255px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "white",
                opacity: 0.9,
              }}
            >
              Aminul Islam
            </p>
          </div>
        </div>
      </footer>
    </section>
    </>
  );
}
