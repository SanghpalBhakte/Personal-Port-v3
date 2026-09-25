import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

/** basePath="/" on sub-pages so the section links jump back to the homepage. */
export const Header: React.FC<{ basePath?: string }> = ({ basePath = "" }) => {
  return (
    <header className="site-header">
      <Link href={`${basePath}#top`} className="wordmark" aria-label={basePath ? "Go to homepage" : "Go to top"}>
        SANGHPAL<br />BHAKTE
      </Link>
      <nav aria-label="Primary navigation">
        <Link href={`${basePath}#work`}>Work</Link>
        <Link href={`${basePath}#notes`}>Notes</Link>
        <Link href={`${basePath}#contact`}>Contact</Link>
      </nav>
      <span className="location">{siteConfig.location}</span>
    </header>
  );
};
