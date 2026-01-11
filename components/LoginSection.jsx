"use client";
import { signIn } from "next-auth/react";
import { FiArrowRight } from "react-icons/fi";

export default function LoginSection() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4">
      <div className="relative z-10 pt-32 pb-16 w-full max-w-lg text-center">
        <h1 className="mb-6 text-5xl font-bold uppercase tracking-tight text-white md:text-6xl">
          Join <span className="text-white">Junoon</span>
        </h1>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => signIn("google")}
            className="group relative flex w-full max-w-xs items-center justify-between overflow-hidden rounded-full border border-white/10 bg-white/5 p-1 pr-6 transition-all hover:border-white/20 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon-green text-darkest transition-transform group-hover:scale-95">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Continue with Google
            </span>
            <FiArrowRight className="text-gray-500 transition-transform group-hover:translate-x-1 group-hover:text-neon-green" />
          </button>
        </div>
      </div>
    </div>
  );
}
