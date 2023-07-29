import getContent from "../lib/strapi";
import getCommonProps from "../lib/getCommonProps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Slider from "@/components/Slider";
import RenderImage from "@/components/RenderImage";
import Link from "next/link";
import dayjs from "dayjs";
import AnimateNum from "@/components/AnimateNum";
import { useRef } from "react";
import useOnScreen from "@/hooks/useOnScreen";
import Div100vh from "react-div-100vh";

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
        className="font-bold text-sm bg-white text-[#303030] rounded-full hover:text-neon-green"
      >
        {hero.buttonText}
      </Link>
    </div>
  );
  return (
    <main className="bg-dark text-white">
      <Div100vh>
        <div className="h-full relative">
          <Header
            navbarLinks={navbarLinks}
            socialLinks={socialLinks}
            logo={logos.fullWhite}
            white
          />
          <div className="hidden md:block absolute top-0 left-0 w-full h-full">
            <Slider images={hero.sliderImages.data}>{renderedHero}</Slider>
          </div>
          <div className="md:hidden absolute top-0 left-0 w-full h-full">
            <Slider images={hero.sliderImagesMobile.data}>
              {renderedHero}
            </Slider>
          </div>
        </div>
      </Div100vh>
      <div className="w-9/12 mx-auto">
        {/* about */}
        <div className="pt-[7vw] pb-[3vw]">
          <h1 className="text-3xl text-center font-bold mb-[3vw]">
            {about.head}
          </h1>
          <div className="w-full flex flex-col md:flex-row items-center mb-14">
            <div className="md:w-1/2 mb-6 md:mb-0 pr-8 pl-4">
              <RenderImage
                image={logos.logoOnlyWhite.data}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="md:w-1/2 text-xl leading-8 px-4 md:text-justify">
              {about.text}
            </div>
          </div>
          <div
            className="stats w-full flex flex-wrap justify-center px-4"
            ref={numsRef}
          >
            {about.stats.map((stat) => (
              <div
                key={stat.id}
                className="w-full sm:w-1/2 md:w-1/3 text-center"
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
        <div className="featured pt-[7vw] pb-[3vw]">
          <h1 className="text-3xl text-center font-bold mb-[3vw]">
            {featured.head}
          </h1>
          <div className="w-full grid md:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-16">
            {featured.images.map((image) => (
              <div key={image.id} className="pt-3 pb-6 bg-darker relative">
                <RenderImage
                  image={image.file.data}
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 duration-1000">
                  {image.instaHandle && (
                    <Link
                      className="absolute bottom-7 right-0 w-44 p-2 text-center bg-opacity-70 bg-black"
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

        <div className="story pt-[7vw] pb-[3vw] flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-[3vw]">{story.head}</h1>
          <div className="w-full flex flex-wrap justify-center">
            {story.storygrams.data.map((storygram) => (
              <div
                key={storygram.id}
                className="w-3/4 md:w-1/3 mb-8 md:mb-0 md:mx-4 bg-darker rounded-md overflow-hidden flex flex-col"
              >
                <Link
                  href={storygram.attributes.link}
                  className="w-full block relative aspect-video"
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
                      "absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-50 duration-300"
                    }
                  />
                </Link>
                <div className="px-5 md:px-10 pt-4 md:pt-8 pb-5 flex flex-col items-center flex-grow">
                  <Link
                    href={storygram.attributes.link}
                    className="text-lg leading-8 font-bold mb-3 hover:text-neon-green"
                  >
                    {storygram.attributes.head}
                  </Link>
                  <div className="flex-grow w-full text-center text-[12px] leading-7 border-b border-white border-opacity-10 line-clamp-4">
                    {storygram.attributes.text}
                  </div>
                  <div className="mt-5 font-bold text-xs uppercase">
                    {dayjs(storygram.attributes.date).format("D MMM YYYY")}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href={story.buttonLink}
            target="_blank"
            className="block mt-[3.5vw] font-bold text-sm border border-white bg-white text-[#303030] rounded-full hover:text-white hover:bg-dark"
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
