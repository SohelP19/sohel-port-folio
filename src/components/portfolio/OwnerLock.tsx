import { useState } from "react";
import { Lock, LockOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useOwnerMode } from "@/hooks/use-owner-mode";
import { OWNER_EMAIL } from "@/lib/owner-config";

export function OwnerLock() {
  const { isOwner, isSignedIn, email, unlock, lock } = useOwnerMode();
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (isOwner || isSignedIn) {
        await lock();
        toast.success("Signed out");
      } else {
        await unlock();
        // page may redirect to Google; nothing else to do here
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  // Signed in but not the owner email — show a "not authorized" hint
  const wrongAccount = isSignedIn && !isOwner;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={busy}
      className="rounded-full"
      aria-label={isOwner ? "Sign out of owner mode" : "Sign in as owner"}
      title={
        isOwner
          ? `Owner mode (${email}) — click to sign out`
          : wrongAccount
            ? `Signed in as ${email}. Owner is ${OWNER_EMAIL}. Click to sign out.`
            : "Sign in with Google as the site owner"
      }
    >
      {isOwner ? (
        <>
          <LockOpen className="h-3.5 w-3.5 mr-1.5" />
          Owner
        </>
      ) : (
        <>
          <Lock className="h-3.5 w-3.5 mr-1.5" />
          {wrongAccount ? "Sign out" : "Owner"}
        </>
      )}
    </Button>
  );
}
