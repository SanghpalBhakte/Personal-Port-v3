import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { projects, siteConfig } from "@/lib/data";

// Every fact on this page comes from the live prototype or from the project data.
// Don't add made-up numbers or results when editing.
const project = projects.find((p) => p.id === "scheme-matching");
const liveUrl = project?.link ?? "https://sih-ai-scheme-matcher-v2.vercel.app/";

const title = "Scheme Setu case study";
const description =
  "How we built Scheme Setu for Smart India Hackathon (SIH26092), a web app that helps first-time and marginalised entrepreneurs find government schemes they qualify for.";

export const metadata: Metadata = {
  title: `${title} | ${siteConfig.name}`,
  description,
  alternates: { canonical: "/work/scheme-setu" },
  openGraph: {
    type: "article",
    title: `${title} | ${siteConfig.name}`,
    description,
    url: "/work/scheme-setu",
    siteName: siteConfig.name,
  },
};

const decisions = [
  {
    lead: "Matching you can check.",
    body: "It uses clear scoring rules. Every score comes from a written eligibility rule, so people can see why a scheme was suggested instead of just trusting a chatbot.",
  },
  {
    lead: "Every result explains itself.",
    body: "Each scheme is marked Likely eligible, Possibly eligible, Low match or Insufficient information, along with what matched, what didn’t and what still needs checking.",
  },
  {
    lead: "It looks at the business too.",
    body: "Scores use the business sector, its stage and whether it’s someone’s first business, along with category, gender, state and income.",
  },
  {
    lead: "Only real schemes.",
    body: "We used 34 verified Government of India schemes, and each one links to its official page.",
  },
  {
    lead: "Easy for more people to use.",
    body: "It works in 12 Indian languages, can be installed and used offline, and shows the nearest Common Service Centre for anyone who wants help in person.",
  },
];

const features = [
  "Fill a short 4 step form (basic profile, business, finances, needs) or try one of the demo profiles",
  "See ranked results with what matched and what’s missing for each scheme",
  "Search the full list of schemes without filling the form",
  "Save schemes, use the EMI calculator and see partner organisations",
];

export default function SchemeSetuCaseStudy() {
  return (
    <>
      <Header basePath="/" />
      <main id="top" className="case">
        <Link href="/#work" className="case-back">
          <span aria-hidden="true">←</span> All work
        </Link>

        <section className="case-hero section-rule" aria-labelledby="case-title">
          <p className="eyebrow">Case study · Smart India Hackathon · SIH26092</p>
          <h1 id="case-title">Scheme Setu</h1>
          <p className="case-lede">
            A web app that helps first-time and marginalised entrepreneurs find government schemes they
            qualify for, and shows them why.
          </p>
          <dl className="case-facts">
            <div>
              <dt>My role</dt>
              <dd>Research, product &amp; AI lead</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>Six people</dd>
            </div>
            <div>
              <dt>Built for</dt>
              <dd>Smart India Hackathon</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Working prototype</dd>
            </div>
          </dl>
          <a className="case-cta" href={liveUrl} target="_blank" rel="noreferrer">
            Try the prototype <span aria-hidden="true">↗</span>
          </a>
          <a className="project-shot case-shot" href={liveUrl} target="_blank" rel="noreferrer" tabIndex={-1}>
            <Image
              src="/projects/scheme-setu.webp"
              alt="Scheme Setu’s home page"
              width={1280}
              height={800}
              sizes="(max-width: 900px) 90vw, 860px"
              priority
            />
          </a>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-problem">
          <p className="eyebrow">01 / The problem</p>
          <div>
            <h2 id="case-problem">Finding the right scheme is hard.</h2>
            <p>
              There are thousands of government schemes listed online, but figuring out which ones you
              actually qualify for means reading long eligibility rules one by one. That&rsquo;s hardest
              for the people these schemes are made for: women, SC/ST and OBC, rural, low-income and
              first-time entrepreneurs.
            </p>
            <p>
              Our Smart India Hackathon problem statement (SIH26092) asked for an AI-driven way to match
              these entrepreneurs with the right schemes.
            </p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-role">
          <p className="eyebrow">02 / My role</p>
          <div>
            <h2 id="case-role">Research, product and AI lead.</h2>
            <p>
              We were a team of six. I led research, product and the AI side, which meant working out who
              we were building for, what the app should do and how the matching should work.
            </p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-decisions">
          <p className="eyebrow">03 / Key decisions</p>
          <div>
            <h2 id="case-decisions">What we decided and why.</h2>
            <ul className="case-list">
              {decisions.map((d) => (
                <li key={d.lead}>
                  <b>{d.lead}</b> {d.body}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-built">
          <p className="eyebrow">04 / What&rsquo;s in the prototype</p>
          <div>
            <h2 id="case-built">What you can do in it.</h2>
            <ul className="case-list">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="case-note">
              This is a hackathon prototype, not an official government site. The app always asks people
              to confirm details on the scheme&rsquo;s official page before applying.
            </p>
          </div>
        </section>

        <nav className="case-end" aria-label="Case study navigation">
          <a className="case-cta" href={liveUrl} target="_blank" rel="noreferrer">
            Try the prototype <span aria-hidden="true">↗</span>
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
