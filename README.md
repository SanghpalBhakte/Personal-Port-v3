# Sanghpal Bhakte — Portfolio

> Personal portfolio and builder field notes for **Sanghpal Bhakte**, built with **Next.js 15 (App Router)**, **TypeScript**, and serverless API route handlers, optimized for deployment on **Vercel**.

---

## ✦ Overview

This repository houses the full-stack web application for Sanghpal Bhakte's portfolio. It presents selected work, methodologies, tools, and visual experiments in a quiet, typography-first editorial format.

### Features
- **Editorial Layout & Design**: Clean typography using Google Fonts `DM Sans` & `DM Mono` via `next/font/google`.
- **Custom Cursor Interaction**: Cursor follower dot and ring with fine-pointer and reduced-motion detection.
- **Serverless API Routes**:
  - `POST /api/contact`: Direct message handler with Zod validation, honeypot spam protection, rate limiting, and email dispatch.
  - `GET / POST /api/stats`: Visitor counts and project reactions with Upstash Redis persistence (or ephemeral in-memory fallback).
  - `GET /api/projects`: Structured endpoint returning current project listings.
  - `GET /api/health`: Uptime and feature diagnostics.
- **Edge Middleware**: Enforces security headers (Content Security Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy).
- **SEO Ready**: Automated dynamic `sitemap.ts`, `robots.ts`, and JSON-LD schema markup.

---

## 🛠️ Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Self-contained semantic CSS with CSS variables
- **Database / KV (Optional)**: Upstash Redis via `@upstash/redis`
- **Rate Limiting (Optional)**: `@upstash/ratelimit`
- **Email Service (Optional)**: Resend via `resend`
- **Validation**: Zod
- **Hosting Target**: Vercel

---

## 📁 Repository Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # Contact form submission endpoint
│   │   ├── health/route.ts       # Health check and feature flags endpoint
│   │   ├── projects/route.ts     # Project metadata endpoint
│   │   └── stats/route.ts        # Views and project likes endpoint
│   ├── globals.css               # Editorial CSS styles and animations
│   ├── icon.svg                  # Favicon SVG asset for Next.js metadata
│   ├── layout.tsx                # Fonts, metadata, JSON-LD schema
│   ├── page.tsx                  # Single-page layout
│   ├── robots.ts                 # Dynamic robots.txt
│   └── sitemap.ts                # Dynamic sitemap generator
├── components/
│   ├── ui/
│   │   ├── Button.tsx            # Button primitive
│   │   ├── Pill.tsx              # Status pill primitive
│   │   └── Tag.tsx               # Tech tag primitive
│   ├── ContactSection.tsx        # Footer, social links, copy email, note form
│   ├── CustomCursor.tsx          # Interactive cursor dot and ring
│   ├── Header.tsx                # Top navigation and wordmark
│   ├── Hero.tsx                  # Hero section
│   ├── HowIWork.tsx              # Work principles and manifesto
│   ├── NowAndArchive.tsx         # Active builds and archive links
│   ├── SelectedWork.tsx          # Project showcase
│   ├── Toast.tsx                 # Toast notification system
│   ├── Toolbox.tsx               # Tech stack grouping
│   └── VisualWork.tsx            # Design links to Behance
├── lib/
│   ├── data.ts                   # Portfolio content and project data
│   ├── db.ts                     # Upstash Redis client with memory fallback
│   ├── email.ts                  # Resend email dispatcher with logging fallback
│   └── rate-limit.ts             # Distributed rate limiter with memory fallback
├── public/
│   └── favicon.svg               # Static SVG icon
├── types/
│   └── index.ts                  # Shared TypeScript interfaces
├── .editorconfig                 # Formatting rules
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── CHANGELOG.md                  # Release log
├── CONTRIBUTING.md               # Contribution workflow
├── LICENSE                       # MIT License
├── middleware.ts                 # Security headers and CSP middleware
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vercel.json                   # Cache policy configuration
```

---

## 💻 Local Development

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm (or pnpm / yarn)

### 2. Setup
```bash
# Navigate to the portfolio folder
cd portfolio

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Configuration

Copy `.env.example` to create `.env.local`:
```bash
cp .env.example .env.local
```

### Default / Zero-Config Behavior (Without Environment Variables)
If no environment variables are configured, the application functions fully with safe local fallbacks:
- **Stats**: Tracked in an in-memory counter during the session (resets on server restart).
- **Rate Limiting**: Tracked via an in-memory sliding window limiter.
- **Contact Submissions**: Stored in-memory and logged to the server console.

### Production Environment Variables (Optional)
To enable distributed persistence and live email notifications across serverless cold starts:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of your portfolio (e.g. `https://personal-port-v3.vercel.app`) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL (for distributed stats & rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |
| `RESEND_API_KEY` | Resend API key (for sending contact form emails) |
| `CONTACT_NOTIFICATION_EMAIL` | Target email address to receive contact notes (default: `sanghapal2006@gmail.com`) |

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/new), select **"Import Project"** and choose your repository (`SanghpalBhakte/Personal-Port-v3`).
3. (Optional) Add your environment variables in the Vercel project settings.
4. Click **"Deploy"**.

---

## 🔍 API Endpoints

- **`GET /api/health`**: Returns diagnostic information (uptime, environment, whether Redis / Resend are active).
- **`GET /api/projects`**: Returns structured portfolio project items.
- **`GET /api/stats`**: Returns view count and project likes along with storage mode (`"redis"` or `"memory"`).
- **`POST /api/stats`**: Increments views (`{ "action": "view" }`) or a project like (`{ "action": "like", "projectId": "clarity-desk" }`).
- **`POST /api/contact`**: Accepts `{ "name", "email", "message" }`, validates input, checks honeypot, and forwards notification.

---

## 🧪 Verification & Quality Checks

Run these commands to verify codebase integrity:

```bash
# Type check and lint
npm run lint

# Production build
npm run build
```

---

## 📄 License
[MIT](LICENSE) © 2026 Sanghpal Bhakte
