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
    kind: "Scheme matching app · Smart India Hackathon",
    title: "Scheme\nSetu",
    description: "A web app that helps first-time and marginalised entrepreneurs find government schemes they qualify for, and shows why each one matches. We built it as a team of six for Smart India Hackathon. I led research, product and the matching approach.",
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

// Each thumbnail URL below was verified with a direct HTTP request (HTTP 200 + image
// content-type) before being added, never guessed. To add another piece from Behance,
// verify its cover image the same way and paste the confirmed URL; leave thumbnail: ""
// (VisualWork.tsx falls back to a plain card) if you can't verify one yet.
export const visualWorks: VisualWorkItem[] = [
  {
    id: "esummit",
    category: "graphics",
    eyebrow: "E-Summit / social media",
    title: "E-Summit\ngraphics",
    description: "Social media posts and event graphics I made for E-Summit.",
    url: "https://www.behance.net/gallery/252873023/E-Summit-Social-Media-Graphic-Design-Showcase",
    ctaText: "VIEW ON BEHANCE ↗",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/fd5efd252873023.Y3JvcCwzMzc1LDI2MzksMCw5Mjc.jpg",
  },
  {
    id: "fortnite",
    category: "thumbnails",
    eyebrow: "Freelance / thumbnails",
    title: "Fortnite\nthumbnails",
    description: "Thumbnails I made for Fortnite videos as freelance work.",
    url: "https://www.behance.net/gallery/110221073/Fortnite-Thumbnails",
    ctaText: "VIEW ON BEHANCE ↗",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/20a210110221073.Y3JvcCwxMDA3LDc4OCwzODksMA.png",
  },
  {
    id: "irl-thumbnails",
    category: "thumbnails-study",
    eyebrow: "Thumbnail study",
    title: "IRL\nthumbnails",
    description: "Thumbnails I designed for IRL videos.",
    url: "https://www.behance.net/gallery/112701177/IRL-Thumbnails",
    ctaText: "VIEW ON BEHANCE ↗",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/c7ec01112701177.Y3JvcCw1MzEsNDE1LDQ1NSwxNQ.png",
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
