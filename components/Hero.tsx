import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { LocalClock } from "./LocalClock";

export const Hero: React.FC = () => {
  return (
    <section className="hero section-rule" aria-labelledby="hero-title">
      <div className="hero-label">
        <div className="hero-meta-left">
          <p className="eyebrow">{siteConfig.name} / 2026</p>
          <LocalClock />
        </div>
        <p className="availability">
          <span className="status-dot" aria-hidden="true" />
          Learning by building
        </p>
      </div>
      
      <h1 id="hero-title">
        I build the <span className="hl">boring</span><br />
        systems that make<br />
        everything else <em>work.</em>
      </h1>

      <div className="hero-foot">
        <div className="hero-bio-block">
          <p>{siteConfig.bio}</p>
        </div>
        <Link className="arrow-link" href="#work">
          <span>See what I’m working on</span>
          <span className="arrow-glyph" aria-hidden="true">↓</span>
        </Link>
      </div>

      <div className="identity-strip">
        <div className="loop-chips">
          <span className="loop-label">My process</span>
          <span className="chip marked">Research</span>
          <span className="loop-step">
            <span aria-hidden="true">&rarr;</span>
            <span className="chip">Design</span>
          </span>
          <span className="loop-step">
            <span aria-hidden="true">&rarr;</span>
            <span className="chip">Build</span>
          </span>
          <span className="loop-step">
            <span aria-hidden="true">&rarr;</span>
            <span className="chip">Test</span>
          </span>
          <span className="loop-step">
            <span aria-hidden="true">&rarr;</span>
            <span className="chip marked">Improve</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12a8 8 0 0 1 14-5.3" />
              <path d="M20 4v4h-4" />
              <path d="M20 12a8 8 0 0 1-14 5.3" />
              <path d="M4 20v-4h4" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
};
