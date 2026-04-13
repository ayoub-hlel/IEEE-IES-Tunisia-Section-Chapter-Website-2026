import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
      <section className="relative bg-secondary text-white py-14 md:py-14">
      {/* Background Image - brightened */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://utfs.io/f/TjXaYUuww8KkrGa6WpFI1uBlHhv9T0sSAUKNZPy3wJief7LD')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.25) contrast(1.05)",
        }}
      />

      {/* Gradient overlay - blue bottom to orange top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(203 100% 29% / 0.90) 0%, hsl(18 91% 54% / 0.30) 100%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(203 100% 29% / 0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* "Proud to announce" label - pulled up above the glassmorphic card */}
         
            <div className="-mt-6 mb-6 inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-lg">
              <p className="text-sm md:text-base font-bold uppercase tracking-wider text-secondary">
                We're proud to announce
              </p>
          </div>

          {/* Glassmorphic card */}
          <div className="rounded-b-2xl rounded-t-sm p-8 md:p-10"
            style={{
              background: "hsl(203 100% 29% / 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
            }}
          >
            {/* Golden accent line */}
            <div className="w-12 h-0.5 bg-yellow-400 mx-auto mb-6 rounded-full" />

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4" style={{ textWrap: "balance" }}>
              2025 IEEE Tunisia Section{" "}
              <span className="block text-yellow-400">Outstanding Chapter Award</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/85 max-w-lg mx-auto mb-6" style={{ textWrap: "balance" }}>
              We're honored to receive the 2025 IEEE Tunisia Section Outstanding Chapter Award, recognizing our dedication to advancing industrial electronics and power systems across Tunisia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-secondary font-bold hover:from-yellow-500 hover:to-amber-600 shadow-lg"
              >
                <a href="/awards/received/" className="flex items-center gap-1.5">
                  View Our Awards
                  <ArrowRight className="icon-md" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-secondary font-semibold"
              >
                <a href="/about/">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
