import { ArrowUpRight, Atom, Camera, Code2, FileDown, Lightbulb, RotateCcw, Search, Sparkles, Trophy } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useProfileImage } from "@/hooks/use-profile-image";
import { useOwnerMode } from "@/hooks/use-owner-mode";


const cvUrl = "/Md_Sohel_Parvez_CV.pdf";


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

const marquee = [
  "C++", "C", "Operating Systems", "Data Structures", "Algorithms",
  "SEO", "UI / UX", "Leadership", "Public Speaking", "Research",
  "NASA Space Apps", "MillionX Finalist", "Hult Prize",
];

export function Hero() {
  const { src: profile, update, reset } = useProfileImage();
  const { isOwner } = useOwnerMode();
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      e.target.value = "";
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image must be under 4MB.");
      e.target.value = "";
      return;
    }
    try {
      await update(file);
      toast.success("Profile photo updated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    }
    e.target.value = "";
  };

  return (
    <section id="home" aria-label="Introduction" className="relative pt-28 pb-10 lg:pt-32 lg:pb-16 overflow-hidden">

      {/* Ambient background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-20 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-24 h-[480px] w-[480px] rounded-full opacity-35 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 55%, transparent), transparent 70%)", animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero card */}
        <div className="relative overflow-hidden rounded-[2rem] bg-hero-surface border border-border px-6 sm:px-10 lg:px-16 pt-12 lg:pt-16 pb-10 lg:pb-12 shadow-card">
          {/* Decorative grid + radial fade */}
          <div aria-hidden className="absolute inset-0 bg-grid mask-radial-fade opacity-60" />
          <div
            aria-hidden
            className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--primary) 50%, transparent), transparent 70%)" }}
          />

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* Left */}
            <div className="space-y-7 animate-fade-up relative z-10">
              {/* Available pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1.5 text-xs font-medium shadow-card">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-muted-foreground">Available for opportunities</span>
              </div>

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

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="group bg-primary-gradient text-primary-foreground shadow-elegant hover:opacity-95 rounded-xl px-7 h-12"
                >
                  <a href="#contact">
                    Hire Me
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-2 border-primary text-foreground hover:bg-primary/5 px-7 h-12"
                >
                  <a href="#about">Know More</a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="rounded-xl border border-border hover:bg-accent px-5 h-12"
                >
                  <a
                    href={cvUrl}
                    download="Md_Sohel_Parvez_CV.pdf"
                    aria-label="Download CV / Resume (PDF)"
                    rel="noopener noreferrer"
                  >
                    <FileDown className="mr-1.5 h-4 w-4" aria-hidden />
                    CV
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Atom className="h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground leading-snug max-w-xs">
                  CSE Student & Aspiring Software /
                  <br className="hidden sm:block" /> Systems Professional | AI Enthusiast
                </p>
              </div>
            </div>

            {/* Right: portrait with gradient shape */}
            <div className="relative h-[460px] sm:h-[520px] lg:h-[560px]">
              {/* slow rotating dotted ring */}
              <div
                aria-hidden
                className="absolute right-8 top-4 h-32 w-32 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow"
              />
              {/* angular gradient backdrop */}
              <div
                className="absolute right-2 sm:right-6 top-6 bottom-12 w-[78%] sm:w-[80%] bg-portrait-gradient shadow-elegant"
                style={{ clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0 100%)" }}
                aria-hidden
              />
              {/* dotted pattern on backdrop */}
              <div
                aria-hidden
                className="absolute right-6 top-10 h-24 w-24 bg-dots opacity-40"
              />
              {/* portrait */}
              <img
                src={profile}
                alt="Portrait of Md. Sohel Parvez"
                width={720}
                height={900}
                className="absolute right-0 bottom-0 h-[95%] w-auto max-w-none object-contain object-bottom drop-shadow-2xl"
              />

              {/* Image edit controls — owner only */}
              {isOwner && (
                <>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={onPick}
                    className="sr-only"
                    aria-label="Upload new profile photo"
                  />
                  <div className="absolute right-3 bottom-3 flex gap-2 z-10">
                    <Button
                      type="button"
                      size="icon"
                      onClick={() => fileRef.current?.click()}
                      className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-elegant hover:opacity-90"
                      aria-label="Change profile photo"
                      title="Change profile photo"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={reset}
                      className="h-10 w-10 rounded-full bg-card shadow-card"
                      aria-label="Reset profile photo"
                      title="Reset to default"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}


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
                <div className="relative h-10 w-10 rounded-lg bg-primary-gradient text-primary-foreground flex items-center justify-center animate-pulse-ring">
                  <Trophy className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold leading-tight">
                  NASA Space Apps
                  <br />
                  Global Selectee
                </p>
              </div>

              {/* bottom-left mini badge */}
              <div className="absolute left-0 bottom-2 bg-card/90 backdrop-blur border border-border rounded-xl px-3 py-2 shadow-card flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-[11px] font-semibold leading-tight">
                  MillionX BD
                  <br />
                  <span className="text-muted-foreground font-medium">Finalist · 17th</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role strip */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          <div className="relative overflow-hidden rounded-2xl bg-accent text-accent-foreground p-6 flex flex-col justify-between min-h-[160px] shadow-card">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-white/70" />
            <div className="font-display text-5xl font-bold leading-none relative">3+</div>
            <p className="text-sm font-medium mt-4 opacity-90 relative">
              Years Building
              <br />&amp; Leading
            </p>
          </div>
          {roles.map(({ icon: Icon, title, text, tint }) => (
            <div
              key={title}
              className="group rounded-2xl bg-card border border-border p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant flex flex-col"
            >
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ background: `color-mix(in oklab, ${tint} 25%, transparent)`, color: tint }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-base flex items-center gap-1.5">
                {title}
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Tech marquee */}
        <div className="mt-12 marquee-mask overflow-hidden">
          <div className="flex w-max gap-3 animate-marquee">
            {[...marquee, ...marquee].map((item, i) => (
              <span
                key={i}
                className="shrink-0 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground shadow-card"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
