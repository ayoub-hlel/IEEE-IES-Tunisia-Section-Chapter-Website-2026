# IEEE IES Tunisia Section — 2026 Website Renewal

Hi, I'm **Ayoub Hlel** — IEEE IES Tunisia Chapter Webmaster (2023–2026).

This repository is a showcase of the complete 2026 website renewal for the [IEEE Industrial Electronics Society Tunisia Section](https://ies.ieee.tn/).

---

## The Project

After three years of managing the chapter's previous WordPress-based website, I rebuilt the entire platform from scratch — modernizing the architecture, improving performance, and creating a maintainable content pipeline that will serve the chapter for years to come.

The new site serves the IES Tunisia community by providing:

- 📢 **Chapter News & Activities** — Technical workshops, webinars, and events across Tunisia
- 🏫 **Student Branch Chapters** — 10 active subunits spanning universities nationwide
- 🏆 **Awards & Recognitions** — Technical challenges, outstanding chapter awards, and member achievements
- 👥 **Governance** — Executive committee profiles, global IES leadership, and sister societies
- 📖 **Articles** — In-depth coverage of chapter events and technical sessions

---

## Architecture

The website is a **fully static site** — zero server runtime, zero database queries at request time. Every page is pre-rendered into plain HTML at build time and served as static files.

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Styling | Tailwind CSS 3 + custom design system |
| Components | React 19 Server Components + shadcn/ui |
| Icons | Lucide React |
| Fonts | Montserrat (headings) + Open Sans (body) |
| Content DB | SQLite — read at build time only |
| Photo Hosting | UploadThing |
| Deployment | Static export → any free host (Vercel, Cloudflare Pages, Netlify) |

### Content Management

All dynamic content — subunits, officers, awards, stats — lives in a local SQLite database (`db/ies-tunisia.db`). At build time, pages read from the database and bake the data directly into HTML. No runtime database connection needed.

Content updates happen through a local admin panel (`npm run admin`), then a rebuild and redeploy. Simple, fast, and free.

---

## Built By

- **Ayoub Hlel** — Design, development, and deployment
