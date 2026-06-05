import { Briefcase } from "lucide-react";
import { Section } from "./Section";

const items = [
  {
    role: "Junior SEO Executive",
    org: "DigiBit LLC",
    period: "Aug 2024 – Present",
    points: [
      "Search engine optimization and on-page strategy",
      "Website performance analysis and audits",
      "Keyword research and content opportunity mapping",
      "Continuous performance improvement strategies",
    ],
  },
  {
    role: "Deputy Director",
    org: "Hult Prize at Varendra University",
    period: "2025 – 2026",
    points: ["Strategic planning, operations, and team mentorship across program tracks."],
  },
  {
    role: "Administrative Team Member",
    org: "BDAPPS Varendra University Chapter",
    period: "2026 – 2027",
    points: ["Coordinating chapter operations, partnerships, and outreach."],
  },
  {
    role: "Event Manager",
    org: "Hult Prize at Varendra University",
    period: "2024 – 2025",
    points: ["Led end-to-end event execution, logistics, and participant experience."],
  },
  {
    role: "Event Manager",
    org: "BDAPPS Varendra University Chapter",
    period: "2024 – 2026",
    points: ["Designed and delivered tech-focused campus events and workshops."],
  },
  {
    role: "Campus Team Member",
    org: "Excellence Bangladesh",
    period: "Ongoing",
    points: ["Driving student excellence initiatives on campus."],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Professional & Leadership Journey"
      description="Roles where I've combined execution discipline with people leadership."
      className="bg-secondary/40"
    >
      <ol className="relative border-s border-border ms-3 space-y-8">
        {items.map((item) => (
          <li key={item.role + item.org} className="ms-8">
            <span className="absolute -start-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary-gradient text-primary-foreground shadow-elegant">
              <Briefcase className="h-4 w-4" />
            </span>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold">{item.role}</h3>
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc ps-5">
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
