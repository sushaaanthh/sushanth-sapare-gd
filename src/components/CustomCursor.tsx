import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  // Use refs for animation state to prevent React re-renders in RAF
  const mouse = useRef({ x: -100, y: -100 });
  const outer = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicked = useRef(false);

  useEffect(() => {
    // Check if device is touch-enabled
    const checkTouch = () => {
      const touchEnabled = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouch(touchEnabled);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (isTouch) return;

    // Inject global stylesheet to hide default pointer cursor on desktop
    const injectStyles = () => {
      const styleId = 'custom-cursor-styles';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          @media (hover: hover) and (pointer: fine) {
            * {
              cursor: none !important;
            }
          }
        `;
        document.head.appendChild(style);
      }
    };
    injectStyles();

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Instant follow for inner circle container (no CSS transition delay)
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hover state on interactive elements
      const target = e.target as HTMLElement;
      if (target && target.closest) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [data-interactive="true"], .group, .cursor-pointer, [onclick], img, svg'
        );
        isHovered.current = !!interactive;
      }
    };

    const onMouseDown = () => {
      isClicked.current = true;
      if (outerRef.current) outerRef.current.classList.add('cursor-clicked');
      if (innerRef.current) innerRef.current.classList.add('cursor-clicked');
    };

    const onMouseUp = () => {
      isClicked.current = false;
      if (outerRef.current) outerRef.current.classList.remove('cursor-clicked');
      if (innerRef.current) innerRef.current.classList.remove('cursor-clicked');
    };

    let rafId: number;
    const animate = () => {
      // Smooth easing (0.18 gives a responsive, premium feel without lagging)
      outer.current.x += (mouse.current.x - outer.current.x) * 0.18;
      outer.current.y += (mouse.current.y - outer.current.y) * 0.18;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outer.current.x}px, ${outer.current.y}px, 0)`;
        
        if (isHovered.current) {
          outerRef.current.classList.add('cursor-hovered');
        } else {
          outerRef.current.classList.remove('cursor-hovered');
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafId);
      const styleEl = document.getElementById('custom-cursor-styles');
      if (styleEl) styleEl.remove();
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Ring Container (positions via RAF without CSS transition fighting) */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {/* Outer Ring Visual (handles scale, border thickness, and glow transitions) */}
        <div className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#FF5B3D] transition-[transform,border-color,border-width,box-shadow] duration-250 ease-out [.cursor-hovered_&]:scale-150 [.cursor-hovered_&]:border-[2.5px] [.cursor-hovered_&]:border-[#FF7A60] [.cursor-hovered_&]:shadow-[0_0_16px_rgba(255,91,61,0.5)] [.cursor-clicked_&]:scale-85" />
      </div>

      {/* Inner Circle Container (positions instantly via mousemove) */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {/* Inner Circle Visual */}
        <div className="w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-transform duration-150 ease-out [.cursor-clicked_&]:scale-75" />
      </div>
    </>
  );
};
export default CustomCursor;
