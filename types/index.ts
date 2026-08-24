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
}

export interface StatsData {
  totalViews: number;
  projectLikes: Record<string, number>;
  storage: "redis" | "memory";
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

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
