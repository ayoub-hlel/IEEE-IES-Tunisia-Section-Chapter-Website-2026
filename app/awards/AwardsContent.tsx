"use client";

import { Calendar, Trophy, Award, Medal, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type AwardWinner = {
  id: number;
  category_id: number;
  title: string;
  result: string;
  winner_logo_url: string | null;
  sort_order: number;
};

type AwardCategory = {
  id: number;
  year: number;
  name: string;
  description: string | null;
  award_type: string;
  date: string | null;
  sort_order: number;
  winners: AwardWinner[];
};

type AwardsByYear = {
  year: number;
  awards: AwardCategory[];
};

const getRankIcon = (result: string) => {
  if (result.includes("1st")) return Trophy;
  if (result.includes("2nd")) return Medal;
  if (result.includes("3rd")) return Award;
  return Star;
};

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

export default function AwardsContent({ awardsByYear }: { awardsByYear: AwardsByYear[] }) {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <FadeInOnScroll>
            <Badge variant="secondary" className="section-label mb-4 inline-block">Recognition</Badge>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Awards & <span className="text-primary">Recognitions</span>
            </h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Celebrating outstanding achievements by our members, chapters, and projects through recognition and excellence.
            </p>
          </FadeInOnScroll>

          {/* Decorative line */}
          <FadeInOnScroll delay={300}>
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary/50" />
              <Trophy className="icon-lg text-primary" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </FadeInOnScroll>
        </div>

        {/* Awards by Year */}
        <div className="space-y-16">
          {awardsByYear.map((yearData, yearIdx) => (
            <FadeInOnScroll key={yearData.year} delay={yearIdx * 100}>
              {/* Year Header */}
              <div className="relative mb-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                    <div className="relative size-14 bg-primary rounded-full flex items-center justify-center">
                      <Calendar className="icon-xl text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {yearData.year}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
              </div>

              <div className="space-y-12">
                {yearData.awards.map((award, awardIdx) => (
                  <FadeInOnScroll key={award.id} delay={awardIdx * 150}>
                    {/* Award Category Header */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl blur-sm group-hover:blur-md transition-all duration-500" />
                      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 border border-primary/10">
                        <div className="flex items-start gap-3">
                          <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                            <Award className="icon-lg text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground mb-1">{award.name}</h3>
                            {award.date && (
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold">{award.date}</span>
                              </p>
                            )}
                            {award.description && (
                              <p className="text-muted-foreground text-sm mt-1">{award.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Winner Cards Grid */}
                    <div className={`grid gap-6 mt-6 ${
                      award.winners.length === 1
                        ? "grid-cols-1 max-w-md mx-auto"
                        : award.winners.length === 2
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 md:grid-cols-3"
                    }`}>
                      {award.winners.map((winner, winnerIdx) => {
                        const RankIcon = getRankIcon(winner.result);
                        const isTopRank = winner.result.includes("1st") || winner.result.includes("Best");
                        const hasLogo = winner.winner_logo_url;

                        return (
                          <Card
                            key={winner.id}
                            className={`group relative overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                              isTopRank
                                ? "border-primary/30 bg-gradient-to-br from-primary/5 via-background to-primary/5"
                                : "border-border/50 bg-gradient-to-br from-muted/30 to-background hover:border-primary/20"
                            }`}
                          >
                            {/* Top accent line */}
                            <div className={`absolute top-0 left-0 right-0 h-1 ${
                              isTopRank
                                ? "bg-gradient-to-r from-primary via-primary/80 to-primary"
                                : "bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                            }`} />

                            <CardContent className="relative p-6">
                              <div className="relative flex flex-col items-center text-center">
                                {/* Winner Logo (circular) - shown ONLY if logo exists */}
                                {hasLogo ? (
                                  <div className="relative mb-4 overflow-hidden rounded-full">
                                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300" />
                                    <div className="relative w-32 h-32 bg-gradient-to-br from-background to-muted/30 flex items-center justify-center border border-border/30 shadow-sm rounded-full">
                                      <Image
                                        src={winner.winner_logo_url!}
                                        alt={`${winner.title} logo`}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover rounded-full"
                                        unoptimized
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  /* Trophy Badge - shown ONLY if NO logo */
                                  <div className="relative mb-4">
                                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md" />
                                    <div className="relative bg-primary/10 rounded-full size-20 flex items-center justify-center">
                                      <RankIcon className="icon-2xl text-primary" />
                                    </div>
                                  </div>
                                )}

                                {/* Winner Name */}
                                <h4 className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-tight">
                                  {winner.title}
                                </h4>

                                {/* Result Badge */}
                                <Badge
                                  variant={isTopRank ? "default" : "secondary"}
                                  className={`text-xs font-semibold px-3 py-1 ${
                                    isTopRank
                                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-sm"
                                      : ""
                                  }`}
                                >
                                  {winner.result}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </FadeInOnScroll>
                ))}
              </div>
            </FadeInOnScroll>
          ))}
        </div>

        {/* Footer Section */}
        <FadeInOnScroll delay={300}>
          <div className="text-center mt-20 relative">
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-primary/40" />
              <div className="size-2 bg-primary/40 rounded-full" />
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-primary/40" />
            </div>
            <p className="text-muted-foreground mb-4">More awards will be added as they are received.</p>
            <Button asChild variant="outline" size="lg" className="group relative overflow-hidden">
              <a href="/awards/received/">
                <span className="relative z-10">View Received Awards</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </Button>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
}
