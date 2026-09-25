"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Hovering these turns the trailing stroke into an "underline".
const INTERACTIVE = "a, button, .project, .gfx-display, [role='button']";
// Over text fields the real text caret is shown instead of the pen nib.
const TEXT_FIELD = "input, textarea, [contenteditable='true']";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // A new page loaded under a still mouse: drop the hover "underline" until it moves again.
  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  useEffect(() => {
    // Only for a mouse/trackpad, and never when the visitor asked for less motion.
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    const root = document.documentElement;
    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;

    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;

      // The system arrow is hidden only once the nib is actually tracking the mouse,
      // so there is never a moment (or a failed script) with no cursor on screen.
      root.classList.add("has-custom-cursor");

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
      }

      // Event delegation: works for elements added after load (e.g. the note form).
      const target = e.target instanceof Element ? e.target : null;
      const overTextField = Boolean(target?.closest(TEXT_FIELD));
      setIsVisible(!overTextField);
      setIsActive(!overTextField && Boolean(target?.closest(INTERACTIVE)));
    };

    // Pointer left the window: don't leave the nib frozen at the edge.
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setIsVisible(false);
    };

    const follow = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? "cursor-visible" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isVisible ? "cursor-visible" : ""} ${isActive ? "cursor-active" : ""}`}
        aria-hidden="true"
      />
    </>
  );
};
