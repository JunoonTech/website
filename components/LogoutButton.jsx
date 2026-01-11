"use client";
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/recruitment" })}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all"
    >
      <FiLogOut className="text-sm" />
      Sign Out
    </button>
  );
}
