"use client";

import React from "react";
import { siteConfig, archives } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";

export const NowAndArchive: React.FC = () => {
  const now = useReveal<HTMLElement>(0);
  const archiveReveal = useReveal<HTMLElement>(0);

  return (
    <>
      <section
        ref={now.ref}
        className={`now section-rule ${now.className}`}
        style={now.style}
        aria-labelledby="now-title"
      >
        <div className="section-meta">
          <p className="eyebrow">05 / Now</p>
          <span className="section-subtext">What I’m up to</span>
        </div>
        <div>
          <h2 id="now-title">
            Currently building<br />
            <em>Clarity Desk</em> and <em>Sweep.</em>
          </h2>
          <p>{siteConfig.nowBio}</p>
        </div>
      </section>

      <section
        ref={archiveReveal.ref}
        className={`archive section-rule ${archiveReveal.className}`}
        style={archiveReveal.style}
        aria-labelledby="archive-title"
      >
        <div className="section-meta">
          <p className="eyebrow">06 / Older versions</p>
          <span className="section-subtext">My older portfolio sites</span>
        </div>
        <div>
          <h2 id="archive-title">
            Where I<br />
            started.
          </h2>
          <p>
            These are older versions of my portfolio. I’ve kept them up so you can see how my work has changed.
          </p>
          <div className="archive-links">
            {archives.map((archive) => (
              <a
                key={archive.url}
                href={archive.url}
                target="_blank"
                rel="noreferrer"
              >
                <span>{archive.title}</span>
                <span className="archive-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
