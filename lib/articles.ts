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
 * When dates are equal, sort alphabetically by title for stable ordering.
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
      // Secondary sort: title ascending (alphabetical) for stable ordering
      return a.title.localeCompare(b.title);
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
