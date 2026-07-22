"use client";

interface FluidGlassLensProps {
  audioLevel?: number;
}

// A pure CSS glass overlay that fills its parent container exactly.
// Parent must be `position: relative` with defined width/height.
export default function FluidGlassLens({ audioLevel = 0 }: FluidGlassLensProps) {
  const blurAmount = 24 + audioLevel * 20;
  const glowOpacity = 0.18 + audioLevel * 0.28;

  return (
    <div className="absolute inset-0 rounded-full pointer-events-none z-[5]">
      {/* Outer glow ring — pulses with audio */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-150"
        style={{
          background: `radial-gradient(circle, rgba(200,180,255,${glowOpacity}) 0%, rgba(130,100,255,${glowOpacity * 0.5}) 55%, transparent 75%)`,
          transform: `scale(${1 + audioLevel * 0.15})`,
          filter: 'blur(10px)',
        }}
      />

      {/* Glass disc — exactly fills the orb */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          backdropFilter: `blur(${blurAmount}px) saturate(250%)`,
          WebkitBackdropFilter: `blur(${blurAmount}px) saturate(250%)`,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.500) 0%, rgba(200,185,255,0.20) 50%, rgba(255,255,255,0.10) 100%)',
          border: '1.5px solid rgba(255,255,255,0.60)',
          boxShadow: '0 8px 40px rgba(130,100,255,0.20), inset 0 1.5px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(130,100,255,0.14)',
        }}
      >
        {/* Upper-left specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: '50%', height: '30%',
            top: '10%', left: '15%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)',
            filter: 'blur(6px)',
            transform: 'rotate(-28deg)',
          }}
        />
        {/* Bottom-right caustic tint */}
        <div
          className="absolute rounded-full"
          style={{
            width: '55%', height: '28%',
            bottom: '8%', right: '8%',
            background: 'radial-gradient(ellipse, rgba(180,140,255,0.22) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      </div>
    </div>
  );
}
