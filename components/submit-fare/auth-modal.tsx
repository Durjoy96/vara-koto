"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/supabase/auth";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueAsGuest: () => void;
}

export function AuthModal({
  open,
  onOpenChange,
  onContinueAsGuest,
}: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border text-card-foreground">
        <DialogHeader className="space-y-3 -mb-2">
          <DialogTitle className="text-xl font-bold">
            ভাড়া যুক্ত করার আগে...
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            Google দিয়ে লগইন করলে যেসব সুবিধা পাবেন
          </DialogDescription>
        </DialogHeader>

        {/* Benefits */}
        <div className="space-y-2">
          {[
            "পরে নিজের data edit করতে পারবেন",
            "নিজের সব contributions একজায়গায় দেখবেন",
            "ভুল হলে delete করতে পারবেন",
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0">
                <span className="text-green-400 text-xs">✓</span>
              </div>
              <span className="text-sm text-card-foreground/80">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            onClick={signInWithGoogle}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold h-11"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google দিয়ে লগইন করুন
          </Button>

          <Button
            variant="ghost"
            onClick={onContinueAsGuest}
            className="w-full text-gray-500 hover:text-gray-300 hover:bg-white/5 h-11 text-sm"
          >
            না থাকুক, এমনিই যুক্ত করি →
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
