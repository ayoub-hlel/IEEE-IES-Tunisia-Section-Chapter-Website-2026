"use client";

import React, { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

type NavItem =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string }[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Subunits", href: "/subunits/" },
  { label: "Hubs & Nodes", href: "/hubs-nodes/" },
  {
    label: "Activities",
    children: [
      { label: "Chapter Activities", href: "/activities/chapter/" },
      { label: "Student Branch Chapters Activities", href: "/activities/sbc/" },
    ],
  },
  {
    label: "Awards & Recognitions",
    children: [
      { label: "Awards", href: "/awards/" },
      { label: "Received Awards", href: "/awards/received/" },
    ],
  },
  { label: "About Us", href: "/about/" },
  { label: "Contact Us", href: "/contact/" },
];

const topLinks = [
  ["IEEE.org", "https://www.ieee.org/"],
  ["IEEE Xplore", "https://ieeexplore.ieee.org/"],
  ["IEEE Standards", "https://standards.ieee.org/"],
  ["IEEE Spectrum", "https://spectrum.ieee.org/"],
];

function NavDropdown({
  label,
  children,
}: {
  label: string;
  children: { label: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="nav-link inline-flex items-center gap-1"
        aria-label={`${label} submenu`}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={`icon-sm opacity-60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 min-w-56 z-50 pt-2">
          <div className="bg-primary shadow-2xl rounded-lg overflow-hidden divide-y divide-white/10 border border-white/10 backdrop-blur-sm">
            {children.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/20 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  return (
    <header id="header" className="site-header relative z-50">
      {/* Top bar — IEEE org style */}
      <div className="bg-[#FDF1E8]">
        <div className="container mx-auto px-4 py-1.5 flex flex-wrap items-center gap-x-0 gap-y-0.5 text-xs font-medium">
          {topLinks.map(([label, href], i) => (
            <React.Fragment key={label}>
              {i > 0 && <span className="mx-3 select-none text-primary/30" aria-hidden="true">|</span>}
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logos/ies-white.png"
              alt="IEEE IES Tunisia Section"
              className="h-22 w-auto"
            />
          </a>

          <a
            href="https://www.ieee.org/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <img
              src="/logos/ieee-white.png"
              alt="IEEE"
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center justify-center py-2 border-t border-white/10 gap-0"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            if ("children" in item) {
              return (
                <NavDropdown key={item.label} label={item.label}>
                  {item.children}
                </NavDropdown>
              );
            }
            return (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center justify-between py-3 border-t border-white/10">
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 size-10"
                aria-label="Open navigation menu"
              >
                <Menu className="icon-md" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              
              <Separator className="my-4" />
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  if ("children" in item) {
                    return (
                      <div key={item.label} className="py-2">
                        <p className="font-semibold text-foreground text-sm px-2 mb-1">
                          {item.label}
                        </p>
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="block py-2 px-6 text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-foreground font-medium py-2.5 px-2 hover:text-primary hover:bg-muted rounded-md transition-colors"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
