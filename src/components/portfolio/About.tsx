import { Section } from "./Section";
import { Brain, Compass, Target, Users } from "lucide-react";
import { useCounter } from "@/hooks/use-counter";

const values = [
  { icon: Brain, title: "Systems Thinking", text: "Deep curiosity for how OS, processes, and computing work at the core." },
  { icon: Users, title: "Leadership", text: "Coordinating teams, driving events, and making decisions under pressure." },
  { icon: Target, title: "Excellence", text: "Consistently pushing for quality, clarity, and meaningful results." },
  { icon: Compass, title: "Initiative", text: "Taking ownership in group settings and guiding peers to shared goals." },
];

function Stat({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) {
  const { value: v, ref } = useCounter(value);
  return (
    <div className="text-center sm:text-left">
      <div className="font-display text-4xl lg:text-5xl font-bold text-gradient">
        <span ref={ref}>{v}</span>
        {suffix}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About Me"
      title="A Computer Science student with a leader's mindset."
      description="I analyze complex technical concepts, design logical solutions, and apply theoretical knowledge to real-world problems - while leading teams and events along the way."
    >
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            I am <span className="text-foreground font-medium">Md. Sohel Parvez</span>, a dedicated
            Computer Science student with a strong academic foundation in operating systems, process
            management, and system-level programming. I enjoy turning complex technical concepts
            into clear, logical solutions.
          </p>
          <p>
            Beyond academics, I take initiative in group settings, guide peers toward shared goals,
            and make sound decisions under pressure. My goal is to build a professional career in
            software or systems development - where technical depth, critical thinking, and
            effective leadership drive meaningful results.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border">
            <Stat value={10} label="Leadership Roles" />
            <Stat value={3} label="Featured Projects" />
            <Stat value={5} label="Certifications" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="h-10 w-10 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
