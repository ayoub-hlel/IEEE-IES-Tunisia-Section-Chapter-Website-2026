import type { Metadata } from "next";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Student Branch Chapters Activities | IEEE IES Tunisia Section",
  description: "Discover activities from our Student Branch Chapters across Tunisia. Join workshops, hackathons, and community events organized by our vibrant student communities.",
};

function getMonthDetails() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: { day: number; isCurrentMonth: boolean; isToday: boolean }[] = [];

  // Previous month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isToday: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true, isToday: i === today });
  }
  // Next month padding
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false, isToday: false });
  }

  return {
    monthName: monthNames[month],
    year,
    dayNames,
    calendarDays,
    today,
  };
}

export default function SBCActivitiesPage() {
  const { monthName, year, dayNames, calendarDays } = getMonthDetails();

  return (
    <div className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted-foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground)/0.05)_1px,transparent_1px)] bg-[size:96px_96px]" />

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeUp">
          <Badge variant="secondary" className="section-label mb-4">Student Branch Chapters</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            SBC <span className="text-primary">Activities</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Discover activities from our Student Branch Chapters across Tunisia. Join workshops, hackathons, and community events organized by our vibrant student communities.
          </p>
        </div>

        {/* Events this month */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Events in <span className="text-primary">{monthName}</span>
            </h2>
            <div className="hidden md:flex items-center gap-2 text-muted-foreground text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              0 Upcoming Events
            </div>
          </div>

          <div className="text-center py-16 bg-card rounded-sm border shadow-sm">
            <Calendar className="size-16 mx-auto text-muted-foreground/30 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-foreground mb-2">No Events This Month</h3>
            <p className="text-muted-foreground">Check back later for upcoming activities in {monthName}.</p>
          </div>
        </section>

        {/* Calendar */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-foreground">Full Calendar</h2>
            <div className="h-px flex-grow bg-border" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Calendar grid */}
            <div className="flex-1 bg-card rounded-sm shadow-sm hover:shadow-md border overflow-hidden flex flex-col transition-shadow">
              {/* Month header */}
              <div className="p-6 bg-secondary text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Calendar className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{monthName}</h2>
                    <p className="text-white/70">{year}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Previous month">
                    <ChevronLeft className="size-6" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Next month">
                    <ChevronRight className="size-6" />
                  </button>
                </div>
              </div>

              {/* Day headers */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-7 mb-4 shrink-0">
                  {dayNames.map((d) => (
                    <div key={d} className="text-center text-sm font-semibold text-muted-foreground/60 py-2">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Date grid */}
                <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
                  {calendarDays.map((entry, i) => (
                    <div
                      key={i}
                      className={`h-14 rounded-sm flex items-center justify-center transition-all ${
                        entry.isCurrentMonth
                          ? entry.isToday
                            ? "bg-secondary text-white shadow-md font-bold"
                            : "text-foreground hover:bg-muted cursor-pointer"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      <span className="text-sm">{entry.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day detail panel */}
            <div className="lg:w-96">
              <div className="bg-card rounded-sm shadow-sm hover:shadow-md border p-6 h-full min-h-[400px] transition-shadow">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Events for <span className="text-primary">{monthName.slice(0, 3)} {getMonthDetails().today}</span>
                </h3>
                <div className="space-y-4">
                  <div className="text-center py-12 text-muted-foreground/60">
                    <Calendar className="size-12 mx-auto mb-4 opacity-20" aria-hidden="true" />
                    <p>No events scheduled for this day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12">
          <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Have an Event to Share?</h2>
              <p className="text-base text-white/90 mb-6 max-w-2xl mx-auto">
                Submit your event details and help grow our community calendar. Whether it&apos;s a workshop, conference, or meetup, we&apos;d love to feature it!
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-6 text-base shadow-lg hover:scale-105 transition-all duration-300"
              >
                <a href="https://forms.gle/wyuJirLLZYyiYL9T9" target="_blank" rel="noopener noreferrer">
                  <Calendar className="size-5 mr-2" aria-hidden="true" />
                  Declare Your Event
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
