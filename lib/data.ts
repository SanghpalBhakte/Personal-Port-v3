import { Project, NoteItem, VisualWorkItem, ToolGroup, ArchiveLink } from "@/types";

export const siteConfig = {
  name: "Sanghpal Bhakte",
  title: "Sanghpal Bhakte — Builder's field notes",
  description: "Sanghpal Bhakte — student builder creating practical systems for simpler workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sanghpal-portfolio.vercel.app",
  location: "CHH. SAMBHAJINAGAR / INDIA",
  locationCity: "Chhatrapati Sambhajinagar",
  coordinates: "19.8762° N, 75.3433° E",
  tagline: "I build the boring systems that make everything else work.",
  bio: "I’m a second-year AI & Data Science student in Chhatrapati Sambhajinagar. I build tools that help students and small teams stay on top of everyday work — most recently leading research and product for my team’s Smart India Hackathon build.",
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
  },
  {
    id: "scheme-matching",
    number: "02",
    kind: "AI matchmaking system · Smart India Hackathon",
    title: "Scheme\nSetu",
    description: "An AI system that matches marginalized entrepreneurs with the government schemes they actually qualify for. Built with a six-person team for Smart India Hackathon — I led research, product direction, and the AI approach.",
    status: "SMART INDIA HACKATHON /\nTEAM OF 6",
    tags: ["AI & ML", "Research", "Product lead"],
    link: "https://sih-ai-scheme-matcher-v2.vercel.app/",
    linkText: "View live",
  },
  {
    id: "sweep",
    number: "03",
    kind: "Subscription & finance product",
    title: "Sweep",
    description: "A simpler way to keep track of subscriptions and everyday money — designed to feel calm, not like another busy dashboard.",
    status: "IN DEVELOPMENT /\nACTIVE REDESIGN",
    tags: ["Product design", "Dashboard UX"],
    link: "https://sift-sand.vercel.app/",
    linkText: "View live",
  },
  {
    id: "rivet",
    number: "04",
    kind: "Service operations system",
    title: "Rivet",
    description: "A small system for keeping track of follow-ups, work status, and the everyday details that keep a service team moving.",
    status: "IN DEVELOPMENT /\nPROTOTYPE",
    tags: ["Operations design", "Internal tools"],
    linkText: "Link coming soon.",
  },
  {
    id: "janai-tours",
    number: "05",
    kind: "Travel agency website & workflows",
    title: "Janai Tours\n& Travels",
    description: "A website and a few workflow ideas for a travel agency. Still taking shape around clearer enquiries and planning.",
    status: "IN\nDEVELOPMENT",
    tags: ["Website", "Workflow exploration"],
    linkText: "Link coming soon.",
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
    title: "Keep the screen quiet",
    description: "Good defaults, clear order, and less noise usually matter more than adding another feature.",
  },
  {
    number: "03",
    title: "Learn through the work",
    description: "I build, test, notice what feels off, and come back with a better question.",
  },
];

// Each thumbnail URL below was verified with a direct HTTP request (HTTP 200 + image
// content-type) before being added — never guessed. To add another piece from Behance,
// verify its cover image the same way and paste the confirmed URL; leave thumbnail: ""
// (VisualWork.tsx falls back to a plain card) if you can't verify one yet.
export const visualWorks: VisualWorkItem[] = [
  {
    id: "esummit",
    category: "graphics",
    eyebrow: "E-Summit / social media",
    title: "E-Summit\ngraphics",
    description: "A selection of social-media and event design work for E-Summit.",
    url: "https://www.behance.net/gallery/252873023/E-Summit-Social-Media-Graphic-Design-Showcase",
    ctaText: "VIEW PROJECT ↗",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/fd5efd252873023.Y3JvcCwzMzc1LDI2MzksMCw5Mjc.jpg",
  },
  {
    id: "fortnite",
    category: "thumbnails",
    eyebrow: "Freelance / thumbnails",
    title: "Fortnite\nthumbnails",
    description: "Freelance thumbnail work made for quick, clear visual impact.",
    url: "https://www.behance.net/gallery/110221073/Fortnite-Thumbnails",
    ctaText: "VIEW PROJECT ↗",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/20a210110221073.Y3JvcCwxMDA3LDc4OCwzODksMA.png",
  },
  {
    id: "irl-thumbnails",
    category: "thumbnails-study",
    eyebrow: "Thumbnail study",
    title: "IRL\nthumbnails",
    description: "A collection of thumbnail design work.",
    url: "https://www.behance.net/gallery/112701177/IRL-Thumbnails",
    ctaText: "VIEW PROJECT ↗",
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
    category: "Thinking & making",
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
