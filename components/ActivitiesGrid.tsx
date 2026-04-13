import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface ActivitiesGridProps {
  articles: ArticleMeta[];
}

export default function ActivitiesGrid({ articles }: ActivitiesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/articles/${article.slug}/`}
          className="group block overflow-hidden rounded-sm border border-primary/10 bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20"
        >
          {article.image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-sm font-heading font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            )}
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
              Read more <ArrowRight className="icon-xs" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
