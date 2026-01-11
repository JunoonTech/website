"use client";
import { signIn } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-lg bg-neon-green px-8 py-4 font-bold uppercase tracking-widest text-darkest transition-all hover:bg-white"
    >
      Sign in with Google
    </button>
  );
}
