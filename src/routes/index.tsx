import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Achievements } from "@/components/portfolio/Achievements";
import { Leadership } from "@/components/portfolio/Leadership";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Md. Sohel Parvez — CSE Student, SEO Executive & Student Leader" },
      {
        name: "description",
        content:
          "Portfolio of Md. Sohel Parvez — Computer Science & Engineering student at Varendra University, Junior SEO Executive, NASA Space Apps Global Round selectee, and MillionX Bangladesh finalist.",
      },
      { property: "og:title", content: "Md. Sohel Parvez — Portfolio" },
      {
        property: "og:description",
        content:
          "CSE student, Junior SEO Executive, and student leader from Rajshahi, Bangladesh.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Md. Sohel Parvez",
          jobTitle: "Computer Science & Engineering Student",
          email: "mailto:sohelparvez1911@gmail.com",
          telephone: "+8801797362701",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Rajshahi",
            addressCountry: "Bangladesh",
          },
          alumniOf: { "@type": "CollegeOrUniversity", name: "Varendra University" },
          sameAs: ["https://www.linkedin.com/in/md-sohel-parvez"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Leadership />
        <Contact />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
