"use client";

import { useRef, useState, useEffect } from "react";
import { useAnimationFrame, useInView, AnimatePresence } from "framer-motion";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { projects } from "@/lib/projects";
import ObjectBurst from "@/components/animations/PrismaticBurst";
import { ParticlesBackground } from "@/components/animations/particles-background";
// import VoiceAgent from "@/components/VoiceAgent";
import ProjectCardViewer from "@/components/ProjectCardViewer";
import MermaidDiagram from "@/components/MermaidDiagram";
import LandingFooter from "@/components/LandingFooter";

// ── About Card Stack Component ──
function AboutCardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Card 1: Static base card
  
  // Card 2: Slides down from top and rotates slightly
  const card2Y = useTransform(scrollYProgress, [0, 0.4], [-200, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0, 0.1, 0.4], [0, 1, 1]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.4], [-15, -4]);

  // Card 3: Slides down from top and rotates opposite way
  const card3Y = useTransform(scrollYProgress, [0.4, 0.8], [-200, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 1, 1]);
  const card3Rotate = useTransform(scrollYProgress, [0.4, 0.8], [15, 4]);

  return (
    <div ref={containerRef} className="w-full aspect-square md:aspect-[4/5] relative flex items-center justify-center">
      {/* Base Card */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-zinc-900 rounded-[24px] overflow-hidden shadow-2xl origin-bottom"
      >
        <Image src="/project-brand.png" alt="Portrait 1" fill className="object-cover opacity-60" />
      </motion.div>

      {/* Card 2 */}
      <motion.div 
        style={{ y: card2Y, opacity: card2Opacity, rotate: card2Rotate }}
        className="absolute inset-0 w-full h-full bg-zinc-800 rounded-[24px] overflow-hidden shadow-2xl origin-bottom"
      >
        <Image src="/project-app.png" alt="Portrait 2" fill className="object-cover opacity-70" />
      </motion.div>

      {/* Card 3 */}
      <motion.div 
        style={{ y: card3Y, opacity: card3Opacity, rotate: card3Rotate }}
        className="absolute inset-0 w-full h-full bg-zinc-700 rounded-[24px] overflow-hidden shadow-2xl origin-bottom"
      >
        <Image src="/project-saas.png" alt="Portrait 3" fill className="object-cover opacity-80" />
      </motion.div>
    </div>
  );
}

// ── Call Widget Component ──
function CallWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-30% 0px -30% 0px" });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setExpanded(true), 600);
      return () => clearTimeout(timer);
    } else {
      setExpanded(false);
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="flex items-center justify-center w-full h-full">
      <motion.div
        layout
        initial={{ borderRadius: 64, width: 64, height: 64, opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.8,
          width: expanded ? 320 : 64,
          borderRadius: expanded ? 40 : 64,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-[#1c1c1e] flex items-center p-2 overflow-hidden shadow-2xl"
      >
        <motion.div layout className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500" />
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between flex-1 ml-4 mr-1 whitespace-nowrap"
            >
              <div className="flex flex-col justify-center">
                <span className="text-white/50 text-[11px] uppercase tracking-wider font-semibold leading-tight">Hey</span>
                <span className="text-white font-medium text-[15px] leading-tight">I'm Aminul</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                  <X className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#34c759] flex items-center justify-center shadow-lg">
                  <Phone className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ── Exact same CardMedia from ProjectsMasonry ──
function CardMedia({ project }: { project: (typeof projects)[number] }) {
  if (project.title === "Neucler") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black">
          <ObjectBurst colors={["#FF5733", "#33FFCE", "#335BFF", "#F033FF"]} />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <img src="/Frame 79.png" alt="Neucler UI" className="w-[30%] h-auto object-contain" />
        </div>
      </>
    );
  }
  if (project.title === "Faeth Studio") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black" />
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-[0.4em] uppercase">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-[28px] font-bold text-white mix-blend-difference text-center">FAETH STUDIO</h3>
            <div className="h-[1px] w-16 bg-white/30" />
            <span className="text-[10px] text-white/50 tracking-[0.2em] text-center">0-TO-1 DESIGN AGENCY</span>
          </div>
        </div>
      </>
    );
  }
  if (project.title === "Jim Coach") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-black flex flex-col items-center justify-center p-8">
        <div className="w-24 h-24 rounded-full border-2 border-blue-500/30 flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-widest uppercase text-center">JIM COACH</h3>
        <p className="text-blue-300/60 mt-2 text-sm tracking-widest uppercase">AI Fitness Tracking</p>
      </div>
    );
  }
  if (project.title === "MyTrials") {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-emerald-900 to-black flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xs h-32 rounded-xl border border-emerald-500/20 bg-black/50 p-4 flex flex-col justify-between mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="w-3/4 h-3 rounded-full bg-emerald-500/40" />
          <div className="w-1/2 h-3 rounded-full bg-emerald-500/20" />
          <div className="w-full h-12 mt-4 rounded-lg bg-emerald-500/10" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-widest uppercase text-center">MYTRIALS</h3>
        <p className="text-emerald-300/60 mt-2 text-sm tracking-widest uppercase">Clinical Dashboard</p>
      </div>
    );
  }
  if (project.title === "Neta Bridge") {
    return (
      <>
        <div className="absolute inset-0 z-0 bg-black">
          <ParticlesBackground id="neta-particles-fan" />
        </div>
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none font-mono tracking-widest uppercase">
          <h3 className="text-[28px] font-bold text-white mix-blend-difference">NETABRIDGE</h3>
        </div>
      </>
    );
  }
  return (
    <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="w-full h-full object-cover" />
  );
}

export default function Animation1Page() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeDiagram, setActiveDiagram] = useState<{mermaidCode: string, title: string} | null>(null);
  const [agentClient, setAgentClient] = useState<{ sendText: (text: string) => void, interrupt?: (text?: string) => void } | null>(null);

  // ── CAROUSEL ROTATION ──
  const baseRotation = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    let moveBy = 3 * (delta / 1000);
    baseRotation.set(baseRotation.get() + moveBy);
  });

  const rotateYStr = useTransform(baseRotation, (r) => `translateZ(2200px) rotateY(${r}deg)`);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // The section is very tall, so we make the scale effect finish by 25% scroll progress
  // so it's extremely obvious while the user is still viewing the top of the page.
  const scaleY = useTransform(scrollYProgress, [0, 0.25], [1, 0.05]);

  return (
    <>


      {/* ── HERO + PROJECTS: one seamless section with ani-3 bg ── */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          backgroundColor: "#000000",
        }}
      >
        {/* ani-3 background fading to white at the bottom */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            backgroundImage: "url('/ani-3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            transformOrigin: "50% 0%",
            scaleY: scaleY,
          }}
        />

        {/* ── Section 1: Hero (100vh) ── */}
        <div className="w-full min-h-screen flex flex-col items-center justify-center relative z-20 pb-20">
          {/* Name + Tagline */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center pointer-events-none px-4 mb-16"
          >
          <h1
            className="text-white leading-none tracking-tight"
            style={{
              fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 90px)",
              letterSpacing: "-0.03em",
            }}
          >
            I'm Aminul, a product<br />designer who engineers.
          </h1>
          <p
            className="text-white/60 mt-3 tracking-widest uppercase text-[12px] md:text-[13px]"
            style={{ fontFamily: "'Neue Montreal', 'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: "0.2em" }}
          >
            Designer&nbsp;&nbsp;&middot;&nbsp;&nbsp;Founder&nbsp;&nbsp;&middot;&nbsp;&nbsp;Engineer
          </p>
        </motion.div>

        {/* 3D Carousel — static, no sticky, overflow clipped */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden", width: "100%", padding: "40px 0" }} 
        >
        <div
          className="relative z-10"
          style={{ width: 360, height: 240, perspective: 3000, margin: "0 auto", overflow: "visible" }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: rotateYStr,
            }}
          >
            {[...projects, ...projects, ...projects, ...projects].map((project, i, arr) => {
              const angle = (360 / arr.length) * i;
              const radius = 1300;
              return (
                <Link
                  key={`${project.id}-${i}`}
                  href={project.href}
                  className="group"
                  style={{
                    position: "absolute",
                    width: 360,
                    height: 240,
                    borderRadius: 32,
                    left: 0,
                    top: 0,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                    textDecoration: "none",
                    display: "block",
                    backfaceVisibility: "hidden",
                    transform: `rotateY(${angle}deg) translateZ(-${radius}px)`,
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 32, WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}>
                    <CardMedia project={project} />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-20 transition-opacity duration-500"
                      style={{ opacity: 0.6 }}
                    />
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-30 scale-90 group-hover:scale-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
        </motion.div>{/* end carousel overflow wrapper */}
        </div>{/* end Hero Section */}

        {/* ── Section 2: About Me (100vh) ── */}
        <div className="w-full min-h-screen flex items-center justify-center border-t border-white/10">
          <div className="w-full max-w-[1200px] mx-auto px-6 py-24 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 flex justify-center items-center h-[500px]">
              <AboutCardStack />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-6 tracking-tight">
                Hi I'm Aminul
              </h2>
              <div className="text-white/70 space-y-4 text-[14px] md:text-[16px] leading-[1.6]">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Featured Project (100vh) ── */}
        <div className="w-full min-h-screen flex flex-col justify-center border-t border-white/10" id="project-0">
          <div className="w-full max-w-[1200px] mx-auto px-6 py-24">
            <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-12 text-center tracking-tight">
              The project I'm most proud of
            </h2>
            <div className="w-full aspect-[21/9] bg-zinc-900 rounded-[32px] overflow-hidden relative mb-8 shadow-2xl">
              <Image
                src="/project-saas.png"
                alt="Neucler"
                fill
                className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500 cursor-pointer"
                onClick={() => setActiveProject('neucler')}
              />
            </div>
            <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-4">Neucler</h3>
            <p className="text-[14px] md:text-[16px] text-white/70 leading-[1.6] max-w-4xl">
              Taking a B2B SaaS from 0 to 1 by automating sales workflows for dental clinics, resulting in 300% increase in daily active usage within 3 months.
            </p>
          </div>
        </div>

        {/* ── Section 4: Other Projects Grid (100vh) ── */}
        <div className="w-full min-h-screen flex flex-col justify-center border-t border-white/10">
          <div className="w-full max-w-[1200px] mx-auto px-6 py-24">
            <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-12 tracking-tight">
              If you wanna check out my other work
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(1, 5).map((project, index) => (
              <div 
                key={project.id} 
                id={`project-${index + 1}`}
                className="w-full aspect-[4/3] bg-zinc-900 rounded-[24px] overflow-hidden relative cursor-pointer group"
                style={{ scrollMarginTop: "100px" }}
                onClick={() => setActiveProject(project.slug)}
              >
                {project.image ? (
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white font-bold text-xl">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-end mt-8">
            <Link href="#" className="text-white font-bold text-[16px] md:text-[18px] hover:underline underline-offset-4">
              View All
            </Link>
          </div>
        </div>
        </div>
      </section>
      {/* ── Footer ── */}
      <div className="bg-black">
        <LandingFooter />
      </div>
      
      {/* Voice Agent UI */}
      {/* <div className="fixed inset-0 pointer-events-none z-50">
        <VoiceAgent 
          onShowProject={setActiveProject}
          onShowDiagram={setActiveDiagram}
          onAgentReady={setAgentClient}
          isProjectActive={!!activeProject}
          initialGreetingPrompt="Greet the visitor briefly. Then IMMEDIATELY use the scroll_to_section tool with selector '#project-0' to scroll down to the first project. Open the project using the show_project tool. Narrate its sections by calling change_project_view for each step. When finished, call close_project and move on to '#project-1'. Continue this pattern for all projects." 
        />
      </div> */}

      {/* Project Card Viewer */}
      {activeProject && (
        <div className="fixed inset-0 flex items-center justify-center z-[80] animate-in fade-in zoom-in-95 duration-700 pointer-events-none">
           <ProjectCardViewer 
             slug={activeProject} 
             onNarrationRequest={(t) => agentClient?.sendText(t)}
             onClose={() => {
               setActiveProject(null);
               agentClient?.interrupt?.("The user closed the project page and returned to the home screen. Acknowledge this briefly.");
             }}
           />
        </div>
      )}

      {/* Diagram Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center transition-all duration-700 pointer-events-none ${activeDiagram ? 'opacity-100' : 'opacity-0'}`}>
        {activeDiagram && (
          <div className="w-full max-w-5xl px-8 pointer-events-auto">
            <MermaidDiagram chart={activeDiagram.mermaidCode} title={activeDiagram.title} />
          </div>
        )}
      </div>
    </>
  );
}
