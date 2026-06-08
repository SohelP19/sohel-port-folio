import { useEffect, useState, useCallback, useRef } from "react";
import defaultProfile from "@/assets/profile.jpg";
import { supabase } from "@/integrations/supabase/client";
import { MEDIA_BUCKET } from "@/lib/owner-config";

const KEY = "profile-image";
const SIGN_TTL = 60 * 60 * 24 * 365; // 1 year

export function useProfileImage() {
  const [src, setSrc] = useState<string>(defaultProfile);
  const [path, setPath] = useState<string | null>(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("site_assets")
      .select("path")
      .eq("key", KEY)
      .maybeSingle();
    if (!mounted.current) return;
    if (!data?.path) {
      setSrc(defaultProfile);
      setPath(null);
      return;
    }
    setPath(data.path);
    const { data: signed } = await supabase.storage
      .from(MEDIA_BUCKET)
      .createSignedUrl(data.path, SIGN_TTL);
    if (!mounted.current) return;
    if (signed?.signedUrl) setSrc(signed.signedUrl);
    else setSrc(supabase.storage.from(MEDIA_BUCKET).getPublicUrl(data.path).data.publicUrl);
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  const update = useCallback(
    async (file: File) => {
      const ext = (/\.([a-zA-Z0-9]+)$/.exec(file.name)?.[1] ?? "jpg").toLowerCase();
      const newPath = `${KEY}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(newPath, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;

      const prev = path;
      const { error: dbErr } = await supabase
        .from("site_assets")
        .upsert({ key: KEY, path: newPath, name: file.name, mime: file.type });
      if (dbErr) {
        await supabase.storage.from(MEDIA_BUCKET).remove([newPath]);
        throw dbErr;
      }
      if (prev && prev !== newPath) {
        await supabase.storage.from(MEDIA_BUCKET).remove([prev]);
      }
      await load();
    },
    [path, load],
  );

  const reset = useCallback(async () => {
    const prev = path;
    const { error } = await supabase.from("site_assets").delete().eq("key", KEY);
    if (error) throw error;
    if (prev) await supabase.storage.from(MEDIA_BUCKET).remove([prev]);
    setPath(null);
    setSrc(defaultProfile);
  }, [path]);

  return { src, update, reset };
}
