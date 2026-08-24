import React from "react";
import { toolGroups } from "@/lib/data";

export const Toolbox: React.FC = () => {
  return (
    <section className="toolbox section-rule" aria-labelledby="toolbox-title">
      <div>
        <p className="eyebrow">04 / Tools</p>
        <h2 id="toolbox-title">What I use.</h2>
      </div>
      <div className="tool-groups">
        {toolGroups.map((group) => (
          <p key={group.category}>
            <b>{group.category}</b> {group.items}
          </p>
        ))}
      </div>
    </section>
  );
};
