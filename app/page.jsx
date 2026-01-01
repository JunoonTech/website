import Slider from "@/components/Slider";
import RenderImage from "@/components/RenderImage";
import Link from "next/link";
import AnimateNum from "@/components/AnimateNum";
import Div100vh from "@/components/Div100vh";
import StorygramCards from "@/components/StorygramCards";
import fetchData from "@/lib/sanity/fetchData";
import fetchLogo from "@/lib/sanity/fetchLogo";
import SpotlightCard from "@/components/SpotlightCard";
import ParallaxImage from "@/components/ParallaxImage";

export default async function Home() {
  const homeData = await fetchData("home");
  const logoOnlyWhite = await fetchLogo("logo-only-white");
  const { hero, about, featured, story } = homeData;

  const renderedHeroContent = (
    <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-5xl font-bold tracking-tighter text-white drop-shadow-2xl md:text-7xl">
        {hero.head}
      </h1>
      <h2 className="mb-10 text-lg font-medium tracking-wide text-gray-100 drop-shadow-md md:text-2xl">
        {hero.subhead}
      </h2>

      <Link
        href={hero.buttonLink}
        target="_blank"
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-dark transition-all hover:text-neon-green hover:shadow-[0_0_20px_rgba(156,205,126,0.4)]"
      >
        <span>{hero.buttonText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );

  return (
    <main className="relative bg-darker text-white">
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green/5 blur-[150px]" />
      <Div100vh>
        <div className="relative h-full w-full">
          <div className="absolute left-0 top-0 hidden size-full md:block">
            <Slider images={hero.sliderImages}>{renderedHeroContent}</Slider>
          </div>
          <div className="absolute left-0 top-0 size-full md:hidden">
            <Slider images={hero.sliderImagesMobile}>
              {renderedHeroContent}
            </Slider>
          </div>

          <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

          <div className="absolute bottom-0 left-0 z-10 h-32 w-full bg-gradient-to-t from-darker to-transparent pointer-events-none" />
        </div>
      </Div100vh>

      <div className="relative z-10 mx-auto w-11/12 max-w-6xl pb-24">
        <section className="py-24">
          <SpotlightCard
            className="overflow-hidden border-white/5 bg-darkest/80 p-8 shadow-2xl backdrop-blur-sm md:p-16"
            spotlightColor="rgba(156, 205, 126, 0)"
          >
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="relative mb-6 w-full md:mb-0 md:w-1/3">
                <div className="absolute inset-0 rounded-full bg-neon-green/20 blur-3xl"></div>
                <div className="relative drop-shadow-2xl">
                  <RenderImage
                    image={logoOnlyWhite.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="w-full text-center md:w-2/3 md:text-left">
                <h2 className="mb-6 text-3xl font-bold text-white">
                  {about.head}
                </h2>
                <div className="mb-10 text-lg leading-relaxed text-gray-400">
                  {about.text}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {about.stats.map((stat) => (
                    <div
                      key={stat._key}
                      className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-transform hover:scale-105"
                    >
                      <div className="mb-2 text-4xl font-bold text-neon-green">
                        <AnimateNum value={stat.number} />+
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        {stat.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        </section>

        <section className="mb-32">
          <div className="mb-16 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Featured Shots
            </h2>
            <div className="hidden h-px w-32 bg-gradient-to-r from-neon-green to-transparent md:block"></div>
          </div>

          <div className="grid w-full gap-8 md:grid-cols-3">
            {featured.map((shot) => (
              <div key={shot._key} className="relative group">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-darkest shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="relative aspect-[4/5] w-full">
                    <ParallaxImage
                      image={shot.image}
                      className="h-full w-full"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {shot.instaHandle && (
                      <Link
                        className="absolute bottom-0 left-0 w-full translate-y-full p-4 text-center transition-transform duration-300 group-hover:translate-y-0"
                        href={`https://instagram.com/${shot.instaHandle.slice(1)}`}
                        target="_blank"
                      >
                        <div className="inline-block rounded-full border border-white/20 bg-black/60 px-6 py-2 text-sm font-bold backdrop-blur-md transition-colors hover:border-neon-green hover:bg-neon-green hover:text-dark">
                          {shot.instaHandle}
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-12 pt-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">
              {story.head}
            </h2>
            <div className="mx-auto h-1 w-24 bg-neon-green"></div>
          </div>

          <StorygramCards storygrams={story.storygrams} clamp />

          <div className="mt-16 flex justify-center">
            <Link
              href={story.buttonLink}
              target="_blank"
              className="btn border-white bg-transparent px-10 py-4 text-white hover:border-neon-green hover:bg-neon-green hover:text-dark transition-all"
            >
              {story.buttonText}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
