"use client";

import { useState } from "react";
import { useForm } from "@formspree/react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("myklyood");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  if (state.succeeded) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center size-16 bg-green-500/10 rounded-full mb-4">
          <CheckCircle className="size-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground text-sm">Thank you for reaching out. We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  const hasErrors = Array.isArray(state.errors) && state.errors.length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {hasErrors && (
        <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/5 rounded-lg p-3">
          <AlertCircle className="size-4 shrink-0" />
          <span>Something went wrong. Please try again or email us directly.</span>
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
        <Input id="name" name="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
        <Input id="email" name="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
        <Textarea id="message" name="message" rows={5} placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} className="resize-none" required />
      </div>
      <Button type="submit" disabled={state.submitting} className="font-bold tracking-wide shadow-md">
        <Send className="icon-md mr-2" />
        {state.submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
