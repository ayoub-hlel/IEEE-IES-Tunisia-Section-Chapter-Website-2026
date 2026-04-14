import type { Metadata } from "next";
import { Mail, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | IEEE IES Tunisia Section",
  description: "Get in touch with the IEEE IES Tunisia Section team.",
};

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-fadeUp">
          <Badge variant="secondary" className="section-label">Get in Touch</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">Contact <span className="text-primary">Us</span></h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">Have questions or want to collaborate? We&apos;d love to hear from you.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="card-hover card-gradient-bar">
            <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><Mail className="icon-md text-primary" /></div>
                  <div><h3 className="font-semibold text-sm text-foreground mb-1">Email</h3><a href="mailto:ies.tn@ieee.org" className="text-primary hover:underline text-sm font-medium">ies.tn@ieee.org</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><MapPin className="icon-md text-primary" /></div>
                  <div><h3 className="font-semibold text-sm text-foreground mb-1">Location</h3><p className="text-muted-foreground text-sm">Tunisia</p></div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-3">Follow Us</h3>
                  <div className="flex gap-2">
                    {[
                      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61551058026833", Icon: Facebook },
                      { label: "LinkedIn", href: "https://www.linkedin.com/company/ieee-ies-tunisia-chapter/about/?viewAsMember=true", Icon: Linkedin },
                      { label: "Instagram", href: "https://www.instagram.com/ieee_ies_tunisia_chapter", Icon: Instagram },
                    ].map(({ label, href, Icon }) => (
                      <a key={label} href={href} target="_blank" rel="noreferrer" className="size-9 bg-primary/5 rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label={label}><Icon className="icon-md" /></a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50 card-hover card-gradient-bar">
            <CardHeader><CardTitle>Send a Message</CardTitle></CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
