import { Section } from "./Section";
import { HeartHandshake } from "lucide-react";

const groups = [
  {
    title: "Leadership",
    items: [
      "Deputy Director — Hult Prize at Varendra University (2025–2026)",
      "Event Manager — Hult Prize at Varendra University (2024–2025)",
      "Event Manager — BDAPPS Varendra University Chapter (2024–2026)",
      "Administrative Team Member — BDAPPS VU Chapter (2026–2027)",
    ],
  },
  {
    title: "Clubs & Communities",
    items: [
      "Campus Team Member — Excellence Bangladesh",
      "General Member — Research Club, Varendra University",
      "General Member — Robotics Club",
      "General Member — CSE Applied Computing Club",
    ],
  },
  {
    title: "Volunteering",
    items: ["Volunteer — UCICS 2025", "Volunteer — UCICS 2026"],
  },
];

export function Leadership() {
  return (
    <Section
      id="leadership"
      eyebrow="Leadership & Campus"
      title="Beyond the classroom"
      description="Active roles across leadership, communities, and volunteer initiatives."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div
            key={g.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-10 w-10 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground">
                <HeartHandshake className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {g.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
