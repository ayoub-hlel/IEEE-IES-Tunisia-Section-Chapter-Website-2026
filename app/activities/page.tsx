import type { Metadata } from "next";
import { Cpu, GraduationCap, Users, Award, Calendar, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Activities | IEEE IES Tunisia Section",
  description: "Explore the technical workshops, bootcamps, conferences, and competitions organized by IEEE IES Tunisia.",
};

const allActivities = [
  { icon: Cpu, title: "Industrial Electronics Workshop", category: "Workshop", description: "A hands-on workshop covering PLC programming, motor drives, and industrial automation systems.", date: "TBA" },
  { icon: GraduationCap, title: "MERN Stack Bootcamp", category: "Bootcamp", description: "An intensive bootcamp teaching MongoDB, Express.js, React, and Node.js for aspiring web developers.", date: "TBA" },
  { icon: Users, title: "IES Technical Conference", category: "Conference", description: "Annual conference featuring keynote speakers, paper presentations, and panel discussions.", date: "TBA" },
  { icon: Award, title: "Innovation Challenge", category: "Competition", description: "A technical competition where teams solve real-world industrial problems.", date: "TBA" },
  { icon: Calendar, title: "Power Electronics Seminar", category: "Seminar", description: "Expert talks on modern power electronics topologies, renewable energy systems, and smart grids.", date: "TBA" },
  { icon: Rocket, title: "IoT & Embedded Systems Workshop", category: "Workshop", description: "Learn to build IoT solutions using Arduino, Raspberry Pi, and ESP32 with cloud integration.", date: "TBA" },
];

export default function ActivitiesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16 animate-fadeUp">
          <Badge variant="secondary" className="section-label">Our Programs</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">Our <span className="text-primary">Activities</span></h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">Discover the workshops, bootcamps, conferences, and competitions we organize to empower the IES community in Tunisia.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allActivities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <Card key={i} className="card-hover-primary card-gradient-bar">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-9 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="icon-md text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-primary text-[10px] font-bold uppercase tracking-wide">{activity.category}</Badge>
                  </div>
                  <CardTitle className="text-base">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-2">{activity.description}</CardDescription>
                  <p className="text-xs text-muted-foreground">Date: {activity.date}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center animate-slideUp">
          <p className="text-muted-foreground mb-4">More activities will be announced soon.</p>
          <Button asChild size="lg" className="font-bold tracking-wide shadow-md">
            <a href="https://www.ieee.org/membership/join/index.html?WT.mc_id=ies_join" target="_blank" rel="noreferrer">Join IES to Participate</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
