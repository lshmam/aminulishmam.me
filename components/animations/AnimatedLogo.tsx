"use client";

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import styles from './AnimatedLogo.module.css';

export default function AnimatedLogo() {
  const ref = useRef(null);
  // Trigger animation once when 20% of the element is visible
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div ref={ref} className={styles.container}>
      
      <div className={`${styles.logoWrapper} ${isInView ? styles.animateWrapper : ''} relative z-10`}>
        
        {/* THE OUTER PIN */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 60 73.14" className="w-full h-full fill-[#F1EDE1]">
            <path d="M30,0C13.43,0,0,13.44,0,30c0,8.39,3.44,15.97,9,21.41h-.02l21.2,21.73,20.84-21.73c2.33-2.29,4.28-4.95,5.77-7.89,2.05-4.06,3.21-8.65,3.21-13.52C60,13.44,46.57,0,30,0Zm19.83,39.6c-1.1,2.17-2.53,4.12-4.25,5.81l-15.34,15.99-15.6-15.99h.01c-4.09-4-6.62-9.58-6.62-15.76,0-12.19,9.89-22.08,22.08-22.08s22.08,9.89,22.08,22.08c0,3.59-.85,6.96-2.36,9.95Z" />
          </svg>
        </div>

        {/* THE INNER 'A' */}
        <div className={`${styles.innerA} ${isInView ? styles.animateInnerA : ''} absolute inset-0 flex items-center justify-center`}>
          {/* ADJUST THE HEIGHT HERE: 
              Change translateY(-8%) to move the 'A' up or down. 
              - More negative (e.g., -15%) = Moves higher 
              - Less negative or positive (e.g., 0% or 5%) = Moves lower 
          */}
          <svg viewBox="0 0 38 45.56" className="w-[63.3%] h-[62.3%] fill-[#F1EDE1]" style={{ transform: 'translateY(-8%)' }}>
            <path d="M19,0C8.51,0,0,8.51,0,19c0,8.99,6.26,16.53,14.65,18.49l-2.09,2.15,6.08,5.92,9.84-10.1c5.69-3.28,9.52-9.42,9.52-16.46C38,8.51,29.49,0,19,0Zm-.5,29c-5.8,0-10.5-4.7-10.5-10.5s4.7-10.5,10.5-10.5,10.5,4.7,10.5,10.5c0,2.72-1.04,5.19-2.73,7.06-.12,.12-.23,.24-.35,.36-1.9,1.9-4.52,3.08-7.42,3.08Z" />
          </svg>
        </div>

      </div>
    </div>
  );
}
