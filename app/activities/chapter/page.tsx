import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ActivitiesGrid from "@/components/ActivitiesGrid";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Chapter Activities | IEEE IES Tunisia Section",
  description:
    "Explore workshops, conferences, technical challenges, and community events organized by the IEEE IES Tunisia Section Chapter.",
};

export default function ChapterActivitiesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.04)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <div className="container mx-auto px-4 pt-20 pb-12 lg:px-12">
          <div className="mx-auto max-w-3xl text-center animate-fadeUp">
            <Badge variant="secondary" className="section-label mb-4">Chapter Activities</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Chapter{" "}
              <span className="text-primary">Activities</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Explore workshops, technical challenges, conferences, and
              community events organized by the IEEE IES Tunisia Section
              Chapter.
            </p>
          </div>
        </div>

        {/* Activities grid */}
        <div className="container mx-auto px-4 pb-20 lg:px-12">
          <div className="mb-10">
            <h2 className="mb-1 text-3xl font-bold tracking-tight text-foreground md:text-3xl">
              Recent Activities
            </h2>
            <div className="mb-3 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-primary/50" />
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              A showcase of our past events and initiatives across Tunisia.
            </p>
          </div>

          {articles.length > 0 ? (
            <ActivitiesGrid articles={articles} />
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                Activities will be announced soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
