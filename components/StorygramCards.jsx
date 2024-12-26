import Link from "next/link";
import RenderImage from "./RenderImage";
import dayjs from "dayjs";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function StorygramCards({ storygrams, clamp }) {
  return (
    <div className="flex w-full flex-wrap items-stretch justify-evenly">
      {storygrams.map((storygram) => {
        const formattedDate =
          storygram.date && dayjs(storygram.date).format("D MMM YYYY");
        const isTextShort = storygram.text.length < 500;

        return (
          <div key={storygram._id} className="mb-8 w-3/4 md:mb-5 md:w-5/12">
            <Card className="flex h-full flex-col">
              <CardHeader className="relative">
                <Link
                  href={storygram.link || "#"}
                  className="block aspect-video w-full"
                >
                  <RenderImage
                    image={storygram.image}
                    sizes="(max-width: 768px) 100vw, 30vw"
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <span className="absolute left-0 top-0 size-full bg-black opacity-0 duration-300 hover:opacity-50" />
                </Link>
              </CardHeader>
              <CardContent className="flex grow flex-col items-center px-5 pb-5 pt-4 md:px-10 md:pt-8">
                <Link
                  href={storygram.link || "#"}
                  className="mb-3 text-lg font-bold leading-8 hover:text-neon-green"
                >
                  {storygram.head}
                </Link>
                <div
                  className={`w-full grow text-center text-[12px] leading-7 ${clamp ? "line-clamp-4" : ""}`}
                >
                  {clamp
                    ? storygram.text
                    : storygram.text
                        .slice(0, 500)
                        .split("\n")
                        .map((text, i, arr) => (
                          <p key={`${storygram._id}-text-${i}`}>
                            {text}
                            {i === arr.length - 1 && !isTextShort && (
                              <span>...</span>
                            )}
                          </p>
                        ))}
                </div>
              </CardContent>
              {formattedDate && (
                <CardFooter className="border-t border-white/10 pt-5 text-center text-xs font-bold uppercase">
                  {formattedDate}
                </CardFooter>
              )}
            </Card>
          </div>
        );
      })}
    </div>
  );
}
