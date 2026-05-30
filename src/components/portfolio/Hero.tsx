import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/assets/profile.jpg";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-hero-gradient">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Hi, I'm <span className="text-gradient">Md. Sohel Parvez</span>
            <br />
            <span className="text-foreground/90 text-3xl sm:text-4xl lg:text-5xl">
              Building reliable software & leading teams.
            </span>
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Computer Science & Engineering student at Varendra University, Junior SEO Executive,
            and student leader passionate about systems, algorithms, and meaningful impact.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Rajshahi, Bangladesh</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary-gradient text-primary-foreground shadow-elegant hover:opacity-90">
              <a href="#projects">View Projects <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact"><Mail className="mr-2 h-4 w-4" /> Get in Touch</a>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://www.linkedin.com/in/md-sohel-parvez"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:sohelparvez1911@gmail.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="relative animate-fade-in lg:justify-self-end">
          <div className="absolute -inset-6 bg-primary-gradient opacity-20 blur-3xl rounded-full" aria-hidden />
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-elegant border border-border bg-card">
            <img
              src={profile}
              alt="Portrait of Md. Sohel Parvez"
              width={768}
              height={896}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 glass border border-border rounded-2xl px-5 py-4 shadow-card hidden sm:block animate-float">
            <p className="text-xs text-muted-foreground">Currently</p>
            <p className="text-sm font-semibold">B.Sc. CSE • Varendra University</p>
          </div>
        </div>
      </div>
    </section>
  );
}
