import React from "react";

interface PillProps {
  status: string;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ status, className = "" }) => {
  return (
    <b className={`font-mono text-[10px] leading-[1.35] font-medium text-[var(--accent)] whitespace-pre-line ${className}`}>
      {status}
    </b>
  );
};
