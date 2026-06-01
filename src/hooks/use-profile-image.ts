import { useEffect, useState } from "react";
import defaultProfile from "@/assets/profile.jpg";

const KEY = "portfolio:profile-image";

export function useProfileImage() {
  const [src, setSrc] = useState<string>(defaultProfile);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setSrc(stored);
    } catch {}
  }, []);

  const update = (file: File) =>
    new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result);
        try {
          localStorage.setItem(KEY, dataUrl);
        } catch {}
        setSrc(dataUrl);
        resolve();
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const reset = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setSrc(defaultProfile);
  };

  return { src, update, reset };
}
