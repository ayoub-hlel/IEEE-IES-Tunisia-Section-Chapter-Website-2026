import {
  Users,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { href: "https://ieee-collabratec.ieee.org/", label: "IEEE Collabratec", icon: Users },
  { href: "https://twitter.com/IEEEorg", label: "Twitter", icon: Twitter },
  { href: "https://www.facebook.com/IEEEIESTunisia", label: "Facebook", icon: Facebook },
  { href: "https://www.linkedin.com/company/ieee-ies-tunisia", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.youtube.com/user/IEEEorg", label: "YouTube", icon: Youtube },
  { href: "https://www.instagram.com/ieeeorg/", label: "Instagram", icon: Instagram },
  { href: "https://www.addthis.com/bookmark.php", label: "Share", icon: Share2 },
];

const footerNav = [
  { label: "Home", href: "/" },
  { label: "Sitemap", href: "https://ieee.tn/sitemap.html", external: true },
  { label: "Contact & Support", href: "mailto:ies.tn@ieee.org" },
  { label: "Accessibility", href: "https://www.ieee.org/accessibility-statement.html", external: true },
  { label: "Nondiscrimination Policy", href: "https://www.ieee.org/about/corporate/governance/p9-26.html", external: true },
  { label: "Terms and Conditions", href: "http://www.ieee.org/site_terms_conditions.html", external: true },
  { label: "IEEE Privacy Policy", href: "https://www.ieee.org/security_privacy.html", external: true },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <p className="text-sm text-white/70 leading-relaxed mb-0">
              &copy; Copyright {new Date().getFullYear()} IEEE. All rights
              reserved. Use of this website signifies your agreement to the IEEE
              Terms and Conditions.
            </p>
          </div>
          <div className="md:text-right">
            <Button
              asChild
              variant="secondary"
              className="bg-white text-secondary hover:bg-white/90 font-semibold text-sm mb-4"
            >
              <a
                target="_blank"
                href="https://www.ieee.org/membership/join/index.html?WT.mc_id=ies_join"
                rel="noreferrer"
              >
                Join IEEE
              </a>
            </Button>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 hover:text-white hover:bg-white/10 size-8 flex items-center justify-center rounded-full transition-colors"
                    aria-label={s.label}
                  >
                    <Icon className="icon-md" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <Separator className="bg-white/15 mb-6" />
        <ul className="flex flex-wrap gap-x-4 gap-y-2 list-none p-0 m-0">
          {footerNav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-white/60 hover:text-white hover:underline transition-colors"
                {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
