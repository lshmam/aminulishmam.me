"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const traits = [
  { label: "CONSCIENTIOUSNESS", short: "CONSCI.", score: 103, max: 120 },
  { label: "EXTRAVERSION", short: "EXTRA.", score: 94, max: 120 },
  { label: "AGREEABLENESS", short: "AGREE.", score: 93, max: 120 },
  { label: "OPENNESS", short: "OPEN.", score: 85, max: 120 },
  { label: "NEUROTICISM", short: "NEURO.", score: 46, max: 120 },
];

const cx = 200;
const cy = 200;
const R = 140;
const levels = 5;

function polarToXY(angle: number, r: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function pointsForValues(values: number[]) {
  return values.map((v, i) => {
    const angle = (360 / values.length) * i;
    const r = (v / 120) * R;
    return polarToXY(angle, r);
  });
}

export default function BigFiveChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  const n = traits.length;
  const angles = traits.map((_, i) => (360 / n) * i);
  const axisPoints = angles.map((a) => polarToXY(a, R));
  const dataPoints = pointsForValues(traits.map((t) => t.score));
  const fullPoints = pointsForValues(traits.map(() => 120)); // outer boundary

  // Build polygon path string from a list of {x,y}
  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z";

  const dataPath = toPath(dataPoints);
  const outerPath = toPath(fullPoints);

  return (
    <div ref={ref} className="my-8 w-full font-mono">
      <div className="relative w-full aspect-square max-w-[420px] mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">

          {/* Background concentric rings */}
          {Array.from({ length: levels }).map((_, li) => {
            const r = (R / levels) * (li + 1);
            const ringPts = angles.map((a) => polarToXY(a, r));
            return (
              <polygon
                key={li}
                points={ringPts.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="currentColor"
                strokeWidth={0.5}
                className="text-foreground/10"
              />
            );
          })}

          {/* Axis lines */}
          {axisPoints.map((pt, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={pt.x}
              y2={pt.y}
              stroke="currentColor"
              strokeWidth={0.5}
              className="text-foreground/15"
            />
          ))}

          {/* Outer boundary fill (faint) */}
          <path d={outerPath} fill="currentColor" className="text-foreground/[0.02]" />

          {/* Animated data polygon fill */}
          <motion.path
            d={dataPath}
            fill="currentColor"
            className="text-foreground/10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Animated data polygon stroke via dasharray */}
          <motion.path
            d={dataPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground/70"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          {/* Data point dots */}
          {dataPoints.map((pt, i) => (
            <motion.circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={3.5}
              fill="currentColor"
              className="text-foreground"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.07, ease: "backOut" }}
              style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
            />
          ))}

          {/* Labels */}
          {traits.map((trait, i) => {
            const angle = angles[i];
            const labelR = R + 26;
            const pos = polarToXY(angle, labelR);
            // determine text anchor based on quadrant
            const isLeft = pos.x < cx - 8;
            const isRight = pos.x > cx + 8;
            const anchor = isLeft ? "end" : isRight ? "start" : "middle";
            return (
              <motion.text
                key={trait.short}
                x={pos.x}
                y={pos.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className="text-foreground/50 fill-current"
                fontSize={8}
                fontFamily="monospace"
                letterSpacing={1}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
              >
                {trait.short}
              </motion.text>
            );
          })}
        </svg>
      </div>

      {/* Score legend bars */}
      <div className="mt-6 space-y-3">
        {traits.map((trait, i) => (
          <div key={trait.label} className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-[0.15em] text-foreground/40 uppercase">
                  {trait.label}
                </span>
                <motion.span
                  className="text-[10px] font-bold text-foreground/60 tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.5 + i * 0.07 }}
                >
                  {trait.score}
                </motion.span>
              </div>
              <div className="h-[2px] bg-foreground/8 w-full rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-foreground/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(trait.score / trait.max) * 100}%` } : { width: 0 }}
                  transition={{ duration: 0.9, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
