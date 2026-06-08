import { useEffect, useState, useCallback } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { OWNER_EMAIL } from "@/lib/owner-config";

export function useOwnerMode() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const email = session?.user?.email ?? null;
  const isOwner = !!email && email.toLowerCase() === OWNER_EMAIL.toLowerCase();
  const isSignedIn = !!session;

  const unlock = useCallback(async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      throw result.error instanceof Error
        ? result.error
        : new Error(String(result.error));
    }
    return result;
  }, []);

  const lock = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { isOwner, isSignedIn, email, ready, unlock, lock };
}
