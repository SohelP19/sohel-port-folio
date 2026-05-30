import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-muted-foreground text-base lg:text-lg leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
