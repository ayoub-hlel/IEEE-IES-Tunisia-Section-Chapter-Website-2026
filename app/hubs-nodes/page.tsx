import type { Metadata } from "next";
import {
  Globe2,
  Users,
  TrendingUp,
  GraduationCap,
  Building2,
  Network,
  MapPin,
  ArrowUpRight,
  Handshake,
  Lightbulb,
  Award,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Hubs & Nodes | IEEE IES Tunisia Section",
  description:
    "Learn about the IEEE IES Hubs and Nodes program and Tunisia's role as the Africa Hub, coordinating 7 regional nodes across the continent.",
};

const nodes = [
  {
    country: "Algeria",
    flag: "🇩🇿",
    description: "North African node fostering cross-border collaboration and joint initiatives.",
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    description: "Strategic node connecting North African and Middle Eastern IES communities.",
  },
  {
    country: "South Africa",
    flag: "🇿🇦",
    description: "Southern African node connecting established IES chapters across the region.",
  },
];

const pillars = [
  {
    icon: Users,
    title: "YP Retention",
    description:
      "Keeps young professionals engaged after graduation through continued networking and leadership opportunities across the African continent.",
  },
  {
    icon: GraduationCap,
    title: "Intergenerational Mentorship",
    description:
      "Bridges the gap between young professionals and senior members, ensuring seamless knowledge and experience transfer within and across regions.",
  },
  {
    icon: Building2,
    title: "Industry Reconnection",
    description:
      "Brings young industry professionals back into the IES fold, strengthening innovation pipelines and industrial ties throughout Africa.",
  },
  {
    icon: TrendingUp,
    title: "Organizational Growth Multiplier",
    description:
      "Empowers Hub and Node leaders to organically initiate and lead new local Sections, Chapters, and Student Branches, expanding IEEE's reach.",
  },
  {
    icon: MapPin,
    title: "Regional Impact & Proximity",
    description:
      "Aligns initiatives with local African academic and industrial interests, ensuring contextually relevant and geographically accessible programs.",
  },
];

export default function HubsNodesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeUp">
          <Badge variant="secondary" className="section-label">
            One IES Vision
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            IES Hubs & <span className="text-primary">Nodes</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A strategic networking framework transforming IEEE IES into a globally connected yet
            locally empowered community driving sustainable growth, collaboration, and innovation
            across Africa.
          </p>
        </div>

        {/* About the Program */}
        <section className="mb-16 animate-slideUp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Globe2 className="icon-xl text-primary" />
                About the Hubs & Nodes Program
              </CardTitle>
              <CardDescription className="text-base">
                Guided by IEEE IES President Milos Manic's "One IES" vision
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The IES Hubs and Nodes program is a strategic, scalable networking framework
                designed to transform the society into a globally connected yet locally empowered
                community. It drives sustainable growth, collaboration, and innovation by creating
                a structured network of regional centers.
              </p>
              <p>
                Regional centers, known as <strong className="text-foreground">Hubs</strong>, are
                established in areas with strong academic and industrial potential. Each Hub
                coordinates and supports local <strong className="text-foreground">Nodes</strong>{" "}
                (or Spokes), creating a volunteer-led, recursive framework where students become
                mentors and future leaders.
              </p>
              <p>
                Rather than replacing existing IEEE structures, the program acts as a{" "}
                <strong className="text-foreground">force multiplier</strong> that grows and
                supports existing IEEE Sections, Chapters, and Branches. Initiatives are tailored
                to the geographical and cultural context of each region to ensure maximum relevance
                and physical proximity for participants.
              </p>
              <div className="rounded-lg bg-accent/50 p-4 border border-border/50">
                <p className="text-sm">
                  <strong className="text-foreground">Proven Success:</strong> Early deployments
                  in Brazil and India have already secured $70,000+ in funding, hosted major
                  industry-academia events, and significantly increased student participation.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tunisia as Africa Hub */}
        <section className="mb-16 animate-slideUp">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="section-label">
              North & South Africa Hub
            </Badge>
            <h2 className="section-title mt-4 text-foreground">
              IEEE IES <span className="text-primary">Tunisia Section</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Serving as an official IES Hub for the African continent, coordinating regional
              nodes and driving collaborative growth across 3 countries.
            </p>
          </div>

          <Card className="card-hover-primary mb-8">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Network className="icon-xl text-primary" />
                </div>
                <div>
                  <CardTitle>Hub Leadership</CardTitle>
                  <CardDescription>Coordinated volunteer-driven governance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Hub Co-Leaders</p>
                  <p className="font-semibold text-foreground">Chayma Bouattour</p>
                  <p className="font-semibold text-foreground">Ala Chalghaf</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
                  <p className="text-sm text-muted-foreground mb-1">Hub Region</p>
                  <p className="font-semibold text-foreground">North & South Africa</p>
                  <p className="text-sm text-muted-foreground">Coordinating 3 Regional Nodes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nodes Network */}
          <h3 className="section-title mb-6 text-center text-foreground">
            Regional <span className="text-primary">Nodes</span> Network
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nodes.map((node, index) => (
              <Card key={node.country} className="card-hover border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl" role="img" aria-label={`${node.country} flag`}>
                      {node.flag}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground">{node.country}</h4>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Node
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{node.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Pillars */}
        <section className="mb-16 animate-slideUp">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="section-label">
              5 Core Pillars
            </Badge>
            <h2 className="section-title mt-4 text-foreground">
              Benefits of the <span className="text-primary">Program</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Hubs and Nodes framework delivers impact through five strategic pillars that
              strengthen the IES community.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} className="card-hover-primary">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="icon-xl text-primary" />
                    </div>
                    <CardTitle>{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{pillar.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16 animate-slideUp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="icon-xl text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    1
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Hub Establishment</h4>
                  <p className="text-sm text-muted-foreground">
                    Regional centers are established in areas with strong academic and industrial
                    potential, led by dedicated volunteer co-leaders.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    2
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Node Coordination</h4>
                  <p className="text-sm text-muted-foreground">
                    Each Hub coordinates and supports local Nodes, creating a connected network
                    tailored to regional needs and proximity.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    3
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Growth Cycle</h4>
                  <p className="text-sm text-muted-foreground">
                    Students become mentors, mentors become leaders, and leaders organically
                    initiate new Sections, Chapters, and Branches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="animate-slideUp">
          <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-10 pb-10 text-center">
              <Handshake className="mx-auto mb-4 icon-5xl text-primary" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Get Involved
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Whether you're a student, young professional, or industry leader, the IES Hubs
                and Nodes program offers opportunities for mentorship, collaboration, and growth
                across Africa and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <a
                  href="https://forms.gle/ZenH87VfdxfnxZyDA" className="gap-2">
                    Contribute to the initiative <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://iten.ieee-ies.org/featured-news/2025/ies-hubs-and-nodes-building-a-connected-network-for-innovation-and-growth/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    Learn More on IES ITEN <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
