import { useEffect, useState, useCallback } from "react";

const PREFIX = "portfolio:attachment:";

export type Attachment = {
  dataUrl: string;
  name: string;
  type: string; // mime
};

export function useAttachment(id: string) {
  const key = PREFIX + id;
  const [attachment, setAttachment] = useState<Attachment | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setAttachment(JSON.parse(raw));
    } catch {}
  }, [key]);

  const update = useCallback(
    (file: File) =>
      new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const data: Attachment = {
            dataUrl: String(reader.result),
            name: file.name,
            type: file.type,
          };
          try {
            localStorage.setItem(key, JSON.stringify(data));
          } catch (e) {
            reject(e);
            return;
          }
          setAttachment(data);
          resolve();
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      }),
    [key],
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {}
    setAttachment(null);
  }, [key]);

  return { attachment, update, remove };
}
