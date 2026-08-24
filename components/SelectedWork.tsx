import React from "react";
import { projects } from "@/lib/data";

export const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="work section-rule" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">01 / Selected work</p>
        <h2 id="work-title">
          A few things<br />
          I’m working on.
        </h2>
      </div>
      <div className="project-list">
        {projects.map((project, idx) => (
          <article
            key={project.id}
            className={`project ${idx === 0 ? "featured" : ""}`}
          >
            <div className="project-number">{project.number}</div>
            <p className="project-kind">{project.kind}</p>
            <div className="project-copy">
              <h3>
                {project.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < project.title.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>
              <p>{project.description}</p>
              {project.note && <p className="project-note">{project.note}</p>}
            </div>
            <div className="project-side">
              <b>{project.status}</b>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-badge">
                    {tag}
                  </span>
                ))}
              </div>
              {project.linkText && <p className="project-note">{project.linkText}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
