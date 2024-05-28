"use client";

import { useUi } from "@/providers/UiProvider";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Menu({ navbarLinks }) {
  const { menuOpen } = useUi();
  return (
    <div
      className={twMerge(
        "overflow-hidden duration-700",
        menuOpen ? "max-h-80" : "max-h-0",
      )}
    >
      <ul className="px-6 pb-2.5">
        {navbarLinks &&
          navbarLinks.map((navbarLink) => (
            <li key={navbarLink._id} className="my-1 font-bold leading-7">
              <Link href={navbarLink.link}>{navbarLink.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
