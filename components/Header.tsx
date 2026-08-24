import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <Link href="#top" className="wordmark" aria-label="Go to top">
        SANGHPAL<br />BHÄKTE
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="#work">Work</Link>
        <Link href="#notes">Notes</Link>
        <Link href="#contact">Contact</Link>
      </nav>
      <span className="location">{siteConfig.location}</span>
    </header>
  );
};
