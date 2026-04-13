import { Users, GraduationCap, Calendar, Award } from "lucide-react";
import { getStats } from "@/lib/db";

const statsConfig = [
  {
    label: "Active Members",
    key: "members" as const,
    icon: Users,
    color: "from-primary to-primary"
  },
  {
    label: "Student Branch Chapters",
    key: "chapters" as const,
    icon: GraduationCap,
    color: "from-primary to-primary"
  },
  {
    label: "Events per Year",
    key: "events" as const,
    icon: Calendar,
    color: "from-primary to-primary"
  },
  {
    label: "Years of Impact",
    key: "years" as const,
    icon: Award,
    color: "from-primary to-primary"
  },
];

export default function StatsSection() {
  const stats = getStats();

  return (
    <section className="relative bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {statsConfig.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative py-8 group cursor-default overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center relative z-10">
                  <div className="flex items-baseline gap-1 mb-3 relative">
                    <span className={`text-6xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent drop-shadow-sm`}>
                      <span>{stats[stat.key]}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                      <div className="w-4 h-4">
                        <Icon className="w-full h-full" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="text-foreground font-bold text-sm uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </div>

                {/* Background icon watermark */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500 pointer-events-none"
                  style={{ color: index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))' }}
                >
                  <Icon className="w-full h-full" aria-hidden="true" />
                </div>

                {/* Radial gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: index % 2 === 0
                      ? 'radial-gradient(circle, hsl(var(--primary) / 0.03) 0%, transparent 70%)'
                      : 'radial-gradient(circle, hsl(var(--secondary) / 0.03) 0%, transparent 70%)'
                  }}
                />

                {/* Bottom border animation */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${stat.color} group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
