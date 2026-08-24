import React from "react";
import { visualWorks } from "@/lib/data";

export const VisualWork: React.FC = () => {
  return (
    <section id="gfx" className="gfx section-rule" aria-labelledby="gfx-title">
      <div className="section-heading">
        <p className="eyebrow">03 / Visual work</p>
        <h2 id="gfx-title">
          Design work,<br />
          kept in the mix.
        </h2>
      </div>
      <div className="gfx-layout">
        {visualWorks.map((work) => (
          <a
            key={work.id}
            className="gfx-display"
            href={work.url}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
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
            <span>{work.ctaText}</span>
          </a>
        ))}
      </div>
    </section>
  );
};
