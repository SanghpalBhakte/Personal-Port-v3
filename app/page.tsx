import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { HowIWork } from "@/components/HowIWork";
import { VisualWork } from "@/components/VisualWork";
import { Toolbox } from "@/components/Toolbox";
import { NowAndArchive } from "@/components/NowAndArchive";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <SelectedWork />
        <HowIWork />
        <VisualWork />
        <Toolbox />
        <NowAndArchive />
      </main>
      <ContactSection />
    </>
  );
}
