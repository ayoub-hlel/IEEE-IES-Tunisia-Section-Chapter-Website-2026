import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ArticleMeta } from "@/lib/articles";
import { formatDate } from "@/lib/articles";

interface ArticlesListProps {
  articles: ArticleMeta[];
}

export default function ArticlesList({ articles }: ArticlesListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">
          No articles yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article.slug} className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          {/* Featured image */}
          {article.image && (
            <div className="relative w-full h-48 overflow-hidden bg-muted">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
              <Calendar className="icon-sm" />
              <time>{formatDate(article.date)}</time>
            </div>
            <CardTitle className="text-base leading-snug line-clamp-2">
              <Link
                href={`/articles/${article.slug}/`}
                className="hover:text-primary transition-colors"
              >
                {article.title}
              </Link>
            </CardTitle>
          </CardHeader>
          {article.excerpt && (
            <CardContent className="flex-grow">
              <CardDescription className="text-sm leading-relaxed line-clamp-3">
                {article.excerpt}
              </CardDescription>
            </CardContent>
          )}
          <CardFooter className="flex-shrink-0">
            <Button
              asChild
              variant="ghost"
              className="text-primary font-medium p-0 h-auto hover:bg-transparent hover:underline"
            >
              <Link href={`/articles/${article.slug}/`} className="inline-flex items-center gap-1">
                Read more <ArrowRight className="icon-sm" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
