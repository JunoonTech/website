import Slider from "@/components/Slider";
import RenderImage from "@/components/RenderImage";
import Link from "next/link";
import AnimateNum from "@/components/AnimateNum";
import Div100vh from "@/components/Div100vh";
import StorygramCards from "@/components/StorygramCards";
import fetchData from "@/lib/sanity/fetchData";
import fetchLogo from "@/lib/sanity/fetchLogo";
import ParallaxImage from "@/components/ParallaxImage";

export default async function Home() {
  const homeData = await fetchData("home");
  const logoOnlyWhite = await fetchLogo("logo-only-white");
  const { hero, about, featured, story } = homeData;

  const renderedHero = (
    <div className="hero flex flex-col items-center">
      <h1 className="head">{hero.head}</h1>
      <h2 className="subhead">{hero.subhead}</h2>
      <Link
        href={hero.buttonLink}
        target="_blank"
        className="rounded-full bg-white text-sm font-bold text-dark hover:text-neon-green"
      >
        {hero.buttonText}
      </Link>
    </div>
  );
  return (
    <main className="bg-darker text-white">
      <Div100vh>
        <div className="relative h-full">
          <div className="absolute left-0 top-0 hidden size-full md:block">
            <Slider images={hero.sliderImages}>{renderedHero}</Slider>
          </div>
          <div className="absolute left-0 top-0 size-full md:hidden">
            <Slider images={hero.sliderImagesMobile}>{renderedHero}</Slider>
          </div>
        </div>
      </Div100vh>
      <div className="mx-auto w-9/12">
        {/* about */}
        <div className="pb-[3vw] pt-[7vw]">
          <h1 className="mb-[3vw] text-center text-3xl font-bold">
            {about.head}
          </h1>
          <div className="mb-14 flex w-full flex-col items-center md:flex-row">
            <div className="mb-6 pl-4 pr-8 md:mb-0 md:w-1/2">
              <RenderImage
                image={logoOnlyWhite.image}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="px-4 text-xl leading-8 md:w-1/2 md:text-justify">
              {about.text}
            </div>
          </div>
          <div className="stats flex w-full flex-wrap justify-center px-4">
            {about.stats.map((stat) => (
              <div
                key={stat._key}
                className="w-full text-center sm:w-1/2 md:w-1/3"
              >
                {console.log(stat)}
                <AnimateNum value={stat.number} />
                <span className="text-xs md:text-base">{stat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* featured shots */}
        <div className="featured pb-[3vw] pt-[7vw]">
          <h1 className="mb-[3vw] text-center text-3xl font-bold">
            {featured.head}
          </h1>
          <div className="grid w-full gap-8 md:grid-cols-3 md:gap-y-16">
            {featured.map((shot) => (
              <div key={shot._key} className="relative bg-darkest pb-6 pt-3">
                <ParallaxImage
                  image={shot.image}
                  className="aspect-[4/3] w-full"
                />
                <div className="absolute left-0 top-0 size-full opacity-0 duration-1000 hover:opacity-100">
                  {shot.instaHandle && (
                    <Link
                      className="absolute bottom-7 right-0 w-44 bg-black/70 p-2 text-center"
                      href={`https://instagram.com/${shot.instaHandle}`}
                      target="_blank"
                    >
                      <div>Shot by:</div>
                      <div>{shot.instaHandle}</div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* storygram */}

        <div className="story flex flex-col items-center pb-[3vw] pt-[7vw]">
          <h1 className="mb-[3vw] text-3xl font-bold">{story.head}</h1>

          <StorygramCards storygrams={story.storygrams} clamp />

          <Link
            href={story.buttonLink}
            target="_blank"
            className="btn mt-[3.5vw] bg-white text-dark hover:bg-darker hover:text-white"
          >
            {story.buttonText}
          </Link>
        </div>
      </div>
    </main>
  );
}
