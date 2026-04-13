import type { Metadata } from "next";
import {
  BookOpen, Lightbulb, History, Building2, Users, Mail, ExternalLink,
  Linkedin, Facebook, Crown, GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getAllOfficers, getSisterSocieties, getGlobalLeadership } from "@/lib/db";

export const metadata: Metadata = {
  title: "About Us | IEEE IES Tunisia Section",
  description: "Learn about the IEEE Industrial Electronics Society — mission, vision, governance, sister societies, and the Tunisia Section Executive Committee.",
};

function OfficerCard({ officer }: { officer: { name: string; role: string; email: string | null; linkedin: string | null; facebook: string | null; photo: string | null } }) {
  return (
    <Card className="officer-card h-full">
      <CardContent className="p-4 flex flex-col">
        <div className="officer-photo-area w-full aspect-[3/4] mb-3">
          {officer.photo ? (
            <img
              src={`/team/${officer.photo}`}
              alt={officer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="photo-placeholder" />
          )}
        </div>
        <h3 className="text-center font-semibold text-foreground mb-1 leading-tight">{officer.name}</h3>
        <div className="text-center mb-3">
          <span className="officer-role-badge">{officer.role}</span>
        </div>
        <Separator className="mb-3" />
        <div className="flex justify-center gap-2 mt-auto">
          <a href={officer.email || "mailto:ies.tn@ieee.org"} className="social-icon" aria-label={`Email ${officer.name}`}><Mail className="icon-sm" /></a>
          <a href={officer.linkedin || "#"} target="_blank" rel="noreferrer" className="social-icon" aria-label={`${officer.name} LinkedIn`}><Linkedin className="icon-sm" /></a>
          <a href={officer.facebook || "#"} target="_blank" rel="noreferrer" className="social-icon" aria-label={`${officer.name} Facebook`}><Facebook className="icon-sm" /></a>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AboutPage() {
  const officers = getAllOfficers();
  const sisterSocieties = getSisterSocieties();
  const globalLeadership = getGlobalLeadership();

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-16 animate-fadeUp">
          <Badge variant="secondary" className="section-label">About the Society</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">About <span className="text-primary">IEEE IES</span> Tunisia</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">Advancing the theory and application of electronics, controls, and computational intelligence for industrial and manufacturing systems.</p>
        </div>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">
          <Card className="card-hover">
            <CardHeader>
              <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <BookOpen className="icon-lg text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                The Industrial Electronics Society encompasses a diverse range of technical activities devoted to the application of electronics and electrical sciences for the enhancement of industrial and manufacturing processes. Technical activities cover intelligent control systems, robotics, factory communications and automation, flexible manufacturing, data acquisition and signal processing, vision systems, and power electronics.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                <Lightbulb className="icon-lg text-primary" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                To advance global prosperity by fostering technological innovation, enabling members&apos; careers and promoting community worldwide. The IES promotes the engineering process of creating, developing, integrating, sharing, and applying knowledge about electro- and information technologies and sciences for the benefit of humanity and the profession.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Field of Interest */}
        <section className="mb-16 animate-slideUp">
          <Card className="bg-muted/50 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><BookOpen className="icon-lg text-primary" />Field of Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The IES field of interest is confined to the theory and applications of <strong>electronics, controls, communications, instrumentation</strong>, and <strong>computational intelligence</strong> to industrial and manufacturing systems and processes.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {["Intelligent / Computer Control Systems", "Robotics & Automation", "Factory Communications", "Flexible Manufacturing", "Data Acquisition & Signal Processing", "Machine Vision Systems", "Power Electronics", "Instrumentation & Sensors"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="size-1.5 bg-primary rounded-full shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* History */}
        <section className="mb-16 animate-slideUp">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><History className="icon-lg text-primary" />History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The IEEE Industrial Electronics Society has a rich history of advancing industrial electronics technology. From its founding, the Society has grown into a vibrant global community of researchers, academics, and industry professionals.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The IES Tunisia Section was established to serve the growing community of industrial electronics enthusiasts across Tunisia&apos;s engineering schools and universities.
              </p>
              <a href="https://ethw.org/IEEE_Industrial_Electronics_Society" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-semibold">
                Learn more at the IEEE History Center <ExternalLink className="icon-sm" />
              </a>
            </CardContent>
          </Card>
        </section>

        {/* Governance */}
        <section className="mb-16 animate-slideUp">
          <Card className="bg-foreground text-white border-0 shadow-card-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white"><Building2 className="icon-lg text-primary" />Governance & Division VI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-white/80 leading-relaxed">
                The IEEE Industrial Electronics Society operates under <strong className="text-white">IEEE Division VI</strong> — the IEEE division that encompasses societies focused on electrical systems, power, and industrial applications.
              </p>
              <div className="bg-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-3">Administrative Committee (AdCom)</h3>
                <p className="text-white/70 text-xs leading-relaxed mb-3">The IES Administrative Committee governs the Society and meets three times per year. It consists of <strong className="text-white">62 voting members</strong>:</p>
                <div className="grid md:grid-cols-2 gap-2 text-xs">
                  {[{ l: "Elected/Appointed Members-at-Large", c: "21" }, { l: "Appointed Officers", c: "11" }, { l: "Past Presidents", c: "2" }, { l: "Technical Committee Cluster Delegates", c: "8" }, { l: "Senior & Life AdCom Delegates", c: "20" }].map((item, i) => (
                    <div key={i} className="flex justify-between bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-white/70">{item.l}</span>
                      <span className="font-bold text-primary">{item.c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white flex items-center gap-2 mb-3"><Users className="icon-md text-primary" />Global IES Leadership</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {globalLeadership.map((leader) => (
                    <div key={leader.id} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/15 transition-colors">
                      <Avatar className="size-14 mx-auto mb-2 ring-2 ring-primary/20"><AvatarFallback className="text-primary font-bold text-sm">{leader.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback></Avatar>
                      <p className="font-semibold text-xs">{leader.name}</p>
                      <p className="text-primary text-[10px] font-semibold mt-0.5">{leader.role}</p>
                      {leader.note && <p className="text-white/50 text-[10px] mt-0.5">{leader.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sister Societies */}
        <section className="mb-16 animate-slideUp">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-2"><Users className="icon-lg text-primary" />Sister Societies</h2>
          <p className="text-lg text-muted-foreground mb-6">IES collaborates closely with four sister societies within Division VI.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {sisterSocieties.map((society) => (
              <a key={society.id} href={society.url} target="_blank" rel="noreferrer" className="group">
                <Card className="card-hover-primary h-full">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Building2 className="icon-lg text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-foreground truncate">{society.name}</h3>
                      <Badge variant="secondary" className="text-primary rounded-full text-[10px] font-bold mt-1">{society.short_name}</Badge>
                    </div>
                    <ExternalLink className="icon-md text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

        {/* Executive Committee */}
        <section className="mb-16 animate-slideUp">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="section-label">Leadership Team</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">Executive Committee 2025–2026</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">Meet the dedicated team leading the IEEE IES Tunisia Section Chapter.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {officers.slice(0, 4).map((officer) => (
              <OfficerCard key={officer.id} officer={officer} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {officers.slice(4).map((officer) => (
              <OfficerCard key={officer.id} officer={officer} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/50 rounded-2xl p-10 text-center relative overflow-hidden animate-slideUp">
          <div className="relative z-10 text-center">
            <Mail className="icon-5xl mx-auto mb-4 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Have Questions?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Reach out to the IEEE IES Tunisia Section team for any inquiries about membership, activities, or collaboration.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide shadow-lg">
                <a href="mailto:ies.tn@ieee.org">Contact Us</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-wide">
                <a href="/contact/">Send a Message</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
