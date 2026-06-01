import { Code2, Cpu, Database, Layers, Megaphone, Palette, Presentation, Users } from "lucide-react";
import { Section } from "./Section";

const technical = [
  { icon: Cpu, name: "Operating Systems", level: 88 },
  { icon: Code2, name: "C Programming", level: 90 },
  { icon: Code2, name: "C++", level: 82 },
  { icon: Layers, name: "Data Structures & Algorithms", level: 80 },
  { icon: Megaphone, name: "Search Engine Optimization", level: 85 },
  { icon: Palette, name: "UI/UX Design", level: 75 },
];

const professional = [
  { icon: Users, name: "Leadership" },
  { icon: Presentation, name: "Public Speaking" },
  { icon: Layers, name: "Project Management" },
  { icon: Users, name: "Team Coordination" },
  { icon: Megaphone, name: "Event Management" },
  { icon: Database, name: "Research" },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical depth, professional range."
      description="A balanced toolkit across software engineering fundamentals and leadership essentials."
    >
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h3 className="font-display text-lg font-semibold mb-5">Technical</h3>
          <div className="space-y-4">
            {technical.map(({ icon: Icon, name, level }) => (
              <div key={name} className="group rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-sm">{name}</span>
                  </div>
                  <span className="text-xs font-semibold text-primary tabular-nums">{level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-gradient transition-all duration-700"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold mb-5">Professional</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {professional.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="rounded-xl border border-border bg-card p-4 shadow-card flex items-center gap-3 transition-all hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <span className="h-10 w-10 rounded-lg bg-primary-gradient flex items-center justify-center text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-medium text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
