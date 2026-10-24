import { Project, NoteItem, VisualWorkItem, ToolGroup, ArchiveLink } from "@/types";

export const siteConfig = {
  name: "Sanghpal Bhakte",
  title: "Sanghpal Bhakte | Portfolio",
  description: "I’m Sanghpal, a second-year AI & Data Science student from Chhatrapati Sambhajinagar. I build web apps and small tools for students and small teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sanghpal-portfolio.vercel.app",
  location: "CHH. SAMBHAJINAGAR / INDIA",
  locationCity: "Chhatrapati Sambhajinagar",
  coordinates: "19.8762° N, 75.3433° E",
  tagline: "I build the boring systems that make everything else work.",
  bio: "I’m a second-year AI & Data Science student from Chhatrapati Sambhajinagar. I like building tools that make everyday work a bit easier for students and small teams. Recently I led research and product for my team’s Smart India Hackathon project.",
  nowStatus: "Currently building Clarity Desk and Sweep.",
  nowBio: "I’m also learning more about AI-assisted development, workflow automation, web apps, and product design.",
  version: "1.1.0",
  contactEmail: "sanghapal2006@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/SanghpalBhakte" },
    { name: "Behance", url: "https://www.behance.net/SonuGames" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sanghpal-bhakte-054b91367/" },
    { name: "WhatsApp", url: "https://wa.me/917219000357" },
    { name: "Email", url: "mailto:sanghapal2006@gmail.com" },
  ],
};

export const projects: Project[] = [
  {
    id: "clarity-desk",
    number: "01",
    kind: "Student productivity PWA",
    title: "Clarity\nDesk",
    description: "One place for a college week: timetable, attendance, tasks, and resources. Made for Indian students who are tired of jumping between apps.",
    note: "Previously called Campus OS.",
    status: "IN DEVELOPMENT /\nACTIVE TESTING",
    tags: ["Vanilla JavaScript", "Firebase", "PWA"],
    link: "https://campusos-83365.web.app/#dashboard",
    linkText: "View live",
    image: "/projects/clarity-desk.webp",
    imageAlt: "Clarity Desk’s Today page showing timetable, tasks and attendance",
  },
  {
    id: "scheme-matching",
    number: "02",
    kind: "Scheme matching app",
    title: "Scheme\nSetu",
    description: "A web app that helps first-time and marginalised entrepreneurs find government schemes they qualify for, and shows why each one matches. I led research, product and the matching approach.",
    status: "SMART INDIA HACKATHON /\nTEAM OF 6",
    tags: ["Research", "Product lead", "Rule-based matching"],
    link: "https://sih-ai-scheme-matcher-v2.vercel.app/",
    linkText: "View live",
    image: "/projects/scheme-setu.webp",
    imageAlt: "Scheme Setu’s home page",
    caseStudy: "/work/scheme-setu",
  },
  {
    id: "sweep",
    number: "03",
    kind: "Subscription tracker",
    title: "Sweep",
    description: "A simple way to keep track of subscriptions and regular payments in one place. I’m keeping it calm and easy to read.",
    status: "IN DEVELOPMENT /\nACTIVE REDESIGN",
    tags: ["Product design", "Dashboard UX"],
    link: "https://sift-sand.vercel.app/",
    linkText: "View live",
    image: "/projects/sweep.webp",
    imageAlt: "Sweep’s overview screen",
  },
  {
    id: "rivet",
    number: "04",
    kind: "Tool for a service team",
    title: "Rivet",
    description: "A small tool that helps a service team keep track of follow-ups and the status of each job.",
    status: "IN DEVELOPMENT /\nPROTOTYPE",
    tags: ["Internal tool", "Work tracking"],
    linkText: "Work in progress",
  },
  {
    id: "janai-tours",
    number: "05",
    kind: "Travel agency website",
    title: "Janai Tours\n& Travels",
    description: "A website for a travel agency, plus a few ideas to make their enquiries and trip planning easier. Still in progress.",
    status: "IN\nDEVELOPMENT",
    tags: ["Website", "Workflows"],
    linkText: "Private prototype",
  },
];

export const notes: NoteItem[] = [
  {
    number: "01",
    title: "Look closely first",
    description: "I start by noticing where something gets confusing or repetitive before deciding what to make.",
  },
  {
    number: "02",
    title: "Keep it simple",
    description: "A clear layout and good defaults matter more to me than adding extra features.",
  },
  {
    number: "03",
    title: "Learn by doing",
    description: "I build something, use it, notice what feels off and fix it. Then I do that again.",
  },
];

// Covers live in /public/design and come from `npm run covers` (scripts/fetch-covers.mjs).
// Years are the "Published" date on each Behance gallery.
export const visualWorks: VisualWorkItem[] = [
  {
    id: "campus-work",
    title: "Campus Design Work",
    url: "https://www.behance.net/gallery/257518891/Campus-Design-Work-IEEE-and-T-P-Cell-JNEC",
    image: "/design/campus-work.webp",
    year: "2026",
    featured: true,
  },
  {
    id: "esummit",
    title: "E-Summit JNEC",
    url: "https://www.behance.net/gallery/252873023/E-Summit-JNEC-Social-Media-Graphic-Design-Showcase",
    image: "/design/esummit.webp",
    year: "2026",
  },
  {
    id: "valorant",
    title: "Valorant Thumbnails",
    url: "https://www.behance.net/gallery/119930005/Valorant-Thumbnails",
    image: "/design/valorant.webp",
    year: "2021",
  },
  {
    id: "fortnite",
    title: "Fortnite Thumbnails",
    url: "https://www.behance.net/gallery/110221073/Fortnite-Thumbnails",
    image: "/design/fortnite.webp",
    year: "2020",
  },
  {
    id: "irl",
    title: "IRL Thumbnails",
    url: "https://www.behance.net/gallery/112701177/IRL-Thumbnails",
    image: "/design/irl.webp",
    year: "2021",
  },
];

export const toolGroups: ToolGroup[] = [
  {
    category: "Build",
    items: "JavaScript · TypeScript · React · Next.js · HTML · CSS · Tailwind CSS",
  },
  {
    category: "Data & deploy",
    items: "Firebase · Firestore · Supabase · Vercel · Netlify · Cloudflare Pages",
  },
  {
    category: "Tools & AI",
    items: "GitHub · Notion · Claude · Gemini · Groq · Perplexity · Wix Studio",
  },
];

export const archives: ArchiveLink[] = [
  {
    title: "Portfolio / Vercel",
    platform: "Vercel",
    url: "https://sanghpalport.vercel.app/",
  },
  {
    title: "Portfolio / Netlify",
    platform: "Netlify",
    url: "https://sanghpalportfolio.netlify.app/",
  },
];
