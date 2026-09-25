"use client";

import React from "react";
import { notes } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import type { NoteItem } from "@/types";

const Note: React.FC<{ note: NoteItem; idx: number }> = ({ note, idx }) => {
  const reveal = useReveal<HTMLDivElement>(80 + idx * 80);
  return (
    <div ref={reveal.ref} className={`note ${reveal.className}`} style={reveal.style}>
      <span>{note.number}</span>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
    </div>
  );
};

export const HowIWork: React.FC = () => {
  const manifesto = useReveal<HTMLDivElement>(0);

  return (
    <section id="notes" className="notes section-rule" aria-labelledby="notes-title">
      <div className="section-heading">
        <div className="section-meta">
          <p className="eyebrow">02 / How I work</p>
          <span className="section-subtext">How I approach projects</span>
        </div>
        <h2 id="notes-title">What I care about.</h2>
      </div>
      <div className="notes-grid">
        <div ref={manifesto.ref} className={`manifesto-block ${manifesto.className}`} style={manifesto.style}>
          <svg
            className="loop-mark"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 12a8 8 0 0 1 14-5.3" />
            <path d="M20 4v4h-4" />
            <path d="M20 12a8 8 0 0 1-14 5.3" />
            <path d="M4 20v-4h4" />
          </svg>
          <p className="manifesto">
            I like building small, practical things that make a busy day easier to handle. I rarely get it right the first time, so I keep going back, testing and fixing until it feels right.
          </p>
        </div>
        {notes.map((note, idx) => (
          <Note key={note.number} note={note} idx={idx} />
        ))}
      </div>
    </section>
  );
};
