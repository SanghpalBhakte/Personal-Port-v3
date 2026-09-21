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
  const manifesto = useReveal<HTMLParagraphElement>(0);

  return (
    <section id="notes" className="notes section-rule" aria-labelledby="notes-title">
      <div className="section-heading">
        <div className="section-meta">
          <p className="eyebrow">02 / How I work</p>
          <span className="section-subtext">Principles & field notes</span>
        </div>
        <h2 id="notes-title">Useful beats impressive.</h2>
      </div>
      <div className="notes-grid">
        <p ref={manifesto.ref} className={`manifesto ${manifesto.className}`} style={manifesto.style}>
          I like building the quiet parts: tools that make a busy day easier to understand and a small process easier to keep moving.
        </p>
        {notes.map((note, idx) => (
          <Note key={note.number} note={note} idx={idx} />
        ))}
      </div>
    </section>
  );
};
