"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"text-in" | "text-out" | "done">(
    "text-in"
  );

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete();
      }}
    >
      {phase !== "done" && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          onAnimationComplete={() => {
            if (phase === "text-out") {
              setPhase("done");
            }
          }}
          style={{ backgroundColor: "#FF4000" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Name text — stretched to fill viewport height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              phase === "text-in"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.1, y: -30 }
            }
            transition={
              phase === "text-in"
                ? { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
                : { duration: 0.45, ease: [0.55, 0, 1, 0.45] }
            }
            onAnimationComplete={() => {
              if (phase === "text-in") {
                // Hold for a beat, then animate text out
                setTimeout(() => setPhase("text-out"), 600);
              }
            }}
            className="flex items-center justify-center select-none"
            style={{ height: "100dvh", width: "100vw" }}
          >
            <span
              style={{
                color: "#63A8F7",
                fontFamily:
                  "'Impact', 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
                fontWeight: 900,
                fontSize: "28vw",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                textAlign: "center",
                transform: "scaleY(1.8)",
                display: "block",
              }}
            >
              AMINUL
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
