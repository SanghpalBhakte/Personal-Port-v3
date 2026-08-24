import React from "react";
import { notes } from "@/lib/data";

export const HowIWork: React.FC = () => {
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
        <p className="manifesto">
          I like building the quiet parts: tools that make a busy day easier to understand and a small process easier to keep moving.
        </p>
        {notes.map((note) => (
          <div key={note.number} className="note">
            <span>{note.number}</span>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
