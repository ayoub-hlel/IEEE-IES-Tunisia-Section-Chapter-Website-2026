import { Button } from "@/components/ui/button";

export default function AboutSection() {
  return (
    <section className="section">
      <div className="container mx-auto my-22 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label">Who We Are</p>
          <h1 className="text-5xl font-bold mb-4">About IEEE IES Tunisia</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mx-auto mb-8 max-w-2xl">
            The IEEE Industrial Electronics Society (IES) Tunisia Section is
            dedicated to advancing the theory and practice of industrial
            electronics, automation, power systems, and related fields.
          </p>
          <Button asChild className="font-semibold">
            <a href="/about/">Read More About Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
