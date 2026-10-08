"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Hovering these turns the pencil tip red, like picking up a red pencil.
const INTERACTIVE = "a, button, .project, .gfx-display, [role='button']";
// Over text fields the real text caret is shown instead of the pencil.
const TEXT_FIELD = "input, textarea, [contenteditable='true']";
// How fast each graphite dot catches up to the pencil tip. Smaller means more lag.
const TRAIL_LAG = [0.24, 0.15, 0.09];

export const CustomCursor = () => {
  const pencilRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const pathname = usePathname();

  // A new page loaded under a still mouse: drop the hover state until it moves again.
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
    // True until the pointer is seen, so the trail starts at the pointer instead of sliding in from a corner.
    let needsSnap = true;
    const trail = TRAIL_LAG.map(() => ({ x: -100, y: -100 }));
    let frame = 0;

    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;

      if (needsSnap) {
        needsSnap = false;
        trail.forEach((dot) => {
          dot.x = pointerX;
          dot.y = pointerY;
        });
      }

      // The system arrow is hidden only once the pencil is actually tracking the mouse,
      // so there is never a moment (or a failed script) with no cursor on screen.
      root.classList.add("has-custom-cursor");

      if (pencilRef.current) {
        pencilRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }

      // Event delegation: works for elements added after load (e.g. the note form).
      const target = e.target instanceof Element ? e.target : null;
      const overTextField = Boolean(target?.closest(TEXT_FIELD));
      setIsVisible(!overTextField);
      setIsActive(!overTextField && Boolean(target?.closest(INTERACTIVE)));
    };

    // Pointer left the window: don't leave the pencil frozen at the edge.
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsVisible(false);
        setIsPressed(false);
        needsSnap = true;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setIsPressed(true);
    };
    const onRelease = () => setIsPressed(false);

    const follow = () => {
      TRAIL_LAG.forEach((lag, i) => {
        const dot = trail[i];
        dot.x += (pointerX - dot.x) * lag;
        dot.y += (pointerY - dot.y) * lag;
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      });
      frame = requestAnimationFrame(follow);
    };
    frame = requestAnimationFrame(follow);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onRelease);
    window.addEventListener("blur", onRelease);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onRelease);
      window.removeEventListener("blur", onRelease);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  const state = `${isVisible ? "cursor-visible" : ""} ${isActive ? "cursor-active" : ""}`;

  return (
    <>
      <div
        ref={pencilRef}
        className={`cursor-pencil ${state} ${isPressed ? "cursor-pressed" : ""}`}
        aria-hidden="true"
      >
        <i className="cursor-mark" />
        <svg className="cursor-pencil-art" width="1" height="1" viewBox="0 0 1 1" focusable="false">
          <g transform="rotate(38)">
            <path className="cp-wood" d="M0 0L-3.5 -7H3.5Z" />
            <path className="cp-lead" d="M0 0L-1.4 -2.8H1.4Z" />
            <rect className="cp-body" x="-3.5" y="-29" width="7" height="22" />
            <rect className="cp-shade" x="-3.5" y="-29" width="2.6" height="22" />
            <rect className="cp-ferrule" x="-3.5" y="-33" width="7" height="4" />
            <path className="cp-line" d="M-3.5 -31H3.5" />
            <path className="cp-eraser" d="M-3.5 -33V-35.5Q-3.5 -38 0 -38Q3.5 -38 3.5 -35.5V-33Z" />
          </g>
        </svg>
      </div>
      {TRAIL_LAG.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className={`cursor-trail cursor-trail-${i + 1} ${state}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
};
