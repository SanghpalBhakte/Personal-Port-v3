"use client";

import React, { useEffect, useState } from "react";

const formatTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
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
