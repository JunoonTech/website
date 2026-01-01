import RenderImage from "@/components/RenderImage";
import fetchLogo from "@/lib/sanity/fetchLogo";
import Link from "next/link";
import React from "react";
import SpotlightCard from "./SpotlightCard";

export default async function CollectionCard({ collection }) {
  const logoOnlyWhite = await fetchLogo("logo-only-white");
  const { name, image, link } = collection;

  return (
    <Link
      href={link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <SpotlightCard className="h-full overflow-hidden border-white/5 bg-darkest p-0 transition-transform duration-500 hover:-translate-y-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
            <RenderImage
              image={image}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              fill
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          <div className="absolute left-4 top-4 w-8 opacity-80 md:w-10">
            <RenderImage
              image={logoOnlyWhite.image}
              sizes="50px"
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6">
            <h2 className="mb-2 text-2xl font-bold text-white group-hover:text-neon-green transition-colors">
              {name}
            </h2>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors">
              <span>View Collection</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
