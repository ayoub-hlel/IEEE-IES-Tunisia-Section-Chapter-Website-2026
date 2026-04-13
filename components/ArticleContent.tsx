import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/articles";

interface ArticleContentProps {
  children: React.ReactNode;
  title: string;
  date: string;
  image?: string;
  readingTime?: number;
}

export default function ArticleContent({
  children,
  title,
  date,
  image,
  readingTime = 5,
}: ArticleContentProps) {
  return (
    <article className="min-h-screen">
      {/* Hero image (only if available) */}
      {image && (
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Article body */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <Button
            asChild
            variant="secondary"
            className="mb-6 bg-background/90 backdrop-blur-sm shadow-sm hover:bg-background border"
          >
            <Link href="/activities/chapter/">
              <ArrowLeft className="icon-md mr-2" />
              All Activities
            </Link>
          </Button>

          {/* Article header */}
          <header className="bg-background rounded-xl p-6 md:p-8 shadow-sm border mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="icon-sm" />
                {formatDate(date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="icon-sm" />
                {readingTime} min read
              </span>
            </div>
          </header>

          {/* Prose content */}
          <div className="article-prose bg-background rounded-xl p-6 md:p-10 shadow-sm border mb-12">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
