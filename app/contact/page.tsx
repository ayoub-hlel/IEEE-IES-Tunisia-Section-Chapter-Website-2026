import type { Metadata } from "next";
import { Mail, MapPin, Facebook, Linkedin, Instagram, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

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
                    {[["Facebook", "https://www.facebook.com/profile.php?id=61551058026833", Facebook], ["LinkedIn", "https://www.linkedin.com/company/ieee-ies-tunisia-chapter/about/?viewAsMember=true", Linkedin], ["Instagram", "https://www.instagram.com/ieee_ies_tunisia_chapter", Instagram]].map(([label, href, Icon]: any) => (
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
              <form className="flex flex-col gap-4">
                <div><label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label><Input id="name" placeholder="Your name" /></div>
                <div><label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label><Input id="email" type="email" placeholder="your@email.com" /></div>
                <div><label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label><Textarea id="message" rows={5} placeholder="How can we help?" className="resize-none" /></div>
                <Button className="font-bold tracking-wide shadow-md"><Send className="icon-md mr-2" />Send Message</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">Note: This is a static form. Email us at <a href="mailto:ies.tn@ieee.org" className="text-primary hover:underline font-medium">ies.tn@ieee.org</a></p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
