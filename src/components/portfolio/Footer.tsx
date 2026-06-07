import { Linkedin, Mail, Phone } from "lucide-react";
import { OwnerLock } from "./OwnerLock";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Md. Sohel Parvez. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/in/md-sohel-parvez" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="mailto:sohelparvez1911@gmail.com" aria-label="Email" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
          </a>
          <a href="tel:+8801797362701" aria-label="Phone" className="text-muted-foreground hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
          </a>
          <OwnerLock />
        </div>
      </div>
    </footer>
  );
}

