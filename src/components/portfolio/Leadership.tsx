import { FileText, HeartHandshake, Upload, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Section } from "./Section";
import { Button } from "@/components/ui/button";
import { useOwnerMode } from "@/hooks/use-owner-mode";
import { useAttachment } from "@/hooks/use-attachment";

const groups = [
  {
    title: "Leadership",
    items: [
      { id: "lead-dep-dir", text: "Deputy Director — Hult Prize at Varendra University (2025–2026)" },
      { id: "lead-ev-mgr", text: "Event Manager — Hult Prize at Varendra University (2024–2025)" },
      { id: "lead-bdapps", text: "Event Manager — BDAPPS Varendra University Chapter (2024–2026)" },
      { id: "lead-admin", text: "Administrative Team Member — BDAPPS VU Chapter (2026–2027)" },
    ],
  },
  {
    title: "Clubs & Communities",
    items: [
      { id: "club-excel", text: "Campus Team Member — Excellence Bangladesh" },
      { id: "club-research", text: "General Member — Research Club, Varendra University" },
      { id: "club-robotics", text: "General Member — Robotics Club" },
      { id: "club-cse", text: "General Member — CSE Applied Computing Club" },
    ],
  },
  {
    title: "Volunteering",
    items: [
      { id: "vol-ucics25", text: "Volunteer — UCICS 2025" },
      { id: "vol-ucics26", text: "Volunteer — UCICS 2026" },
    ],
  },
];

type Item = { id: string; text: string };

function LeadershipItem({ item }: { item: Item }) {
  const { isOwner } = useOwnerMode();
  const { attachment, update, remove } = useAttachment(`recognition:${item.id}`);
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
    <li className="flex flex-col gap-2">
      <div className="flex gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
        <span className="text-sm text-muted-foreground">{item.text}</span>
      </div>

      {attachment && (
        <div className="ml-3.5">
          {isImage && (
            <a
              href={attachment.dataUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="block overflow-hidden rounded-lg border border-border max-w-[200px]"
            >
              <img
                src={attachment.dataUrl}
                alt={`${item.text} certificate`}
                className="w-full h-28 object-cover hover:scale-105 transition-transform"
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
        <div className="ml-3.5 flex items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={onPick}
            className="sr-only"
            aria-label={`Upload recognition certificate for ${item.text}`}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg h-7 text-xs"
          >
            <Upload className="h-3 w-3 mr-1" />
            {attachment ? "Replace certificate" : "Add certificate"}
          </Button>
          {attachment && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={remove}
              aria-label="Remove certificate"
              className="h-7 w-7"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      )}
    </li>
  );
}

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
            <ul className="space-y-3">
              {g.items.map((i) => (
                <LeadershipItem key={i.id} item={i} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
