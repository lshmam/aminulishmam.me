import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  slug?: string;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
  onClick?: (e: React.MouseEvent) => void;
};

export type BubbleMenuProps = {
  open: boolean;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

export default function BubbleMenu({
  open,
  menuBg = 'rgba(255, 255, 255, 0.8)', // Translucent glass background
  menuContentColor = '#111',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12
}: BubbleMenuProps) {
  const [showOverlay, setShowOverlay] = useState(open);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (open) setShowOverlay(true);
  }, [open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (open) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%', autoAlpha: 0 });
      gsap.set(labels, { y: 10, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          autoAlpha: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            '-=' + animationDuration * 0.9
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 10,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [open, showOverlay, animationEase, animationDuration, staggerDelay]);

  return (
    <>
      <style>{`
        .bubble-menu-items .pill-link {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, color 0.3s ease;
        }
        .bubble-menu-items .pill-link:hover {
          background: var(--hover-bg) !important;
          color: var(--hover-color) !important;
          transform: scale(1.15) rotate(var(--item-rot, 0deg));
          border-color: transparent !important;
        }
        .bubble-menu-items .pill-link:active {
          transform: scale(0.95) rotate(var(--item-rot, 0deg));
        }
      `}</style>

      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            'bubble-menu-items',
            useFixedPosition ? 'fixed' : 'absolute',
            'inset-0',
            'flex items-center justify-center',
            'pointer-events-none',
            'z-[90]',
            'overflow-hidden'
          ].join(' ')}
          aria-hidden={!open}
        >
          <ul
            className={[
              'relative',
              'w-full h-full',
              'flex items-center justify-center',
              'pointer-events-none'
            ].join(' ')}
            role="menu"
            aria-label="Menu links"
            style={{
              '--radius': 'clamp(160px, 35vmin, 380px)'
            } as CSSProperties}
          >
            {items.map((item, idx) => {
              // Distribute evenly in a circle starting from top (-90deg)
              const angleDeg = -90 + (360 / items.length) * idx;
              
              return (
                <li
                  key={idx}
                  role="none"
                  className="absolute pointer-events-auto flex items-center justify-center"
                  style={{
                    transform: `rotate(${angleDeg}deg) translateX(var(--radius)) rotate(${-angleDeg}deg)`,
                    zIndex: 100
                  }}
                >
                  <a
                    role="menuitem"
                    href={item.href}
                    data-slug={item.slug}
                    onClick={item.onClick}
                    aria-label={item.ariaLabel || item.label}
                    className={[
                      'pill-link',
                      'rounded-full',
                      'no-underline',
                      'shadow-xl shadow-black/10 backdrop-blur-md border border-white/30',
                      'flex items-center justify-center',
                      'whitespace-nowrap'
                    ].join(' ')}
                    style={
                      {
                        ['--item-rot']: `${item.rotation ?? 0}deg`,
                        ['--pill-bg']: menuBg,
                        ['--pill-color']: menuContentColor,
                        ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',
                        ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,
                        background: 'var(--pill-bg)',
                        color: 'var(--pill-color)',
                        padding: '0.75rem 1.75rem',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        transform: 'rotate(var(--item-rot))',
                        willChange: 'transform, opacity',
                      } as CSSProperties
                    }
                    ref={el => {
                      if (el) bubblesRef.current[idx] = el;
                    }}
                  >
                    <span
                      className="pill-label inline-block drop-shadow-sm"
                      style={{
                        willChange: 'transform, opacity',
                      }}
                      ref={el => {
                        if (el) labelRefs.current[idx] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
