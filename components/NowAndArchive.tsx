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
          <span className="section-subtext">Current focus & learning</span>
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
          <p className="eyebrow">06 / Earlier experiments</p>
          <span className="section-subtext">Historical portfolio iterations</span>
        </div>
        <div>
          <h2 id="archive-title">
            The archive is part<br />
            of the practice.
          </h2>
          <p>
            Older portfolio iterations — useful snapshots of the things I was trying, making, and learning at the time.
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
