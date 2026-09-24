"use client";

import React from "react";
import { toolGroups } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";

export const Toolbox: React.FC = () => {
  const reveal = useReveal<HTMLDivElement>(0);

  return (
    <section className="toolbox section-rule" aria-labelledby="toolbox-title">
      <div className="section-meta">
        <p className="eyebrow">04 / Tools</p>
        <span className="section-subtext">Technologies, platforms & thinking tools</span>
        <h2 id="toolbox-title">What I use.</h2>
      </div>
      <div ref={reveal.ref} className={`tool-groups ${reveal.className}`} style={reveal.style}>
        {toolGroups.map((group) => (
          <p key={group.category}>
            <b>{group.category}</b> {group.items}
          </p>
        ))}
      </div>
    </section>
  );
};
