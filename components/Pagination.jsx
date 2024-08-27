"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Pagination({ totalPages, currentPage, url }) {
  return (
    <div className="mt-8 flex justify-center">
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          key={i}
          href={`/${url}?page=${i + 1}`}
          className={twMerge("mx-2 px-4 py-2 rounded text-white",currentPage === i + 1 ? "bg-neon-green" : "bg-gray-700")}
        >
          {i + 1}
        </Link>
      ))}
    </div>
  );
}
