"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_PLAY_MS = 5000;
const TRANSITION_MS = 500;

interface Article {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
}

const gradients = [
  "from-primary/40 to-primary/20",
  "from-primary/35 to-secondary/15",
  "from-secondary/30 to-primary/15",
  "from-primary/30 to-primary/10",
];

export default function LatestActivitiesSection({
  articles,
}: {
  articles: Article[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <ActivityCarousel articles={articles} />
      </div>
    </section>
  );
}

function ActivityCarousel({ articles }: { articles: Article[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev + 1) % articles.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
  }, [isTransitioning, articles.length]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => (prev - 1 + articles.length) % articles.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
  }, [isTransitioning, articles.length]);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    },
    [isTransitioning, current],
  );

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div className="relative">
      <div className="relative h-80 md:h-[440px] overflow-hidden rounded-xl shadow-sm mb-6">
        {articles.map((article, i) => {
          const gradient = gradients[i % gradients.length];
          return (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}/`}
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                i === current
                  ? "opacity-100 translate-x-0"
                  : i < current
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
              }`}
            >
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl">
                    {article.excerpt}
                  </p>
                )}
              </div>
            </Link>
          );
        })}

        {articles.length > 1 && (
          <>
            <button
              onClick={(e) => { e.preventDefault(); goPrev(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-background transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="icon-lg text-foreground" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); goNext(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-background transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="icon-lg text-foreground" />
            </button>
          </>
        )}
      </div>

      {articles.length > 1 && (
        <div className="flex items-center gap-2 justify-center">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`shrink-0 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
