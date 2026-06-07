import { useEffect, useState, useCallback } from "react";
import { OWNER_PASSCODE } from "@/lib/owner-config";

const KEY = "portfolio:owner-mode";

export function useOwnerMode() {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setIsOwner(true);
    } catch {}
  }, []);

  const unlock = useCallback((passcode: string) => {
    if (passcode === OWNER_PASSCODE) {
      try {
        localStorage.setItem(KEY, "1");
      } catch {}
      setIsOwner(true);
      return true;
    }
    return false;
  }, []);

  const lock = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setIsOwner(false);
  }, []);

  return { isOwner, unlock, lock };
}
