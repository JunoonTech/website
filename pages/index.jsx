import getContent from "../lib/strapi";
import getCommonProps from "../lib/getCommonProps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import RenderImage from "@/components/RenderImage";
import Link from "next/link";
import AnimateNum from "@/components/AnimateNum";
import { useRef } from "react";
import useOnScreen from "@/hooks/useOnScreen";
import Div100vh from "react-div-100vh";
import StorygramCards from "@/components/StorygramCards";

export default function Home({ homeData, navbarLinks, socialLinks, logos }) {
  const numsRef = useRef();
  const numsOnScreen = useOnScreen(numsRef);
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
          <Header
            navbarLinks={navbarLinks}
            socialLinks={socialLinks}
            logo={logos.fullWhite}
            white
          />
          <div className="absolute left-0 top-0 hidden h-full w-full md:block">
            <Slider images={hero.sliderImages.data}>{renderedHero}</Slider>
          </div>
          <div className="absolute left-0 top-0 h-full w-full md:hidden">
            <Slider images={hero.sliderImagesMobile.data}>
              {renderedHero}
            </Slider>
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
                image={logos.logoOnlyWhite.data}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="px-4 text-xl leading-8 md:w-1/2 md:text-justify">
              {about.text}
            </div>
          </div>
          <div
            className="stats flex w-full flex-wrap justify-center px-4"
            ref={numsRef}
          >
            {about.stats.map((stat) => (
              <div
                key={stat.id}
                className="w-full text-center sm:w-1/2 md:w-1/3"
              >
                <span className="number">
                  <AnimateNum value={numsOnScreen ? stat.number : 0} />
                </span>

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
            {featured.images.map((image) => (
              <div key={image.id} className="relative bg-darkest pb-6 pt-3">
                <RenderImage
                  image={image.file.data}
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute left-0 top-0 h-full w-full opacity-0 duration-1000 hover:opacity-100">
                  {image.instaHandle && (
                    <Link
                      className="absolute bottom-7 right-0 w-44 bg-black/70 p-2 text-center"
                      href={`https://instagram.com/${image.instaHandle}`}
                      target="_blank"
                    >
                      <div>Shot by:</div>
                      <div>{image.instaHandle}</div>
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
      {/* footer */}
      <Footer logo={logos.fullWhite} socialLinks={socialLinks} />
    </main>
  );
}

export const getServerSideProps = async () => {
  const {
    data: { attributes: homeData },
  } = await getContent({ name: "home" });
  const commonProps = await getCommonProps();
  return { props: { homeData, ...commonProps } };
};
