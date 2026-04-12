import fs from "fs";
import path from "path";

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  image?: string;
  excerpt?: string;
}

const ARTICLES_DIR = path.join(process.cwd(), "articles");

/**
 * Explicit ordering for articles that share the same date.
 * This matches the exact order from the WordPress Activities page.
 * Maps slug -> position (lower = earlier in list for same-date groups).
 */
const SLUG_ORDER: Record<string, number> = {
  // 2025-10-14 group
  "ies-is-the-new-carthage": 1,
  "aess-ies-tsyp13-technical-challenge-preventing-mission-failure-without-ground-control-for-cubesats": 2,
  // 2025-03-29 group
  "ieee-ies-tunisia-section-chapter-technical-session-1-methods-and-tools-for-the-design-of-multilevel-converters": 1,
  "2024-ieee-international-conference-on-artificial-intelligence-green-energy": 2,
  "tsyp-12th-edition-ieee-ies-tunisia-section-chapter-ieee-smcs-tunisia-section-chapter-ieee-edsoc-tunisia-section-chapter-technical-challenge": 3,
  "ieee-ies-tunisia-section-chapter-icaige24-technical-challenge": 4,
  "webinar-advanced-power-electronics-for-grid-connectivity-applications": 5,
  "ies-tunisia-section-chapter-online-webinar-in-collaboration-with-ieee-libya-subsection": 6,
  "pes-x-ies-info-session": 7,
  "africas-ies-chapters-leaders-workshop": 8,
  "ieee-tunisian-students-young-professionals-11th-edition-ies-pes-tunisia-section-collaborative-challenge-optimizing-enhancing-the-educational-robot": 9,
  "introduction-to-ies-discover-the-myriad-benefits-of-ieee-ies-membership-uncover-the-power-of-establishing-and-enhancing-student-branch-chapters-learn-more-about-ieee-ies-offers-to-shape-your-academic": 10,
  // 2025-03-28 group
  "the-ieee-international-conference-on-artificial-intelligence-green-energy": 1,
  "tsyp-11-showcasing-ieee-ies-tunisia-section": 2,
};

/**
 * Parse frontmatter-like metadata from an MDX file.
 * We store metadata as a JSON sidecar: article-name.mdx.json
 */
export function getArticleMeta(slug: string): ArticleMeta | null {
  const jsonPath = path.join(ARTICLES_DIR, `${slug}.mdx.json`);
  if (!fs.existsSync(jsonPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  } catch {
    return null;
  }
}

/**
 * List all articles (slug + metadata) sorted by date descending.
 * When dates are equal, uses explicit ordering from SLUG_ORDER to match WordPress.
 */
export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx.json"))
    .map((f) => f.replace(".mdx.json", ""))
    .map(getArticleMeta)
    .filter((m): m is ArticleMeta => m !== null)
    .sort((a, b) => {
      // Primary sort: date descending (newest first)
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      // Secondary sort: explicit WordPress order from SLUG_ORDER
      const orderA = SLUG_ORDER[a.slug] ?? 999;
      const orderB = SLUG_ORDER[b.slug] ?? 999;
      return orderA - orderB;
    });
}

/**
 * Get the MDX source for a specific article slug.
 */
export function getArticleSource(slug: string): string | null {
  const mdxPath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) return null;
  return fs.readFileSync(mdxPath, "utf-8");
}

/**
 * Format a date string (YYYY-MM-DD) into a human-readable format.
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00Z");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
