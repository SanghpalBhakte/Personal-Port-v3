import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export const Hero: React.FC = () => {
  return (
    <section className="hero section-rule" aria-labelledby="hero-title">
      <div className="hero-label">
        <p className="eyebrow">{siteConfig.name} / 2026</p>
        <p className="availability">Learning by building</p>
      </div>
      <h1 id="hero-title">
        I build the boring<br />
        systems that make<br />
        everything else <em>work.</em>
      </h1>
      <div className="hero-foot">
        <p>{siteConfig.bio}</p>
        <Link className="arrow-link" href="#work">
          See what I’m working on <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
};
