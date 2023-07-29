import RenderImage from "./RenderImage";
import SocialLinks from "./SocialLinks";

const Footer = ({ logo, socialLinks }) => {
  return (
    <footer className="footer mt-[7vw] py-16 md:py-[5vw] md:px-[8.5vw] bg-darker">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-start-2 flex items-center justify-center mb-6 md:mb-0">
          <RenderImage image={logo.data} className="max-w-[310px]" />
        </div>
        <div className="flex justify-center md:justify-end items-center">
          <SocialLinks socials={socialLinks} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
