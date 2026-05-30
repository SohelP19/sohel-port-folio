import { Award, Medal, Rocket, Star, Trophy } from "lucide-react";
import { Section } from "./Section";

const items = [
  { icon: Rocket, title: "NASA Space Apps Challenge 2025", desc: "Global Round Selection — Team Talestra" },
  { icon: Trophy, title: "MillionX Bangladesh 2025", desc: "Finalist — Ranked 17th of 60 with HomeSchool" },
  { icon: Medal, title: "Hult Prize Certificates", desc: "Recognized for leadership and program contributions" },
  { icon: Award, title: "UCICS Volunteer Certificates", desc: "UCICS 2025 & UCICS 2026" },
  { icon: Star, title: "UIHP Cohort-5", desc: "Participation & project showcase (AquaSol)" },
];

export function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title="Awards & Recognitions"
      description="Highlights from competitions, programs, and community contributions."
      className="bg-secondary/40"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="h-11 w-11 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground mb-4">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
