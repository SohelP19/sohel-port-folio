import { ExternalLink, Trophy, Rocket, Waves } from "lucide-react";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";

const projects = [
  {
    icon: Rocket,
    name: "HomeSchool",
    tagline: "Online education platform",
    desc: "An online education platform built to improve access to learning resources and digital education for students.",
    achievement: "Selected for the Final Round of MillionX Bangladesh — Ranked 17th among 60 finalists.",
    href: "https://homeschool.moonx.dev",
    tags: ["EdTech", "Web Platform", "Finalist"],
  },
  {
    icon: Waves,
    name: "Team Talestra — Space Weather Explorer",
    tagline: "NASA Space Apps 2025",
    desc: "A platform explaining how solar activity impacts Earth, satellites, communication systems, and the space environment.",
    achievement: "Advanced to the Global Round of NASA Space Apps Challenge 2025.",
    href: null,
    tags: ["Space", "Visualization", "Global Round"],
  },
  {
    icon: Trophy,
    name: "AquaSol",
    tagline: "UIHP Cohort-5 Project",
    desc: "An innovative project developed and presented during UIHP Cohort-5, exploring sustainable problem-solving.",
    achievement: "Showcased at UIHP Cohort-5.",
    href: null,
    tags: ["Innovation", "Sustainability"],
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Featured Work"
      description="Selected projects that blend technical execution with real-world impact."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(({ icon: Icon, ...p }) => (
          <article
            key={p.name}
            className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="h-12 w-12 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground mb-5">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold">{p.name}</h3>
            <p className="text-xs font-medium text-primary mt-0.5">{p.tagline}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            <p className="mt-3 text-sm font-medium text-foreground/90">{p.achievement}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            {p.href && (
              <div className="mt-6 pt-4 border-t border-border">
                <Button asChild variant="ghost" size="sm" className="px-0 hover:bg-transparent">
                  <a href={p.href} target="_blank" rel="noreferrer noopener" className="text-primary">
                    Visit live demo <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
