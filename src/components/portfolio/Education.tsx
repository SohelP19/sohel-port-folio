import { GraduationCap } from "lucide-react";
import { Section } from "./Section";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Academic Journey"
      description="Foundational training in computer science, systems, and algorithmic thinking."
      className="bg-secondary/40"
    >
      <ol className="relative border-s border-border ms-3 space-y-10">
        <li className="ms-8">
          <span className="absolute -start-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary-gradient text-primary-foreground shadow-elegant">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">B.Sc. in Computer Science & Engineering</h3>
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Expected 2027
              </span>
            </div>
            <p className="mt-2 text-muted-foreground">Varendra University — Department of CSE</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Focus areas include Operating Systems, Process Management, Data Structures & Algorithms,
              and systems-level programming with C and C++.
            </p>
          </div>
        </li>
      </ol>
    </Section>
  );
}
