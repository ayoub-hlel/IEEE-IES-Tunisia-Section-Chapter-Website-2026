"use client";

import { MapPin, Facebook, Instagram, Globe, Linkedin, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Subunit = {
  id: number;
  name: string;
  short_name: string;
  location: string;
  university: string;
  facebook: string | null;
  instagram: string | null;
  website: string | null;
  linkedin: string | null;
};

function SocialLinks({ subunit }: { subunit: Subunit }) {
  const links = [
    { href: subunit.facebook, icon: Facebook, label: "Facebook", color: "hover:bg-[#1877F2]" },
    { href: subunit.instagram, icon: Instagram, label: "Instagram", color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737]" },
    { href: subunit.website, icon: Globe, label: "Website", color: "hover:bg-primary" },
    { href: subunit.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:bg-[#0A66C2]" },
  ].filter((l) => l.href);

  if (links.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-auto pt-4 border-t border-border">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href!}
          target="_blank"
          rel="noreferrer"
          className={`p-2 rounded-full bg-muted/50 text-muted-foreground/60 ${link.color} hover:text-white transition-all duration-300`}
          aria-label={`${link.label} for ${subunit.name}`}
        >
          <link.icon className="icon-sm" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

// UploadThing logo URLs for subunits without local logo files
const UT_LOGOS: Record<string, string> = {
  isimms: "https://utfs.io/f/TjXaYUuww8KkTnE6Q9ww8KkmajNg6PCEFscpW7xu9yVb1AlX",
};

function SubunitLogo({ shortName, name }: { shortName: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const logoPath = `/logos/subunits/${shortName}.png`;

  if (failed) {
    // Try UploadThing fallback
    const utUrl = UT_LOGOS[shortName];
    if (utUrl) {
      return (
        <div className="size-20 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
          <img src={utUrl} alt={`${name} logo`} className="w-full h-full object-cover" />
        </div>
      );
    }
    return (
      <div className="size-20 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
        <Building2 className="icon-lg" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="size-20 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
      <img
        src={logoPath}
        alt={`${name} logo`}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function SubunitCard({ subunit }: { subunit: Subunit }) {
  return (
    <Card className="group relative h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="relative p-6 flex flex-col items-center text-center flex-1">
        {/* Logo */}
        <div className="mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <SubunitLogo shortName={subunit.short_name} name={subunit.name} />
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors min-h-[3.5rem] flex items-center justify-center">
          {subunit.name}
        </h3>

        {/* University */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
          {subunit.university}
        </p>

        {/* Location badge */}
        <Badge variant="secondary" className="inline-flex items-center gap-1.5 text-xs font-medium mb-0">
          <MapPin className="icon-xs text-primary" aria-hidden="true" />
          {subunit.location}
        </Badge>

        {/* Social links */}
        <SocialLinks subunit={subunit} />
      </CardContent>
    </Card>
  );
}

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

export default function SubunitsGrid({ subunits }: { subunits: Subunit[] }) {
  // Duplicate subunits for infinite scroll effect
  const duplicatedSubunits = [...subunits, ...subunits, ...subunits];

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <FadeInOnScroll>
            <Badge variant="secondary" className="section-label mb-4 inline-block">Our Network</Badge>
          </FadeInOnScroll>
          <FadeInOnScroll delay={100}>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Our <span className="text-primary">Subunits</span>
            </h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto border-l-4 border-primary pl-6 text-left">
              Discover the IEEE IES Student Branch Chapters across Tunisia. These chapters bring together passionate students who are dedicated to advancing industrial electronics and building a strong engineering community.
            </p>
          </FadeInOnScroll>

          {/* Stats badge */}
          <FadeInOnScroll delay={300}>
            <div className="mt-8 inline-flex items-center justify-center">
              <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="text-3xl font-bold text-primary">{subunits.length}</div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Active Chapters</div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Logo Marquee */}
        <FadeInOnScroll delay={400}>
          <div className="w-full overflow-hidden bg-card border-y border-border py-8 mb-16 rounded-lg">
            <div className="text-center mb-6">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Our Presence Across Universities</p>
            </div>
            <div className="relative flex overflow-hidden">
              <div className="flex items-center gap-12 px-8 min-w-max animate-marquee">
                {duplicatedSubunits.map((subunit, idx) => (
                  <div
                    key={`${subunit.short_name}-${idx}`}
                    className="relative w-16 h-16 shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-500 cursor-pointer rounded-full overflow-hidden bg-muted"
                    title={subunit.name}
                  >
                    <img
                      src={`/logos/subunits/${subunit.short_name}.png`}
                      alt={subunit.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z'/%3E%3Cpath d='m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9'/%3E%3Cpath d='M12 3v6'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Gradient fades on edges */}
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          </div>
        </FadeInOnScroll>

        {/* Subunits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subunits.map((subunit, idx) => (
            <FadeInOnScroll key={subunit.name} delay={idx * 50}>
              <SubunitCard subunit={subunit} />
            </FadeInOnScroll>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
