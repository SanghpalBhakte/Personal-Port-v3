import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { projects, siteConfig } from "@/lib/data";

// Every fact on this page comes from the live prototype or from the project data.
// Nothing here is an invented metric or outcome — keep it that way when editing.
const project = projects.find((p) => p.id === "scheme-matching");
const liveUrl = project?.link ?? "https://sih-ai-scheme-matcher-v2.vercel.app/";

const title = "Scheme Setu — case study";
const description =
  "How Scheme Setu helps marginalised and first-time entrepreneurs find the government schemes they actually qualify for, and shows why. A Smart India Hackathon prototype (SIH26092).";

export const metadata: Metadata = {
  title: `${title} · ${siteConfig.name}`,
  description,
  alternates: { canonical: "/work/scheme-setu" },
  openGraph: {
    type: "article",
    title: `${title} · ${siteConfig.name}`,
    description,
    url: "/work/scheme-setu",
    siteName: siteConfig.name,
  },
};

const decisions = [
  {
    lead: "Explainable, not a black box.",
    body: "Matching runs on a transparent, deterministic scoring engine. Every score traces back to a documented eligibility rule, so an applicant can see why a scheme was suggested instead of trusting a chatbot's guess.",
  },
  {
    lead: "Show the why for every scheme.",
    body: "Each result is marked Likely eligible, Possibly eligible, Low match or Insufficient information, with the criteria it met, missed or still needs verified.",
  },
  {
    lead: "Match the business, not just the person.",
    body: "Scores weigh business sector, stage and first-time status alongside category, gender, state and income, so results reflect where the venture actually stands.",
  },
  {
    lead: "Only real schemes.",
    body: "The dataset holds 34 verified Government of India schemes, each linked to the official page that defines it. No invented data.",
  },
  {
    lead: "Meet people where they are.",
    body: "The assessment and results work in 12 Indian languages, the app can be installed and used offline, and it points to the nearest Common Service Centre for help in person.",
  },
];

const features = [
  "A four-step assessment — basic profile, business, finances and needs — plus demo profiles that jump straight to results",
  "Ranked recommendations with matched, missing and to-verify criteria for each scheme",
  "A searchable catalogue of every scheme, usable without an assessment",
  "Saved schemes, an EMI calculator and a partners page",
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
            Helping marginalised and first-time entrepreneurs find the government schemes they actually
            qualify for — and see exactly why.
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
              alt="Scheme Setu homepage: find the government schemes you're actually eligible for"
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
            <h2 id="case-problem">The schemes exist. Finding yours is the hard part.</h2>
            <p>
              A central government portal already lists thousands of schemes, but working out which ones you
              qualify for means reading dense eligibility rules one listing at a time. That is hardest for the
              people these schemes are meant for: women, SC/ST and OBC, rural, low-income and first-time
              entrepreneurs.
            </p>
            <p>
              Smart India Hackathon problem statement SIH26092 asked for AI-driven scheme matching for exactly
              this group.
            </p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-role">
          <p className="eyebrow">02 / My role</p>
          <div>
            <h2 id="case-role">Research, product and AI lead.</h2>
            <p>
              Scheme Setu was built by a six-person team. I led the research, the product direction and the
              approach to matching — what the tool should do, who it is for, and how it decides.
            </p>
          </div>
        </section>

        <section className="case-section section-rule" aria-labelledby="case-decisions">
          <p className="eyebrow">03 / Key decisions</p>
          <div>
            <h2 id="case-decisions">Trust first, then everything else.</h2>
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
            <h2 id="case-built">A guided path, not a search box.</h2>
            <ul className="case-list">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="case-note">
              It&rsquo;s a hackathon prototype, not an official government service. Recommendations are a
              starting point — applicants are always pointed to the scheme&rsquo;s official source to verify.
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
