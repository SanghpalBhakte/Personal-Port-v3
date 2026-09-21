"use client";

import React from "react";
import { projects } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import type { Project } from "@/types";

const marks: Record<string, React.ReactNode> = {
  "clarity-desk": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 12.2l2.7 2.8L16.5 9" />
    </svg>
  ),
  "scheme-matching": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="7.5" r="2.6" />
      <circle cx="18" cy="16.5" r="2.6" />
      <path d="M8.3 9.3l7.4 5.4" />
    </svg>
  ),
  sweep: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.2" />
      <path d="M7.8 12h8.4" />
    </svg>
  ),
  rivet: (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="5" cy="12" r="1.5" stroke="none" />
      <circle cx="12" cy="12" r="1.5" stroke="none" />
      <circle cx="19" cy="12" r="1.5" stroke="none" />
      <path d="M6.6 12h3.6M13.8 12h3.6" fill="none" />
    </svg>
  ),
  "janai-tours": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 16.5c4-1.7 4-9.7 8-9.7s3.3 7.7 8 6.2" strokeDasharray="0.5 3.3" />
      <circle cx="19.2" cy="13.2" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const ProjectCard: React.FC<{ project: Project; idx: number }> = ({ project, idx }) => {
  const reveal = useReveal<HTMLElement>(Math.min(idx * 80, 240));

  return (
    <article
      ref={reveal.ref}
      className={`project ${idx === 0 ? "featured" : ""} ${reveal.className}`}
      style={reveal.style}
    >
      <div className="project-number">
        <span className="project-mark" aria-hidden="true">
          {marks[project.id]}
        </span>
        <span>{project.number}</span>
      </div>
      <p className="project-kind">{project.kind}</p>
      <div className="project-copy">
        {idx === 0 && <span className="featured-label">Featured</span>}
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
  );
};

export const SelectedWork: React.FC = () => {
  return (
    <section id="work" className="work section-rule" aria-labelledby="work-title">
      <div className="section-heading">
        <div className="section-meta">
          <p className="eyebrow">01 / Selected work</p>
          <span className="section-subtext">Projects & systems in progress</span>
        </div>
        <h2 id="work-title">
          A few things<br />
          I’m working on.
        </h2>
      </div>
      <div className="project-list">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
};
