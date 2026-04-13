import type { Metadata } from "next";
import { CheckCircle, BookOpen, Users, Award, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Join IEEE IES Tunisia | Membership",
  description: "Learn how to become a member of IEEE Industrial Electronics Society Tunisia Section.",
};

const benefits = [
  { icon: BookOpen, title: "Technical Resources", description: "Access IEEE Xplore, IES publications, and exclusive technical content." },
  { icon: Users, title: "Community Access", description: "Connect with 500+ members across Tunisia and the global IES community." },
  { icon: Award, title: "Professional Development", description: "Workshops, certifications, and career-building opportunities." },
  { icon: Globe, title: "Global Network", description: "Participate in international IES conferences and events worldwide." },
];

const steps = [
  { step: "1", title: "Join IEEE", description: "Create an IEEE account and select your membership type at ieee.org." },
  { step: "2", title: "Select IES as Your Society", description: "During registration, choose the Industrial Electronics Society as your technical society." },
  { step: "3", title: "Connect with Tunisia Section", description: "Once your IEEE membership is active, reach out to us to join the Tunisia Section community." },
];

export default function JoinPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-fadeUp">
          <Badge variant="secondary" className="section-label">Become a Member</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">Join IEEE IES <span className="text-primary">Tunisia</span></h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">Become part of a vibrant community of industrial electronics professionals and students in Tunisia.</p>
        </div>

        <section className="mb-16 animate-slideUp">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Membership Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Card key={i} className="card-hover-primary card-gradient-bar">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><Icon className="icon-lg text-primary" /></div>
                    <div><h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3><p className="text-muted-foreground text-sm">{benefit.description}</p></div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mb-16 animate-slideUp">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">How to Join</h2>
          <div className="flex flex-col gap-4">
            {steps.map((item, i) => (
              <Card key={i} className="card-hover-primary flex items-start gap-5">
                <div className="size-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-primary/25">{item.step}</div>
                <div className="flex-1 pt-2"><h3 className="font-semibold text-foreground text-lg mb-1">{item.title}</h3><p className="text-muted-foreground">{item.description}</p></div>
              </Card>
            ))}
          </div>
        </section>

        <section className="cta-gradient text-primary-foreground rounded-2xl p-12 md:p-16 relative overflow-hidden animate-slideUp">
          <div className="cta-glow size-48 top-0 right-0" />
          <div className="cta-glow size-32 bottom-0 left-0" />
          <div className="relative z-10 text-center">
            <CheckCircle className="icon-5xl mx-auto mb-4" />
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Join?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">Start your IEEE IES membership journey today and unlock access to a world of technical knowledge.</p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-6 shadow-lg">
              <a href="https://www.ieee.org/membership/join/index.html?WT.mc_id=ies_join" target="_blank" rel="noreferrer">Join IEEE Now <ArrowRight className="icon-md ml-2" /></a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
