"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useVelocity, useSpring, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import ObjectBurst from "@/components/animations/PrismaticBurst";
import { ParticlesBackground } from "@/components/animations/particles-background";

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
      <video autoPlay muted loop playsInline className="w-full h-full object-cover object-right">
        <source src="/jim-box.mp4" type="video/mp4" />
      </video>
    );
  }
  if (project.title === "MyTrials") {
    return (
      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
        <source src="/MyTrials.ai Commercial.mp4" type="video/mp4" />
      </video>
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
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── SCROLL RESPONSIVE ROTATION ──
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 100, stiffness: 50, mass: 2 });
  const baseRotation = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    // Base speed: 120s per spin = ~3 degrees per second
    let moveBy = 3 * (delta / 1000);

    // Speed boost when scrolling
    const velocityFactor = Math.abs(smoothVelocity.get());
    moveBy += velocityFactor * 0.02 * (delta / 1000);

    baseRotation.set(baseRotation.get() + moveBy);
  });

  const rotateYStr = useTransform(baseRotation, (r) => `translateZ(1000px) rotateY(${r}deg)`);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => section.classList.toggle("text-visible", entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .text-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .text-visible .text-content {
          opacity: 1;
          transform: translateY(0);
        }
        .carousel-scene {
          width: 800px;
          height: 500px;
          perspective: 1200px;
          margin: 0 auto;
        }
        .carousel-ring {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        .carousel-card {
          position: absolute;
          width: 800px;
          height: 500px;
          border-radius: 16px;
          overflow: hidden;
          left: 0;
          top: 0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          text-decoration: none;
          display: block;
          backface-visibility: hidden;
        }
        .carousel-card:hover .card-overlay { opacity: 0.85 !important; }
        .fan-bottom-mist {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: linear-gradient(to top, #ffffff, transparent);
          pointer-events: none;
          z-index: 30;
        }
      `}</style>

      {/* ── SECTION 1: 3D infinite rotating carousel ── */}
      <section
        style={{
          height: "100vh",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="carousel-scene">
          <motion.div className="carousel-ring" style={{ transform: rotateYStr }}>
            {[...projects, ...projects].map((project, i, arr) => {
              const angle = (360 / arr.length) * i;
              const radius = 1400;
              return (
                <Link
                  key={`${project.id}-${i}`}
                  href={project.href}
                  className="carousel-card group"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(-${radius}px)`,
                  }}
                >
                  <CardMedia project={project} />
                  <div
                    className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-20 transition-opacity duration-500"
                    style={{ opacity: 0.6 }}
                  />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-30 scale-90 group-hover:scale-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>

        <div className="fan-bottom-mist" />
      </section>

      {/* ── SECTION 2: ani-2 rises (250vh white) ── */}
      <section
        style={{
          height: "250vh",
          position: "relative",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ani-2.png" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
        </div>
      </section>

      {/* ── SECTION 3: Black background with text ── */}
      <section
        ref={sectionRef}
        style={{
          height: "150vh",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          gap: "16px",
        }}
      >
        <div className="text-content" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-tiempos), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(40px, 8vw, 96px)",
              lineHeight: 1,
              color: "#fff",
              margin: 0,
            }}
          >
            Designed to
            <br />
            <em>feel different.</em>
          </h2>
          <p
            style={{
              fontFamily: "'Neue Montreal', 'Helvetica Neue', sans-serif",
              color: "rgba(255,255,255,0.5)",
              fontSize: "clamp(11px, 1.5vw, 14px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: "20px",
            }}
          >
            Built from first principles. Crafted for people.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: ani-2 rotated 180deg ── */}
      <section
        style={{
          height: "150vh",
          backgroundImage: "url('/ani-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "rotate(180deg)",
        }}
      />
    </>
  );
}
