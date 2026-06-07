import { useState } from "react";
import { Lock, LockOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOwnerMode } from "@/hooks/use-owner-mode";

export function OwnerLock() {
  const { isOwner, unlock, lock } = useOwnerMode();
  const [open, setOpen] = useState(false);
  const [passcode, setPasscode] = useState("");

  const handleClick = () => {
    if (isOwner) {
      lock();
      toast.success("Owner mode locked");
    } else {
      setOpen(true);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlock(passcode)) {
      toast.success("Owner mode unlocked");
      setOpen(false);
      setPasscode("");
    } else {
      toast.error("Wrong passcode");
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClick}
        className="rounded-full"
        aria-label={isOwner ? "Lock owner mode" : "Unlock owner mode"}
        title={isOwner ? "Owner mode active — click to lock" : "Owner mode"}
      >
        {isOwner ? (
          <>
            <LockOpen className="h-3.5 w-3.5 mr-1.5" />
            Owner
          </>
        ) : (
          <>
            <Lock className="h-3.5 w-3.5 mr-1.5" />
            Owner
          </>
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Enter owner passcode</DialogTitle>
            <DialogDescription>
              Only the owner can edit images and upload certificates.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <Input
              type="password"
              autoFocus
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Passcode"
            />
            <DialogFooter>
              <Button type="submit">Unlock</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
