"use client";

import React, { useEffect, useState } from "react";
import { projects } from "@/lib/data";
import { Tag } from "./ui/Tag";
import { Pill } from "./ui/Pill";
import { useToast } from "./Toast";

export const SelectedWork: React.FC = () => {
  const { showToast } = useToast();
  const [likes, setLikes] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setLikes(data.data.likes);
        }
      })
      .catch((err) => console.error("Error loading stats:", err));
  }, []);

  const handleLike = async () => {
    if (hasLiked) return;
    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setHasLiked(true);
        showToast("Thanks for the appreciation! ✦", "success");
      }
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  return (
    <section id="work" className="work section-rule" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">01 / Selected work</p>
        <div className="flex items-start justify-between">
          <h2 id="work-title">
            A few things<br />
            I’m working on.
          </h2>
          {likes !== null && (
            <button
              onClick={handleLike}
              className={`hidden sm:flex items-center gap-2 border border-[var(--rule)] px-3 py-1 text-xs font-mono transition-colors ${
                hasLiked
                  ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] cursor-default"
                  : "hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--ink)] cursor-pointer"
              }`}
              title="Give a star/like to Sanghpal's projects"
            >
              <span>✦</span>
              <span>{likes} {likes === 1 ? "Star" : "Stars"}</span>
            </button>
          )}
        </div>
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
              <Pill status={project.status} />
              <div className="tags">
                {project.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
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
