import Link from "next/link";
import RenderImage from "./RenderImage";
import dayjs from "dayjs";
import { twJoin } from "tailwind-merge";
import SpotlightCard from "./SpotlightCard";

export default function StorygramCards({ storygrams, clamp }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
      {storygrams.map((storygram) => {
        const formattedDate =
          storygram.date && dayjs(storygram.date).format("D MMM YYYY");
        const isTextShort = storygram.text.length < 500;

        return (
          <div key={storygram._id} className="h-full">
            <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-darkest transition-all duration-300 hover:-translate-y-1">
              <Link
                href={storygram.link || "#"}
                className="relative block aspect-video w-full overflow-hidden"
              >
                <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
                  <RenderImage
                    image={storygram.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-darkest via-transparent to-transparent opacity-60" />
              </Link>

              <div className="flex grow flex-col px-6 pb-8 pt-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <Link
                    href={storygram.link || "#"}
                    className="text-2xl font-bold leading-tight text-white transition-colors group-hover:text-neon-green"
                  >
                    {storygram.head}
                  </Link>

                  <div className="mt-1 flex h-8 w-8 shrink-0 -translate-x-2 items-center justify-center rounded-full border border-white/10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-neon-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  className={twJoin(
                    "mb-6 grow text-sm leading-relaxed text-gray-400",
                    clamp && `line-clamp-4`,
                  )}
                >
                  {clamp
                    ? storygram.text
                    : storygram.text
                        .slice(0, 500)
                        .split("\n")
                        .map((text, i, arr) => (
                          <p
                            key={`${storygram._id}-text-${i}`}
                            className="mb-2"
                          >
                            {text}
                            {i === arr.length - 1 && !isTextShort && (
                              <span>...</span>
                            )}
                          </p>
                        ))}
                </div>

                {formattedDate && (
                  <div className="mt-auto flex items-center gap-3 border-t border-white/5 pt-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    <div className="h-1 w-1 rounded-full bg-neon-green"></div>
                    {formattedDate}
                  </div>
                )}
              </div>
            </SpotlightCard>
          </div>
        );
      })}
    </div>
  );
}
