"use client";

import { useUi } from "@/providers/UiProvider";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Menu({ navbarLinks }) {
  const { menuOpen } = useUi();
  return (
    <div
      className={twMerge(
        "overflow-hidden transition-all duration-500 ease-in-out",
        menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
      )}
    >
      <ul className="flex flex-col gap-2 px-6 py-6">
        {navbarLinks &&
          navbarLinks.map((navbarLink) => (
            <li key={navbarLink._id} className="border-b border-white/5 pb-2 last:border-none">
              <Link 
                href={navbarLink.link} 
                className="block text-lg font-bold tracking-wide text-gray-300 hover:text-neon-green hover:pl-2 transition-all duration-300"
              >
                {navbarLink.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
