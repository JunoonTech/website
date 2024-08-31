import RenderImage from "@/components/RenderImage";
import SocialLinks from "@/components/SocialLinks";
import DevCard from "@/components/DevCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Pdf from "@/components/Pdf";
import fetchData from "@/lib/sanity/fetchData";
import fetchTeam from "@/lib/sanity/fetchTeam";
import Carousel from "@/components/ui/Carousel";

export default async function About() {
  const team = await fetchTeam();
  await fetchData("team");
  const reels = await fetchData("reel");
  const developers = await fetchData("developer");
  const projects = await fetchData("project");
  const departments = await fetchData("department");

  return (
    <main className="mx-auto w-11/12 max-w-5xl">
      {/* team */}
      <div className="mb-40 mt-24">
        <h1 className="mb-5 text-center">Meet the Team</h1>
        <div className="rounded-md bg-dark p-10 pb-5 text-center">
          <div className="relative mb-2">
            {/* image */}
            <div className="absolute left-0 top-0 size-full overflow-hidden">
              <RenderImage image={team.backgroundImage} />
            </div>
            {/* content */}
            <div className="relative z-10 flex flex-wrap items-center justify-center py-6 text-white">
              <div className="mb-5 w-full text-3xl font-bold">{team.name}</div>
              <div className="w-full">
                Co-ordinator Incharge - {team.coordinator}
              </div>
              <div className="w-full p-5 text-3xl font-bold">Seniors</div>
              {team.members.map((member) => (
                <div key={member._id} className="mx-5 whitespace-nowrap">
                  {member.firstName} {member.lastName} - {member.designation}
                </div>
              ))}
            </div>
          </div>
          <h3 className="mb-2">{team.descriptionHead}</h3>
          <h4 className="mb-4">{team.descriptionSubhead}</h4>
          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* reels */}
      {reels.pdf && (
        <div className="mb-20">
          <Pdf doc={reels.pdf.asset} />
        </div>
      )}
      {/* developers */}
      {developers && developers.length > 0 && (
        <div className="mb-40">
          <h1 className="mb-10 text-center">Developers</h1>
          <Carousel>
            {developers.map((developer) => (
              <DevCard key={developer._id} developer={developer} />
            ))}
          </Carousel>
        </div>
      )}

      {/* projects */}
      <div className="mb-40">
        <h1 className="mb-2 text-center">Our Projects</h1>
        <div className="flex flex-wrap justify-center">
          {projects.map((project) => (
            <div key={project._id} className="w-full p-5 md:w-1/2">
              <h3 className="mb-5 text-center">{project.name}</h3>
              <div className="text-justify">{project.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* departments */}
      <div className="mb-40">
        <h1 className="mb-2 text-center">Our departments</h1>
        <div className="flex flex-wrap justify-center">
          {departments.map((department) => (
            <div key={department._id} className="w-full p-5 md:w-1/2">
              <h3 className="mb-5 text-center">{department.name}</h3>
              <div className="text-justify">{department.description}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
