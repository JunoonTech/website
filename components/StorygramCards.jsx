import Link from "next/link";
import RenderImage from "./RenderImage";
import dayjs from "dayjs";
import { twJoin } from "tailwind-merge";

const StorygramCards = ({ storygrams, clamp }) => {
  return (
    <div className="flex w-full flex-wrap items-stretch justify-evenly">
      {storygrams.data.map((storygram) => {
        const formattedDate =
          storygram.attributes.date &&
          dayjs(storygram.attributes.date).format("D MMM YYYY");

        return (
          <div key={storygram.id} className="mb-8 w-3/4 md:mb-5 md:w-5/12 ">
            <div className="flex h-full flex-col overflow-hidden rounded-md bg-darkest">
              <Link
                href={storygram.attributes.link}
                className="relative block aspect-video w-full"
              >
                <RenderImage
                  image={storygram.attributes.image.data}
                  sizes="(max-width: 768px) 100vw, 30vw"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <span
                  className={
                    "absolute left-0 top-0 h-full w-full bg-black opacity-0 duration-300 hover:opacity-50"
                  }
                />
              </Link>
              <div className="flex grow flex-col items-center px-5 pb-5 pt-4 md:px-10 md:pt-8">
                <Link
                  href={storygram.attributes.link}
                  className="mb-3 text-lg font-bold leading-8 hover:text-neon-green"
                >
                  {storygram.attributes.head}
                </Link>
                <div
                  className={twJoin(
                    "w-full grow text-center text-[12px] leading-7",
                    clamp && `line-clamp-4`,
                  )}
                >
                  {clamp
                    ? storygram.attributes.text
                    : storygram.attributes.text
                        .split("\n")
                        .map((text, i) => (
                          <p key={`${storygram.id}-text-${i}`}>{text}</p>
                        ))}
                </div>
                {formattedDate && (
                  <div className="border-t border-white/10 pt-5 text-xs font-bold uppercase">
                    {formattedDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StorygramCards;
