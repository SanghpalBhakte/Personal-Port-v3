# Sanghpal Bhakte — Full-Stack Portfolio

> Production-grade, full-stack portfolio web application built with **Next.js 15 (App Router)**, **TypeScript**, and **Serverless APIs**, styled with an editorial/brutalist design aesthetic and fully optimized for one-click hosting on **Vercel**.

---

## ⚡ Features

- **Editorial Design System**: Typography-first aesthetic using Google Fonts `DM Sans` & `DM Mono`, dynamic grid layouts, fluid typography (`clamp()`), and customized micro-interactions.
- **Custom Cursor Interaction**: Subtle cursor dot & follower ring with hover detection for interactive elements and automatic reduced-motion accessibility support.
- **Full-Stack Serverless APIs**:
  - `POST /api/contact`: Form submission handling with Zod validation, hidden honeypot spam traps, distributed rate limiting, email notifications (Resend), and persistent storage.
  - `GET / POST /api/stats`: Real-time visitor counts and interactive project reaction/star counters with persistent storage.
  - `GET /api/projects`: REST endpoint serving dynamic project portfolio data.
  - `GET /api/health`: Uptime and system monitoring endpoint.
- **Distributed Persistence & Rate Limiting**:
  - Configured for **Upstash Redis / Vercel KV** with automatic fallback to an in-memory store for local development.
  - Rate limiting per IP to prevent spam and abuse.
- **Edge Security & Performance**:
  - Edge middleware (`middleware.ts`) enforcing Content Security Policy (CSP), HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.
  - Automated dynamic `sitemap.ts` and `robots.ts` generation for SEO.
  - Structured JSON-LD metadata for search engine optimization (`Person`, `WebSite`).
  - Zero-layout-shift font optimization via `next/font/google`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: Modern CSS variables & responsive layout grids
- **Database & Persistence**: [Upstash Redis](https://upstash.com/) / [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (with memory fallback)
- **Rate Limiting**: [@upstash/ratelimit](https://github.com/upstash/ratelimit)
- **Email Service**: [Resend](https://resend.com/) (with logger fallback)
- **Validation**: [Zod](https://zod.dev/)
- **Deployment Platform**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # Contact form submission endpoint
│   │   ├── stats/route.ts        # Visitor views & project stars endpoint
│   │   ├── projects/route.ts     # Dynamic projects list endpoint
│   │   └── health/route.ts       # Health check / uptime endpoint
│   ├── layout.tsx                # Google fonts, JSON-LD Schema & root layout
│   ├── page.tsx                  # Main portfolio single-page application
│   ├── sitemap.ts                # Dynamic XML sitemap
│   ├── robots.ts                 # Dynamic robots.txt
│   └── globals.css               # Editorial CSS styling & cursor effects
├── components/
│   ├── ui/
│   │   ├── Button.tsx            # Standardized button primitive
│   │   ├── Tag.tsx               # Tag badge primitive
│   │   └── Pill.tsx              # Status indicator primitive
│   ├── Header.tsx                # Site navigation & wordmark
│   ├── Hero.tsx                  # Hero section with headline
│   ├── SelectedWork.tsx          # Project showcase & star reaction system
│   ├── HowIWork.tsx              # Methodological notes & manifesto
│   ├── VisualWork.tsx            # Design showcase linking to Behance
│   ├── Toolbox.tsx               # Tech stack & tooling categorization
│   ├── NowAndArchive.tsx         # Current updates & past experiment archives
│   ├── ContactSection.tsx        # Contact form with honeypot & copy action
│   ├── CustomCursor.tsx          # Interactive cursor dot & ring
│   └── Toast.tsx                 # Toast notification system
├── lib/
│   ├── data.ts                   # Structured project & bio data
│   ├── db.ts                     # Persistence layer (Upstash Redis / Memory)
│   ├── rate-limit.ts             # Distributed rate limiter (Upstash / Memory)
│   └── email.ts                  # Resend email notification service
├── types/
│   └── index.ts                  # Shared TypeScript interfaces
├── middleware.ts                 # Edge middleware for security headers & CSP
├── .env.example                  # Template for environment variables
├── next.config.ts                # Next.js configuration & headers
├── package.json                  # Dependencies & npm scripts
├── tsconfig.json                 # Strict TypeScript configuration
├── vercel.json                   # Cache headers & edge routing configuration
└── README.md                     # Documentation
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** 18.18.0 or newer (Node 20+ recommended)
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Navigate to the portfolio folder
cd portfolio

# Install dependencies
npm install
```

### 3. Environment Configuration (Optional)
Copy the template to create your local `.env.local` file:
```bash
cp .env.example .env.local
```

You can fill in your API keys if you want to test live email delivery or Redis persistence:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-upstash-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# Optional: Resend Email
RESEND_API_KEY=re_your_api_key
CONTACT_NOTIFICATION_EMAIL=sanghapal2006@gmail.com
```

*(Note: If left unset, the app will smoothly run using the in-memory store and log contact submissions to the console).*

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Vercel

### Option 1: Git Integration (Recommended)

1. Push your repository to GitHub / GitLab / Bitbucket:
   ```bash
   git init
   git add .
   git commit -m "feat: initial full-stack portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YourUsername/your-repo-name.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **"Import Project"** and select your repository.
4. (Optional) In **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.vercel.app`)
   - `UPSTASH_REDIS_REST_URL` & `UPSTASH_REDIS_REST_TOKEN` (Create free via Vercel Marketplace / Upstash)
   - `RESEND_API_KEY` (from [resend.com](https://resend.com))
   - `CONTACT_NOTIFICATION_EMAIL`
5. Click **"Deploy"**. Vercel will automatically build and publish your full-stack app on its global Edge/Serverless CDN.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts to link and deploy your project in seconds.

---

## 🧪 Testing & Verification

- **Build verification**:
  ```bash
  npm run build
  ```
- **Linting**:
  ```bash
  npm run lint
  ```
- **Health check**:
  ```bash
  curl http://localhost:3000/api/health
  ```
- **Stats check**:
  ```bash
  curl http://localhost:3000/api/stats
  ```

---

## 📄 License
MIT © 2026 Sanghpal Bhakte
