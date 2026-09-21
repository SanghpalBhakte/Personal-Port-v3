"use client";

import React from "react";
import Image from "next/image";
import { visualWorks } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import type { VisualWorkItem } from "@/types";

const GfxCard: React.FC<{ work: VisualWorkItem; idx: number }> = ({ work, idx }) => {
  const reveal = useReveal<HTMLAnchorElement>(idx * 90);
  const flatTitle = work.title.replace(/\n/g, " ");

  return (
    <a
      ref={reveal.ref}
      className={`gfx-display ${reveal.className}`}
      style={reveal.style}
      href={work.url}
      target="_blank"
      rel="noreferrer"
    >
      {work.thumbnail && (
        <div className="gfx-thumb">
          <Image
            src={work.thumbnail}
            alt={`Cover image for the ${flatTitle} project on Behance`}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            className="gfx-thumb-img"
          />
        </div>
      )}
      <div className="gfx-body">
        <p className="eyebrow">{work.eyebrow}</p>
        <h3>
          {work.title.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < work.title.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </h3>
        <p>{work.description}</p>
        <span className="gfx-cta">{work.ctaText}</span>
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
          <span className="section-subtext">Selected graphic experiments</span>
        </div>
        <h2 id="gfx-title">
          Design work,<br />
          kept in the mix.
        </h2>
      </div>
      <div className="gfx-layout">
        {visualWorks.map((work, idx) => (
          <GfxCard key={work.id} work={work} idx={idx} />
        ))}
      </div>
    </section>
  );
};
