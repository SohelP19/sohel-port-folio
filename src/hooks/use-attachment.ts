import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MEDIA_BUCKET } from "@/lib/owner-config";

export type Attachment = {
  dataUrl: string; // signed (or public) URL for display/download
  name: string;
  type: string; // mime
  path: string;
};

const SIGN_TTL = 60 * 60 * 24 * 365; // 1 year

async function signOrPublic(path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .createSignedUrl(path, SIGN_TTL);
  if (!error && data?.signedUrl) return data.signedUrl;
  // Fallback to public URL if bucket is later made public
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

function extToSafe(name: string) {
  const m = /\.([a-zA-Z0-9]+)$/.exec(name);
  return m ? `.${m[1].toLowerCase()}` : "";
}

export function useAttachment(key: string) {
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("site_assets")
      .select("path, name, mime")
      .eq("key", key)
      .maybeSingle();
    if (!mounted.current) return;
    if (!data) {
      setAttachment(null);
      setLoading(false);
      return;
    }
    const url = await signOrPublic(data.path);
    if (!mounted.current) return;
    setAttachment({
      dataUrl: url,
      name: data.name ?? "attachment",
      type: data.mime ?? "application/octet-stream",
      path: data.path,
    });
    setLoading(false);
  }, [key]);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  const update = useCallback(
    async (file: File) => {
      const safeKey = key.replace(/[^a-zA-Z0-9._-]+/g, "_");
      const path = `${safeKey}/${Date.now()}${extToSafe(file.name)}`;
      const { error: upErr } = await supabase.storage
        .from(MEDIA_BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;

      // Delete old object (if any) so we don't accumulate orphans
      const prev = attachment?.path;

      const { error: dbErr } = await supabase
        .from("site_assets")
        .upsert({ key, path, name: file.name, mime: file.type });
      if (dbErr) {
        // best-effort cleanup of newly uploaded file
        await supabase.storage.from(MEDIA_BUCKET).remove([path]);
        throw dbErr;
      }

      if (prev && prev !== path) {
        await supabase.storage.from(MEDIA_BUCKET).remove([prev]);
      }
      await load();
    },
    [key, attachment?.path, load],
  );

  const remove = useCallback(async () => {
    const prev = attachment?.path;
    const { error } = await supabase.from("site_assets").delete().eq("key", key);
    if (error) throw error;
    if (prev) {
      await supabase.storage.from(MEDIA_BUCKET).remove([prev]);
    }
    setAttachment(null);
  }, [key, attachment?.path]);

  return { attachment, loading, update, remove };
}
