import { Award, FileText, Medal, Rocket, Star, Trophy, Upload, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { useOwnerMode } from "@/hooks/use-owner-mode";
import { useAttachment } from "@/hooks/use-attachment";

const items = [
  { id: "nasa-2025", icon: Rocket, title: "NASA Space Apps Challenge 2025", desc: "Global Round Selection - Team Talestra" },
  { id: "millionx-2025", icon: Trophy, title: "MillionX Bangladesh 2025", desc: "Finalist - Ranked 17th of 60 with HomeSchool" },
  { id: "hult-prize", icon: Medal, title: "Hult Prize Certificates", desc: "Recognized for leadership and program contributions" },
  { id: "ucics-volunteer", icon: Award, title: "UCICS Volunteer Certificates", desc: "UCICS 2025 & UCICS 2026" },
  { id: "uihp-cohort-5", icon: Star, title: "UIHP Cohort-5", desc: "Participation & project showcase (AquaSol)" },
];

type ItemProps = (typeof items)[number];

function AchievementCard({ id, icon: Icon, title, desc }: ItemProps) {
  const { isOwner } = useOwnerMode();
  const { attachment, update, remove } = useAttachment(`achievement:${id}`);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
    const isAllowedType = allowedTypes.includes(file.type);
    if (!isAllowedType) {
      toast.error(`Invalid file type: "${file.type || "unknown"}". Please upload an image (JPG, PNG, WEBP, GIF) or PDF.`);
      e.target.value = "";
      return;
    }

    const maxSize = 4 * 1024 * 1024; // 4 MB
    if (file.size > maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.error(`File is too large (${sizeMB} MB). Maximum allowed size is 4 MB.`);
      e.target.value = "";
      return;
    }

    try {
      await update(file);
      toast.success(`"${file.name}" uploaded successfully.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload the file.");
    }
    e.target.value = "";
  };

  const isImage = attachment?.type.startsWith("image/");
  const isPdf = attachment?.type === "application/pdf";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant flex flex-col">
      <div className="h-11 w-11 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>

      {attachment && (
        <div className="mt-4">
          {isImage && (
            <a
              href={attachment.dataUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="block overflow-hidden rounded-lg border border-border"
            >
              <img
                src={attachment.dataUrl}
                alt={`${title} certificate`}
                className="w-full h-40 object-cover hover:scale-105 transition-transform"
              />
            </a>
          )}
          {isPdf && (
            <a
              href={attachment.dataUrl}
              target="_blank"
              rel="noreferrer noopener"
              download={attachment.name}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:bg-accent transition-colors"
            >
              <FileText className="h-4 w-4 text-primary" />
              <span className="truncate max-w-[180px]">{attachment.name}</span>
            </a>
          )}
        </div>
      )}

      {isOwner && (
        <div className="mt-4 flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={onPick}
            className="sr-only"
            aria-label={`Upload certificate for ${title}`}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg"
          >
            <Upload className="h-3.5 w-3.5 mr-1.5" />
            {attachment ? "Replace" : "Upload certificate"}
          </Button>
          {attachment && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={remove}
              aria-label="Remove attachment"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

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
        {items.map((item) => (
          <AchievementCard key={item.id} {...item} />
        ))}
      </div>
    </Section>
  );
}
