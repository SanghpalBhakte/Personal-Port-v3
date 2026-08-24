"use client";

import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run if pointer is fine (desktop/mouse) and user hasn't preferred reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    let ringX = -100;
    let ringY = -100;
    let pointerX = -100;
    let pointerY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
      }
    };

    const onMouseEnter = () => setIsActive(true);
    const onMouseLeave = () => setIsActive(false);

    window.addEventListener("mousemove", onMouseMove);

    const follow = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);

    const interactiveElements = document.querySelectorAll("a, button, .project, .gfx-display, input, textarea");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isVisible ? "opacity-100" : "opacity-0"} ${
          isActive ? "cursor-active" : ""
        }`}
        aria-hidden="true"
      />
    </>
  );
};
