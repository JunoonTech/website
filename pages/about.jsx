import Footer from "@/components/Footer";
import Header from "@/components/Header";
import getContent from "@/lib/strapi";
import getCommonProps from "@/lib/getCommonProps";
import RenderImage from "@/components/RenderImage";
import SocialLinks from "@/components/SocialLinks";
import DevCard from "@/components/DevCard";
import { Navigation, Pagination, Virtual, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Pdf from "@/components/Pdf";

const About = ({
  team,
  reels,
  developers,
  projects,
  departments,
  navbarLinks,
  socialLinks,
  logos,
}) => {
  return (
    <main className="bg-lightest text-dark">
      {/* header */}
      <Header
        logo={logos.fullBlack}
        navbarLinks={navbarLinks}
        socialLinks={socialLinks}
      />
      {/* body */}
      <div className="mx-auto w-11/12 max-w-5xl">
        {/* team */}
        <div className="mb-40 mt-20">
          <h1 className="mb-5 text-center">Meet the Team</h1>
          <div className="rounded-md bg-white p-10 pb-5 text-center">
            <div className="relative mb-2">
              {/* image */}
              <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
                <RenderImage image={team.attributes.backgroundImage.data} />
              </div>
              {/* content */}
              <div className="relative z-10 flex flex-wrap items-center justify-center text-white">
                <div className="w-full p-5 text-3xl font-bold">
                  {team.attributes.name}
                </div>
                <div className="w-full">
                  Co-ordinator Incharge - {team.attributes.coordinator}
                </div>
                <div className="w-full p-5 text-3xl font-bold">Seniors</div>
                {team.attributes.members.data.map((member) => (
                  <div key={member.id} className="mx-5 whitespace-nowrap">
                    {member.attributes.firstName} {member.attributes.lastName} -{" "}
                    {member.attributes.designation}
                  </div>
                ))}
              </div>
            </div>
            <h3 className="mb-2">{team.attributes.descriptionHead}</h3>
            <h4 className="mb-4">{team.attributes.descriptionSubhead}</h4>
            <div className="flex justify-center">
              <SocialLinks socials={socialLinks} />
            </div>
          </div>
        </div>

        {/* reels */}
        {reels?.attributes?.pdf && (
          <div className="mb-20">
            <Pdf doc={reels.attributes.pdf} />
          </div>
        )}
        {/* developers */}
        {developers && developers.length > 0 && (
          <div className="mb-40">
            <h1 className="mb-2 text-center">Developers</h1>
            <Swiper
              modules={[Navigation, Pagination, A11y, Virtual]}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                620: {
                  slidesPerView: 2,
                },
                950: {
                  slidesPerView: 3,
                },
              }}
            >
              {developers.map((developer) => (
                <SwiperSlide key={developer.id}>
                  <DevCard developer={developer} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* projects */}
        <div className="mb-40">
          <h1 className="mb-2 text-center">Our Projects</h1>
          <div className="flex flex-wrap justify-center">
            {projects.map((project) => (
              <div key={project.id} className="w-full p-5 md:w-1/2">
                <h3 className="mb-5 text-center">{project.attributes.name}</h3>
                <div className="text-justify">
                  {project.attributes.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* departments */}
        <div className="mb-40">
          <h1 className="mb-2 text-center">Our departments</h1>
          <div className="flex flex-wrap justify-center">
            {departments.map((department) => (
              <div key={department.id} className="w-full p-5 md:w-1/2">
                <h3 className="mb-5 text-center">
                  {department.attributes.name}
                </h3>
                <div className="text-justify">
                  {department.attributes.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer logo={logos.fullWhite} socialLinks={socialLinks} />
    </main>
  );
};
export default About;

export const getServerSideProps = async () => {
  const { data: team } = await getContent({ name: "team" });
  const { data: reels } = await getContent({ name: "reel" });
  const { data: projects } = await getContent({ name: "projects" });
  const { data: departments } = await getContent({ name: "departments" });
  const { data: developers } = await getContent({ name: "developers" });
  const commonProps = await getCommonProps();
  return {
    props: {
      team,
      reels,
      developers,
      projects,
      departments,
      ...commonProps,
    },
  };
};
