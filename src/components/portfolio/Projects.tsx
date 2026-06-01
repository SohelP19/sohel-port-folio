import { ExternalLink, Trophy, Rocket, Waves, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  icon: typeof Rocket;
  name: string;
  tagline: string;
  desc: string;
  achievement: string;
  href: string | null;
  tags: string[];
  year: number;
};

const projects: Project[] = [
  {
    icon: Rocket,
    name: "HomeSchool",
    tagline: "Online education platform",
    desc: "An online education platform built to improve access to learning resources and digital education for students.",
    achievement: "Selected for the Final Round of MillionX Bangladesh — Ranked 17th among 60 finalists.",
    href: "https://homeschool.moonx.dev",
    tags: ["EdTech", "Web Platform", "Finalist"],
    year: 2024,
  },
  {
    icon: Waves,
    name: "Team Talestra — Space Weather Explorer",
    tagline: "NASA Space Apps 2025",
    desc: "A platform explaining how solar activity impacts Earth, satellites, communication systems, and the space environment.",
    achievement: "Advanced to the Global Round of NASA Space Apps Challenge 2025.",
    href: null,
    tags: ["Space", "Visualization", "Global Round"],
    year: 2025,
  },
  {
    icon: Trophy,
    name: "AquaSol",
    tagline: "UIHP Cohort-5 Project",
    desc: "An innovative project developed and presented during UIHP Cohort-5, exploring sustainable problem-solving.",
    achievement: "Showcased at UIHP Cohort-5.",
    href: null,
    tags: ["Innovation", "Sustainability"],
    year: 2024,
  },
];

const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
type Sort = "newest" | "oldest" | "az";

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("newest");

  const visible = useMemo(() => {
    const list = projects.filter((p) => filter === "All" || p.tags.includes(filter));
    return [...list].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      return sort === "newest" ? b.year - a.year : a.year - b.year;
    });
  }, [filter, sort]);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured Work"
      description="Selected projects that blend technical execution with real-world impact."
    >
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div role="tablist" aria-label="Filter projects by tag" className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const active = filter === tag;
            return (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tag)}
                className={cn(
                  "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-card"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary/40",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowUpDown className="h-4 w-4" />
          <span className="sr-only">Sort projects</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="bg-card border border-border rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Sort projects"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">Name (A–Z)</option>
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects match this filter.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(({ icon: Icon, ...p }) => (
            <article
              key={p.name}
              className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant focus-within:-translate-y-1 focus-within:shadow-elegant"
            >
              <div className="relative h-28 bg-portrait-gradient overflow-hidden">
                <div aria-hidden className="absolute inset-0 bg-grid opacity-30" />
                <div aria-hidden className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                <span className="absolute right-4 top-4 text-[11px] font-semibold text-white/90 bg-black/20 backdrop-blur px-2 py-0.5 rounded-full">
                  {p.year}
                </span>
                <div className="absolute -bottom-6 left-6 h-14 w-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-card">
                  <Icon className="h-6 w-6 text-primary" aria-hidden />
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6 pt-10">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <p className="text-xs font-medium text-primary mt-0.5">{p.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <p className="mt-3 text-sm font-medium text-foreground/90">{p.achievement}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-accent/15 text-accent border border-accent/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  {p.href ? (
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-lg border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer external"
                        aria-label={`Visit ${p.name} (opens in new tab)`}
                      >
                        Visit live demo
                        <ExternalLink className="ml-1.5 h-3.5 w-3.5" aria-hidden />
                      </a>
                    </Button>
                  ) : (
                    <span className="inline-flex items-center text-xs font-medium text-muted-foreground">
                      Case study coming soon
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
