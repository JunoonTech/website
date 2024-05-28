import RenderImage from "./RenderImage";
import SocialLinks from "./SocialLinks";
import fetchLogo from "@/lib/sanity/fetchLogo";

export default async function Footer() {
  const fullWhite = await fetchLogo("full-white");

  return (
    <footer className="footer bg-darkest py-16 md:px-[8.5vw] md:py-[5vw]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="mb-6 flex items-center justify-center md:col-start-2 md:mb-0">
          <RenderImage image={fullWhite.image} className="max-w-[310px]" />
        </div>
        <div className="flex items-center justify-center text-white md:justify-end">
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
