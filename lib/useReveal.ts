"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";

interface RevealResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  className: string;
  style: CSSProperties;
}

/**
 * Fades + slides an element in once it scrolls into view.
 * Respects prefers-reduced-motion and degrades to "always visible"
 * if IntersectionObserver isn't available or JS never runs
 * (see the <noscript> fallback in app/layout.tsx).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  delayMs = 0
): RevealResult<T> {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    className: visible ? "reveal reveal-visible" : "reveal",
    style: { transitionDelay: visible ? `${delayMs}ms` : "0ms" },
  };
}
