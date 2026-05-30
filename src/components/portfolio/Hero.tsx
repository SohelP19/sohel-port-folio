import { ArrowUpRight, Atom, Code2, Lightbulb, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import profile from "@/assets/profile.jpg";

const roles = [
  {
    icon: Code2,
    title: "Software Developer",
    text: "Building reliable systems with C++ and modern web stacks.",
    tint: "oklch(0.78 0.14 165)",
  },
  {
    icon: Lightbulb,
    title: "Systems Thinker",
    text: "Deep curiosity for OS internals, processes & algorithms.",
    tint: "oklch(0.80 0.16 80)",
  },
  {
    icon: Search,
    title: "SEO Executive",
    text: "Junior SEO Executive crafting growth-focused strategy.",
    tint: "oklch(0.72 0.14 250)",
  },
];

export function Hero() {
  return (
    <section id="home" className="relative pt-28 pb-10 lg:pt-32 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-hero-surface border border-border px-6 sm:px-10 lg:px-16 pt-12 lg:pt-16 pb-10 lg:pb-12 shadow-card">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* Left */}
            <div className="space-y-7 animate-fade-up relative z-10">
              <h1 className="font-display font-bold leading-[1.02] tracking-tight text-foreground text-5xl sm:text-6xl lg:text-7xl">
                Hi! I Am
                <br />
                Md. Sohel
                <br />
                Parvez<span className="text-primary">.</span>
              </h1>

              <p className="text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed">
                Computer Science &amp; Engineering student at Varendra University,
                Junior SEO Executive, and student leader passionate about systems,
                algorithms, and meaningful impact.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground shadow-elegant hover:opacity-90 rounded-xl px-7 h-12"
                >
                  <a href="#contact">Hire Me</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-2 border-primary text-foreground hover:bg-primary/5 px-7 h-12"
                >
                  <a href="#about">Know More</a>
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Atom className="h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground leading-snug max-w-xs">
                  CSE Student &amp; Aspiring Software /
                  <br className="hidden sm:block" /> Systems Professional.
                </p>
              </div>
            </div>

            {/* Right: portrait with gradient shape */}
            <div className="relative h-[460px] sm:h-[520px] lg:h-[560px]">
              {/* angular gradient backdrop */}
              <div
                className="absolute right-2 sm:right-6 top-6 bottom-12 w-[78%] sm:w-[80%] bg-portrait-gradient shadow-elegant"
                style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
                aria-hidden
              />
              {/* portrait */}
              <img
                src={profile}
                alt="Portrait of Md. Sohel Parvez"
                width={720}
                height={900}
                className="absolute right-0 bottom-0 h-[95%] w-auto max-w-none object-contain object-bottom drop-shadow-2xl"
              />

              {/* floating stat card */}
              <div className="absolute left-0 sm:left-4 top-1/2 -translate-y-6 bg-card border border-border rounded-xl px-5 py-4 shadow-card animate-float">
                <div className="font-display text-3xl font-bold text-accent">12<span className="text-primary">+</span></div>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">
                  Leadership
                  <br />
                  Roles
                </p>
              </div>

              {/* floating award card */}
              <div className="absolute right-0 top-6 bg-card border border-border rounded-xl px-4 py-3 shadow-card flex items-center gap-3 max-w-[180px]">
                <div className="h-10 w-10 rounded-lg bg-primary-gradient text-primary-foreground flex items-center justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold leading-tight">
                  NASA Space Apps
                  <br />
                  Global Selectee
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role strip */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          <div className="rounded-2xl bg-accent text-accent-foreground p-6 flex flex-col justify-between min-h-[160px] shadow-card">
            <div className="font-display text-5xl font-bold leading-none">3+</div>
            <p className="text-sm font-medium mt-4 opacity-90">
              Years Building
              <br />&amp; Leading
            </p>
          </div>
          {roles.map(({ icon: Icon, title, text, tint }) => (
            <div
              key={title}
              className="rounded-2xl bg-card border border-border p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant flex flex-col"
            >
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `color-mix(in oklab, ${tint} 25%, transparent)`, color: tint }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-base flex items-center gap-1.5">
                {title}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
