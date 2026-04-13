"use client";

import { useState } from "react";
import { Mail, Linkedin, Facebook, User } from "lucide-react";

export type OfficerData = {
  name: string;
  role: string;
  mail: string;
  linkedin: string;
  facebook: string;
  photo: string | null;
};

function OfficerCard({ officer }: { officer: OfficerData }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Compact avatar + role */}
      <div className="flex flex-col items-center gap-2">
        <div className="size-16 rounded-full overflow-hidden bg-muted ring-2 ring-transparent group-hover:ring-primary transition-all duration-300">
          {officer.photo ? (
            <img
              src={`/team/${officer.photo}`}
              alt={officer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="size-full flex items-center justify-center">
              <User className="size-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="font-semibold text-sm leading-tight">{officer.name}</p>
          <p className="text-xs text-primary font-medium mt-0.5">{officer.role}</p>
        </div>
      </div>

      {/* Expanded card on hover */}
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 bg-card rounded-xl shadow-lg ring-1 ring-border p-4 z-10">
          <div className="flex items-center gap-3 mb-3 pb-3 border-b">
            <div className="size-10 rounded-full overflow-hidden bg-muted shrink-0">
              {officer.photo ? (
                <img
                  src={`/team/${officer.photo}`}
                  alt={officer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="size-full flex items-center justify-center">
                  <User className="size-4 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold text-xs leading-tight">{officer.name}</p>
              <p className="text-xs text-primary font-medium">{officer.role}</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <a
              href={officer.mail}
              className="text-muted-foreground/60 hover:text-primary transition-colors"
              aria-label={`Email ${officer.name}`}
            >
              <Mail className="size-4" />
            </a>
            <a
              href={officer.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground/60 hover:text-primary transition-colors"
              aria-label={`${officer.name} LinkedIn`}
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={officer.facebook}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground/60 hover:text-primary transition-colors"
              aria-label={`${officer.name} Facebook`}
            >
              <Facebook className="size-4" />
            </a>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="w-3 h-3 bg-card border-b border-r border-border rotate-45 translate-y-[-50%]" />
          </div>
        </div>
      )}
    </div>
  );
}

export function OfficerGrid({ officers }: { officers: OfficerData[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6 md:gap-8 justify-items-center">
      {officers.map((officer) => (
        <OfficerCard key={officer.name} officer={officer} />
      ))}
    </div>
  );
}
