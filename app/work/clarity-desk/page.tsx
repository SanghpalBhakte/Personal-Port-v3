import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { projects, siteConfig } from "@/lib/data";

// Facts here come from the project data, the live app and the GitHub repo. Don't invent numbers or users.
const project = projects.find((p) => p.id === "clarity-desk");
const liveUrl = project?.link ?? "https://claritydesk.web.app";
const repoUrl = project?.repo ?? "https://github.com/SanghpalBhakte/Clarity-Desk";

// Put a short muted clip in /public/projects and set this, e.g. "/projects/clarity-desk-demo.mp4".
const demoSrc = "";

const title = "Clarity Desk case study";
const description =
  "How I planned and tested Clarity Desk, a mobile-first PWA that keeps a college week in one place for Indian students.";

export const metadata: Metadata = {
  title: `${title} | ${siteConfig.name}`,
  description,
  alternates: { canonical: "/work/clarity-desk" },
  openGraph: {
    type: "article",
    title: `${title} | ${siteConfig.name}`,
    description,
    url: "/work/clarity-desk",
    siteName: siteConfig.name,
  },
};

const features = [
  "Today page with timetable, tasks and attendance",
  "Subject Hubs, Tasks & Deadlines and a Calendar",
  "Study Vault for links and files you saved",
  "Daily Briefing: your day in one read",
  "Ask Desk, which answers from your own schedule and tasks",
  "Deadline import from pasted text or WhatsApp",
  "Reminders",
  "Attendance (built for my university only)",
  "Works offline, with optional Firebase sync",
];

const myWork = [
  "I decided what the first release should include: timetable, tasks, planner, reminders and attendance.",
  "I pushed the study timer and analytics back to a later version so the first one stayed small.",
  "I decided that importing deadlines from WhatsApp must not store anyone’s chat data. You paste or share a message, check the tasks it finds, and confirm before anything is saved.",
  "I reviewed and tested what the AI tools wrote. The repo has over 1,100 commits and automated Playwright tests.",
];

const improvements = [
  "Keep learning from the students who have started using it, and change the app based on what they say.",
  "Make attendance work for more colleges. It is built for my university only.",
  "Add the study timer and analytics I pushed back.",
];

export default function ClarityDeskCaseStudy() {
  return (
    <>
      <Header basePath="/" />
      <main id="top" className="case">
        <Link href="/#work" className="case-back">
          <span aria-hidden="true">←</span> All work
        </Link>

        <section className="case-hero section-rule" aria-labelledby="case-title">
          <p className="eyebrow">Case study · Personal project</p>
          <h1 id="case-title">Clarity Desk</h1>
          <p className="case-lede">
            A mobile-first app for Indian college students that keeps timetable, tasks and attendance in one place.
          </p>
          <dl className="case-facts">
            <div>
              <dt>My role</dt>
              <dd>Product decisions &amp; testing</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>AI coding tools</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Installable web app (PWA)</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>In development, active testing</dd>
            </div>
          </dl>
          <a className="case-cta" href={liveUrl} target="_blank" rel="noreferrer">
            Open the app <span aria-hidden="true">↗</span>
          </a>
          <a className="project-shot case-shot" href={liveUrl} target="_blank" rel="noreferrer" tabIndex={-1}>
            <Image
              src="/projects/clarity-desk.webp"
              alt="Clarity Desk’s Today page showing timetable, tasks and attendance"
              width={1280}
              height={800}
              sizes="(max-width: 900px) 90vw, 860px"
              priority
            />
          </a>
          {demoSrc && (
            <video className="case-demo" src={demoSrc} autoPlay muted loop playsInline preload="metadata" aria-label="Short demo of Clarity Desk" />
          )}
        </section>

        <section className="case-section section-rule" aria-labelledby="case-what">
          <p className="eyebrow">01 / What it is</p>
          <div>
            <h2 id="case-what">One place for a college week.</h2>
            <p>
              Clarity Desk is a progressive web app (PWA) for Indian college students. You can install it on
              your phone and use it like an app. It has:
            </p>
            <ul className="case-list">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-problem">
          <p className="eyebrow">02 / The problem</p>
          <div>
            <h2 id="case-problem">Too many apps for one week.</h2>
            <p>
              My college ERP sometimes goes offline, so I couldn&rsquo;t check my attendance. The daily
              timetable and college updates came in WhatsApp. My tasks were somewhere else and my subject
              notes were spread across Google Drive.
            </p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-why">
          <p className="eyebrow">03 / Why I made it</p>
          <div>
            <h2 id="case-why">Why I started building it.</h2>
            <p>
              I started it to fix my own problem: switching between the ERP, WhatsApp, a task app and Drive
              just to plan one day. I wanted to open one place and see today&rsquo;s classes, today&rsquo;s
              tasks and my attendance, and to see how my attendance changes if I attend or miss a class.
            </p>
            <p>
              I found similar apps only after I had the idea. I&rsquo;m not saying Clarity Desk is better
              than them. It is the tool I wanted for my own college week.
            </p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-did">
          <p className="eyebrow">04 / What I did</p>
          <div>
            <h2 id="case-did">What I decided and tested.</h2>
            <ul className="case-list">
              {myWork.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-claude">
          <p className="eyebrow">05 / What AI tools did</p>
          <div>
            <h2 id="case-claude">AI tools wrote most of the code.</h2>
            <p>
              I did not write most of the code myself. AI coding tools did. I told them what to build, then
              reviewed and tested the result.
            </p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-tools">
          <p className="eyebrow">06 / Tools</p>
          <div>
            <h2 id="case-tools">What it is made with.</h2>
            <p>Vanilla JavaScript, Firebase and PWA features (a service worker and a web manifest, so it installs on a phone). Playwright for automated tests. Code written with AI coding tools.</p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-improve">
          <p className="eyebrow">07 / What I would improve</p>
          <div>
            <h2 id="case-improve">What I would do next.</h2>
            <ul className="case-list">
              {improvements.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-links">
          <p className="eyebrow">08 / Links</p>
          <div>
            <h2 id="case-links">See it yourself.</h2>
            <ul className="case-list">
              <li>
                <a href={liveUrl} target="_blank" rel="noreferrer">Live app</a>
              </li>
              <li>
                <a href={repoUrl} target="_blank" rel="noreferrer">Code on GitHub</a>
              </li>
            </ul>
          </div>
        </section>

        <nav className="case-end" aria-label="Case study navigation">
          <a className="case-cta" href={liveUrl} target="_blank" rel="noreferrer">
            Open the app <span aria-hidden="true">↗</span>
          </a>
          <Link href="/#work" className="case-back">
            <span aria-hidden="true">←</span> Back to all work
          </Link>
        </nav>
      </main>
      <ContactSection />
    </>
  );
}
