"use client";

import React, { useEffect, useState } from "react";

const formatTime = () =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(new Date());

export const LocalClock: React.FC = () => {
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    setTime(formatTime());
    const id = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hero-submeta" suppressHydrationWarning>
      {time} IST
    </span>
  );
};
