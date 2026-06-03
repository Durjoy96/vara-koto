"use client";

import { signInWithGoogle } from "@/lib/supabase/auth";
import { Button } from "./ui/button";

export default function SignInButton() {
  return <Button onClick={signInWithGoogle}>Sign in</Button>;
}
