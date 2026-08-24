import React from "react";
import { siteConfig, archives } from "@/lib/data";

export const NowAndArchive: React.FC = () => {
  return (
    <>
      <section className="now section-rule" aria-labelledby="now-title">
        <p className="eyebrow">05 / Now</p>
        <div>
          <h2 id="now-title">
            Currently building<br />
            <em>Clarity Desk</em> and <em>Sweep.</em>
          </h2>
          <p>{siteConfig.nowBio}</p>
        </div>
      </section>

      <section className="archive section-rule" aria-labelledby="archive-title">
        <p className="eyebrow">06 / Earlier experiments</p>
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
                {archive.title} <span>↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
