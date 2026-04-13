"use client";

import { Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

export default function AwardHeroSection() {
  return (
    <section className="relative min-h-[60vh] py-8 flex items-end overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://utfs.io/f/TjXaYUuww8KkrGa6WpFI1uBlHhv9T0sSAUKNZPy3wJief7LD')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) contrast(1.1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, hsl(203 100% 29% / 0.95) 0%, hsl(18 91% 54% / 0.4) 60%, transparent 100%)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl">
            {/* Award Badge */}
            <FadeInOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 mb-4">
                <Sparkles className="icon-sm text-secondary" />
                <span className="text-sm font-bold uppercase tracking-wider text-secondary">Proud Achievement</span>
              </div>
            </FadeInOnScroll>

            {/* Main Title */}
            <FadeInOnScroll delay={100}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                2025 Outstanding
                <span className="block text-yellow-400">Chapter Award</span>
              </h2>
            </FadeInOnScroll>

            {/* Subtitle */}
            <FadeInOnScroll delay={200}>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 max-w-2xl">
                We're honored to receive the IEEE Tunisia Section Outstanding Chapter Award, recognizing our unwavering dedication to advancing industrial electronics and power systems across Tunisia.
              </p>
            </FadeInOnScroll>

            {/* Stats Row */}
            <FadeInOnScroll delay={300}>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 border border-white/20">
                  <Trophy className="icon-2xl text-yellow-400 mb-2" />
                  <div className="text-s text-white/80 font-medium">IEEE Tunisia Section</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-5 py-3 border border-white/20">
                  <div className="text-2xl font-bold text-white mb-1">2025</div>
                  <div className="text-s text-white/80 font-medium">Award Year</div>
                </div>
              </div>
            </FadeInOnScroll>

            {/* CTA Button */}
            <FadeInOnScroll delay={400}>
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-l text-secondary mr-4 font-bold hover:from-yellow-500 hover:to-amber-600"
              >
                <a href="/awards/received/" className="flex items-center gap-3">
                  View Our Awards
                  <ArrowRight className="icon-l" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              >
                <a href="/about" className="flex items-center gap-1.5">
                  Learn more about us
                  <ArrowRight className="icon-l" />
                </a>
              </Button>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: "ellipse(80% 100% at 50% 100%)" }} />
    </section>
  );
}
