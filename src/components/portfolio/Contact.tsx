import { FileDown, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import cvAsset from "@/assets/cv.pdf.asset.json";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:sohelparvez1911@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
      form.reset();
    }, 600);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something great."
      description="Open to internships, collaborations, and meaningful opportunities."
    >
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: Mail, label: "Email", value: "sohelparvez1911@gmail.com", href: "mailto:sohelparvez1911@gmail.com" },
            { icon: Phone, label: "Phone", value: "+880 1797 362701", href: "tel:+8801797362701" },
            { icon: MapPin, label: "Location", value: "Rajshahi, Bangladesh" },
            { icon: Linkedin, label: "LinkedIn", value: "md-sohel-parvez", href: "https://www.linkedin.com/in/md-sohel-parvez" },
          ].map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <span className="h-11 w-11 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground shrink-0">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-medium text-sm truncate">{value}</p>
              </div>
            </a>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-3 rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-card space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" name="name" placeholder="Your name" className="mt-1.5" required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-1.5" required />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea id="message" name="message" rows={5} placeholder="How can I help?" className="mt-1.5" required />
          </div>
          <Button
            type="submit"
            disabled={sending}
            className="w-full sm:w-auto bg-primary-gradient text-primary-foreground shadow-elegant hover:opacity-90"
          >
            <Send className="mr-2 h-4 w-4" />
            {sending ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </Section>
  );
}
