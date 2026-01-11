"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-darker text-center text-white">
      <h1 className="text-[10rem] font-bold leading-none text-white/5 md:text-[20rem] select-none">
        403
      </h1>

      <div className="absolute top-1/2 -translate-y-1/2 px-6">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl uppercase tracking-tight">
          Restricted Access
        </h2>
        <p className="mb-8 text-gray-400 max-w-md mx-auto">
          Please sign in with your{" "}
          <span className="text-neon-green font-bold">@nsut.ac.in</span> email
          address to continue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/recruitment" })}
            className="rounded-full bg-neon-green px-8 py-3 text-sm font-bold text-darkest transition-transform hover:scale-105 hover:bg-white"
          >
            Sign in with @nsut.ac.in
          </button>

          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
