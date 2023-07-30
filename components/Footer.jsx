import RenderImage from "./RenderImage";
import SocialLinks from "./SocialLinks";

const Footer = ({ logo, socialLinks }) => {
  return (
    <footer className="footer mt-10 bg-darker py-16 md:px-[8.5vw] md:py-[5vw]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="mb-6 flex items-center justify-center md:col-start-2 md:mb-0">
          <RenderImage image={logo.data} className="max-w-[310px]" />
        </div>
        <div className="flex items-center justify-center text-white md:justify-end">
          <SocialLinks socials={socialLinks} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
