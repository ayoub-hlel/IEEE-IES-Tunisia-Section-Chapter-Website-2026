import type { Metadata } from "next";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Events | IEEE IES Tunisia Section",
  description: "Upcoming and past events organized by IEEE IES Tunisia Section.",
};

// ─── Placeholder data — replace with backend fetch later ───
const events = [
  {
    id: 1,
    title: "IES Tunisia Tech Day 2026",
    description: "A full-day technical conference featuring workshops, keynotes, and networking sessions for students and professionals in industrial electronics.",
    date: "2026-05-15",
    time: "09:00",
    location: "ENIT, Tunis",
    organizer: "IES Tunisia Section",
    tags: ["Conference", "Workshop"],
  },
  {
    id: 2,
    title: "Embedded Systems Workshop",
    description: "Hands-on workshop on STM32 microcontrollers and real-time operating systems for industrial automation applications.",
    date: "2026-06-20",
    time: "14:00",
    location: "ESPRIT, Tunis",
    organizer: "IAS IES PES ESPRIT",
    tags: ["Workshop", "Embedded"],
  },
  {
    id: 3,
    title: "Power Electronics Seminar",
    description: "Technical seminar on modern power conversion topologies and their applications in renewable energy systems.",
    date: "2026-04-10",
    time: "10:00",
    location: "ENISO, Sousse",
    organizer: "ENISO IES Student Branch",
    tags: ["Seminar", "Power"],
  },
];

function formatDate(dateStr: string): { month: string; day: string; weekday: string } {
  const date = new Date(dateStr + "T00:00:00");
  const month = date.toLocaleDateString("en", { month: "short" });
  const day = date.getDate().toString();
  const weekday = date.toLocaleDateString("en", { weekday: "short" });
  return { month, day, weekday };
}

function EventCard({ event }: { event: (typeof events)[number] }) {
  const { month, day, weekday } = formatDate(event.date);

  return (
    <Card className="hover:border-primary/40 transition-colors">
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Date block */}
          <div className="shrink-0 w-16 text-center bg-primary/5 rounded-lg p-2">
            <div className="text-xs font-semibold uppercase text-primary">{month}</div>
            <div className="text-2xl font-bold leading-none text-foreground">{day}</div>
            <div className="text-[10px] text-muted-foreground uppercase">{weekday}</div>
          </div>

          {/* Event details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground leading-tight mb-1.5">{event.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="icon-sm text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="icon-sm text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="icon-sm text-primary" />
                <span>{event.organizer}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EventsPage() {
  const upcoming = events.filter((e) => new Date(e.date + "T00:00:00") >= new Date());
  const past = events.filter((e) => new Date(e.date + "T00:00:00") < new Date());

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="section-label">What&apos;s Happening</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">Upcoming <span className="text-primary">Events</span></h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Discover upcoming workshops, seminars, and conferences organized by IEEE IES Tunisia Section and its student branches.
          </p>
        </div>

        {/* Upcoming events */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
            <Badge variant="secondary" className="text-xs">
              {upcoming.length} Event{upcoming.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          {upcoming.length > 0 ? (
            <div className="flex flex-col gap-4">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="icon-xl mx-auto mb-3 opacity-30" />
              <p className="text-sm">No upcoming events at the moment.</p>
              <p className="text-xs mt-1">Check back later for new events.</p>
            </div>
          )}
        </section>

        {/* Past events */}
        {past.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Past Events</h2>
            <div className="flex flex-col gap-4">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-muted/50 rounded-2xl p-10 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Have an Event to Share?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you&apos;re part of an IES student branch and want to list your event, get in touch with us.
          </p>
          <Button asChild size="lg" className="font-bold">
            <a href="/contact/">Declare Your Event</a>
          </Button>
        </section>
      </div>
    </div>
  );
}
