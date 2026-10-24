"use client";

import React from "react";
import Image from "next/image";
import { visualWorks } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import type { VisualWorkItem } from "@/types";

const GfxTile: React.FC<{ work: VisualWorkItem; idx: number }> = ({ work, idx }) => {
  const reveal = useReveal<HTMLAnchorElement>(idx * 90);
  const label = [work.title, work.year, "opens on Behance"].filter(Boolean).join(", ");

  return (
    <a
      ref={reveal.ref}
      className={`gfx-tile${work.featured ? " is-featured" : ""} ${reveal.className}`}
      style={reveal.style}
      href={work.url}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <div className="gfx-media">
        <Image
          src={work.image}
          alt={`${work.title} cover`}
          fill
          sizes="(max-width:560px) 100vw, (max-width:900px) 50vw, 33vw"
          className="gfx-img"
        />
        <div className="gfx-overlay" aria-hidden="true">
          <span className="gfx-overlay-title">{work.title}</span>
          {work.year && <span className="gfx-overlay-year">{work.year}</span>}
        </div>
      </div>
      <div className="gfx-caption" aria-hidden="true">
        <span>{work.title}</span>
        {work.year && <span>{work.year}</span>}
      </div>
    </a>
  );
};

export const VisualWork: React.FC = () => {
  return (
    <section id="gfx" className="gfx section-rule" aria-labelledby="gfx-title">
      <div className="section-heading">
        <div className="section-meta">
          <p className="eyebrow">03 / Visual work</p>
          <span className="section-subtext">Some of my graphic design</span>
        </div>
        <h2 id="gfx-title">
          I also do<br />
          graphic design.
        </h2>
      </div>
      <div className="gfx-gallery">
        {visualWorks.map((work, idx) => (
          <GfxTile key={work.id} work={work} idx={idx} />
        ))}
      </div>
    </section>
  );
};
