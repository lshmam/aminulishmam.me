export default function VennDiagram() {
  return (
    <div className="w-full max-w-[320px] mx-auto my-12 flex justify-center items-center opacity-80 mix-blend-multiply">
      <svg
        viewBox="0 0 300 220"
        className="w-full h-auto text-foreground"
      >
        {/* Outer Circular Bounds / HUD effect */}
        <circle cx="150" cy="125" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-10" strokeDasharray="1 4" />
        
        <g stroke="currentColor" strokeWidth="1" fill="none">
          {/* Business: top center */}
          <circle cx="150" cy="90" r="60" className="opacity-30" />
          
          {/* Design: bottom left */}
          <circle cx="120" cy="142" r="60" className="opacity-30" />
          
          {/* Engineering: bottom right */}
          <circle cx="180" cy="142" r="60" className="opacity-30" />
        </g>

        {/* Shaded central intersection to highlight 'ME' */}
        <g fill="currentColor" className="opacity-10">
           {/* We can just shade the center loosely, or use a smaller circle */}
           <circle cx="150" cy="125" r="22" />
        </g>
        
        {/* Labels */}
        <text x="150" y="20" textAnchor="middle" className="text-[10px] font-mono fill-foreground lowercase tracking-widest font-bold opacity-60">
          [business]
        </text>
        <text x="50" y="146" textAnchor="middle" className="text-[10px] font-mono fill-foreground lowercase tracking-widest font-bold opacity-60">
          [design]
        </text>
        <text x="250" y="146" textAnchor="middle" className="text-[10px] font-mono fill-foreground lowercase tracking-widest font-bold opacity-60">
          [engineering]
        </text>
        
        {/* Center Text */}
        <text x="150" y="130" textAnchor="middle" alignmentBaseline="middle" className="text-[14px] font-bold font-mono fill-foreground lowercase tracking-widest">
          me
        </text>

        {/* Extra military HUD crosshairs */}
        <path d="M 150 115 L 150 120 M 150 130 L 150 135" stroke="currentColor" strokeWidth="1" className="opacity-40" />
        <path d="M 135 125 L 140 125 M 160 125 L 165 125" stroke="currentColor" strokeWidth="1" className="opacity-40" />
      </svg>
    </div>
  );
}
