import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import cvAsset from "@/assets/cv.pdf.asset.json";


const links = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = ["home", ...links.map((l) => l.id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border" : "bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
          <span className="text-gradient">Sohel</span>
          <span className="text-foreground">.</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-2">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => handleNav(e, l.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary transition-all duration-300",
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex rounded-lg border border-border hover:bg-accent">
            <a
              href={cvAsset.url}
              download="Md_Sohel_Parvez_CV.pdf"
              aria-label="Download CV / Resume (PDF)"
              rel="noopener noreferrer"
            >
              <FileDown className="mr-1.5 h-4 w-4" aria-hidden />
              CV
            </a>
          </Button>
          <Button asChild className="hidden md:inline-flex bg-primary-gradient text-primary-foreground shadow-elegant hover:opacity-90">
            <a href="#contact" onClick={(e) => handleNav(e, "contact")}>Hire Me</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden glass border-t border-border animate-fade-in">
          <ul className="px-6 py-4 space-y-1">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => handleNav(e, l.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block py-3 px-3 rounded-md text-sm font-medium min-h-11 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          <div className="px-6 py-4 border-t border-border flex flex-col gap-2">
            <Button asChild variant="outline" size="sm" className="w-full rounded-lg justify-center">
              <a
                href={cvAsset.url}
                download="Md_Sohel_Parvez_CV.pdf"
                aria-label="Download CV / Resume (PDF)"
                rel="noopener noreferrer"
              >
                <FileDown className="mr-1.5 h-4 w-4" aria-hidden />
                Download CV
              </a>
            </Button>
            <Button asChild className="w-full bg-primary-gradient text-primary-foreground shadow-elegant hover:opacity-90">
              <a href="#contact" onClick={(e) => handleNav(e, "contact")}>Hire Me</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
