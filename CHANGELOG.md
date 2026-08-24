# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
