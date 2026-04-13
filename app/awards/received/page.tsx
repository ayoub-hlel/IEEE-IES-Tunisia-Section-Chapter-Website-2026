"use client";

import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AwardEntry {
  year: number;
  awardName: string;
  description: string;
  image: string;
  location?: string;
}

const awardsReceived: AwardEntry[] = [
  {
    year: 2025,
    awardName: "Outstanding Chapter Award",
    description: "We're honored to receive the 2025 IEEE Tunisia Section Outstanding Chapter Award, recognizing our dedication to advancing industrial electronics and power systems across Tunisia. This prestigious recognition celebrates our outstanding contributions, innovative programs, and commitment to building a strong engineering community.",
    image: "https://utfs.io/f/TjXaYUuww8KkrGa6WpFI1uBlHhv9T0sSAUKNZPy3wJief7LD",
    location: "Tunisia Section",
  },
];

function FadeInOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={`opacity-0 translate-y-6 animate-fadeUp ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {children}
    </div>
  );
}

export default function ReceivedAwardsPage() {
  return (
    <div className="relative py-20 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-16">
          <FadeInOnScroll>
            <Badge variant="secondary" className="section-label mb-4 inline-block">Recognition</Badge>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Awards Received
            </h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognition of our excellence and achievements in advancing technology and innovation
            </p>
          </FadeInOnScroll>
        </div>

        {/* Awards List */}
        <div className="space-y-12">
          {awardsReceived.map((award, idx) => (
            <FadeInOnScroll key={idx} delay={idx * 100}>
              <article className="bg-card rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-border/50 transition-shadow duration-300">
                {/* Award Image */}
                <div className="relative w-full h-[250px] md:h-[500px] bg-gradient-to-br from-secondary to-primary/50">
                  <img
                    src={award.image}
                    alt={award.awardName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Award Content */}
                <div className="p-8 md:p-12">
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge className="bg-primary text-primary-foreground text-sm font-bold px-4 py-1.5">
                      {award.year}
                    </Badge>
                    {award.location && (
                      <Badge variant="secondary" className="text-sm font-semibold px-4 py-1.5">
                        <MapPin className="icon-xs mr-1.5" aria-hidden="true" />
                        {award.location}
                      </Badge>
                    )}
                  </div>

                  {/* Award Title */}
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {award.awardName}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {award.description}
                  </p>
                </div>
              </article>
            </FadeInOnScroll>
          ))}
        </div>

        {/* Footer Note */}
        <FadeInOnScroll delay={300}>
          <div className="text-center mt-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <div className="size-2 bg-primary/40 rounded-full" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </div>
            <p className="text-muted-foreground">More awards will be added as they are received.</p>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
}
