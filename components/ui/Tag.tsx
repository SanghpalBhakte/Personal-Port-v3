import React from "react";

interface TagProps {
  label: string;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ label, className = "" }) => {
  return (
    <span
      className={`inline-block border border-[var(--rule)] rounded-full px-[9px] py-[4px] font-mono text-[10px] text-[var(--muted)] leading-none ${className}`}
    >
      {label}
    </span>
  );
};
