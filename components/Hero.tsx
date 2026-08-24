import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export const Hero: React.FC = () => {
  return (
    <section className="hero section-rule" aria-labelledby="hero-title">
      <div className="hero-label">
        <div className="hero-meta-left">
          <p className="eyebrow">{siteConfig.name} / 2026</p>
          <span className="hero-submeta">{siteConfig.coordinates}</span>
        </div>
        <p className="availability">
          <span className="status-dot" aria-hidden="true" />
          Learning by building
        </p>
      </div>
      
      <h1 id="hero-title">
        I build the boring<br />
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
    </section>
  );
};
