export interface Project {
  id: string;
  number: string;
  kind: string;
  title: string;
  description: string;
  note?: string;
  status: string;
  tags: string[];
  link?: string;
  linkText?: string;
  /** Screenshot in /public/projects, captured from the live app. */
  image?: string;
  imageAlt?: string;
  /** Internal case-study route, e.g. /work/scheme-setu */
  caseStudy?: string;
}

export interface NoteItem {
  number: string;
  title: string;
  description: string;
}

export interface VisualWorkItem {
  id: string;
  category: string;
  eyebrow: string;
  title: string;
  description: string;
  url: string;
  ctaText: string;
  /** Verified Behance CDN cover image URL. Leave "" if not independently verified — never guess one. */
  thumbnail: string;
}

export interface ToolGroup {
  category: string;
  items: string;
}

export interface ArchiveLink {
  title: string;
  platform: string;
  url: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  _gotcha?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  errors?: Record<string, string[]>;
  /** Set when the note could not be delivered anywhere durable (no email / no Redis configured). */
  code?: "delivery_unavailable";
}

export interface HealthResponse {
  status: "ok" | "degraded" | "error";
  uptime: number;
  timestamp: string;
  service: string;
  environment: string;
  features: {
    redis: boolean;
    resend: boolean;
  };
}
