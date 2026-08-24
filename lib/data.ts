import { Project, NoteItem, VisualWorkItem, ToolGroup, ArchiveLink } from "@/types";

export const siteConfig = {
  name: "Sanghpal Bhakte",
  title: "Sanghpal Bhakte — Builder's field notes",
  description: "Sanghpal Bhakte — student builder creating practical systems for simpler workflows.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sanghpal.dev",
  ogImage: "/og-image.png",
  location: "CHH. SAMBHAJINAGAR / INDIA",
  originCity: "Nagpur",
  tagline: "I build the boring systems that make everything else work.",
  bio: "I’m a second-year AI & Data Science student in Chhatrapati Sambhajinagar. I make tools that help students and small teams stay on top of everyday work.",
  nowStatus: "Currently building Clarity Desk and Sweep.",
  nowBio: "I’m also learning more about AI-assisted development, workflow automation, web apps, and product design.",
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
    linkText: "Link coming soon.",
  },
  {
    id: "sweep",
    number: "02",
    kind: "Subscription & finance product",
    title: "Sweep",
    description: "A simpler way to keep track of subscriptions and everyday money — designed to feel calm, not like another busy dashboard.",
    status: "IN DEVELOPMENT /\nACTIVE REDESIGN",
    tags: ["Product design", "Dashboard UX"],
    linkText: "Private work in progress.",
  },
  {
    id: "rivet",
    number: "03",
    kind: "Service operations system",
    title: "Rivet",
    description: "A small system for keeping track of follow-ups, work status, and the everyday details that keep a service team moving.",
    status: "IN DEVELOPMENT /\nPROTOTYPE",
    tags: ["Operations design", "Internal tools"],
    linkText: "Link coming soon.",
  },
  {
    id: "janai-tours",
    number: "04",
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

export const visualWorks: VisualWorkItem[] = [
  {
    id: "esummit",
    category: "graphics",
    eyebrow: "E-Summit / social media",
    title: "E-Summit\ngraphics",
    description: "A selection of social-media and event design work for E-Summit.",
    url: "https://www.behance.net/gallery/252873023/E-Summit-Social-Media-Graphic-Design-Showcase",
    ctaText: "VIEW PROJECT ↗",
  },
  {
    id: "fortnite",
    category: "thumbnails",
    eyebrow: "Freelance / thumbnails",
    title: "Fortnite\nthumbnails",
    description: "Freelance thumbnail work made for quick, clear visual impact.",
    url: "https://www.behance.net/gallery/110221073/Fortnite-Thumbnails",
    ctaText: "VIEW PROJECT ↗",
  },
  {
    id: "irl-thumbnails",
    category: "thumbnails-study",
    eyebrow: "Thumbnail study",
    title: "IRL\nthumbnails",
    description: "A collection of thumbnail design work.",
    url: "https://www.behance.net/gallery/112701177/IRL-Thumbnails",
    ctaText: "VIEW PROJECT ↗",
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
