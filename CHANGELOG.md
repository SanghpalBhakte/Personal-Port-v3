# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-09-21

### Added
- Smart India Hackathon project ("Scheme Matching") added to Selected Work, reflecting the Research/Product/AI Lead role on a six-person team.
- Small abstract line-mark icon per project card for visual rhythm in place of screenshots.
- `app/opengraph-image.tsx` — generated social share image via `next/og`, so shared links render a branded preview.
- `:focus-visible` states for links and buttons site-wide.
- Tablet-range layout adjustments (901–1180px); mobile breakpoint widened from 760px to 900px so portrait tablets get the tuned mobile layout instead of a cramped desktop grid.
- "Featured" treatment for the lead project card.

### Changed
- Hero bio now surfaces the Smart India Hackathon leadership role.

### Removed
- Unused `components/ui/Button.tsx`, `Pill.tsx`, `Tag.tsx` — referenced Tailwind utility classes with no Tailwind build step in the project, and were never imported.

## [1.0.0] - 2026-08-25

### Added
- Complete Next.js 15 App Router architecture with TypeScript strict mode.
- Editorial typography system with Google Fonts `DM Sans` & `DM Mono`.
- Interactive custom cursor follower with accessibility support.
- Full-stack Serverless APIs:
  - `POST /api/contact` (Zod validation, honeypot spam protection, rate limiting, email delivery).
  - `GET/POST /api/stats` (Upstash Redis persistence with local fallback).
  - `GET /api/projects` (Structured project data).
  - `GET /api/health` (Uptime & environment monitoring).
- Edge middleware enforcing Content Security Policy (CSP), HSTS, and frame protections.
- Dynamic SEO `sitemap.ts`, `robots.ts`, and JSON-LD schema markup.
- UI primitives layer (`Button`, `Tag`, `Pill`, `Toast`).
- GitHub Actions CI workflow for build & type checking.
- Vercel one-click deployment configuration (`vercel.json`).
