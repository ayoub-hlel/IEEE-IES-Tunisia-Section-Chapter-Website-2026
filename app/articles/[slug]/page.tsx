import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleSource, getArticleMeta } from "@/lib/articles";
import ArticleContent from "@/components/ArticleContent";
import { MDXRemote } from "next-mdx-remote/rsc";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getArticleMeta(slug);
  if (!meta) return {};

  return {
    title: `${meta.title} | IEEE IES Tunisia Section`,
    description: meta.excerpt,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      ...(meta.image ? { images: [{ url: meta.image }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const source = getArticleSource(slug);
  const meta = getArticleMeta(slug);

  if (!source || !meta) {
    notFound();
  }

  // Estimate reading time (~200 words/min)
  const wordCount = source.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <ArticleContent
      title={meta.title}
      date={meta.date}
      image={meta.image}
      readingTime={readingTime}
    >
      <MDXRemote source={source} />
    </ArticleContent>
  );
}
