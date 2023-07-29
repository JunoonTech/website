import Link from "next/link";
import RenderImage from "./RenderImage";
import SocialLinks from "./SocialLinks";
import { useRef, useState } from "react";
import useOnScreen from "@/hooks/useOnScreen";

const Header = ({ navbarLinks, socialLinks, logo, white }) => {
  const headerRef = useRef();
  const headerOnScreen = useOnScreen(headerRef);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`z-50 relative ${white ? "white" : ""}`} ref={headerRef}>
      <div className="hidden py-4 px-8 md:flex justify-center items-center">
        <Link href="/" className="max-w-xs">
          <RenderImage image={logo.data} sizes="25vw" priority />
        </Link>
        <ul className="flex justify-center items-center flex-grow">
          {navbarLinks &&
            navbarLinks.map((navbarLink) => (
              <li key={navbarLink.id} className="navlink font-bold">
                <Link href={navbarLink.attributes.link}>
                  {navbarLink.attributes.name}
                </Link>
              </li>
            ))}
        </ul>
        <div>
          <SocialLinks socials={socialLinks} />
        </div>

        {/* second header */}
        <div
          className={`secondary fixed w-full top-0 left-0 px-8 ${
            white ? "bg-black bg-opacity-80" : "bg-white"
          }  flex items-center transform ${
            !headerOnScreen ? "" : "-translate-y-full"
          }`}
        >
          <Link href="/">
            <RenderImage
              image={logo.data}
              sizes="10vw"
              className="w-24"
              priority
            />
          </Link>
          <ul className="flex justify-center items-center flex-grow">
            {navbarLinks &&
              navbarLinks.map((navbarLink) => (
                <li key={navbarLink.id} className="py-4 px-4 font-bold">
                  <Link href={navbarLink.attributes.link}>
                    {navbarLink.attributes.name}
                  </Link>
                </li>
              ))}
          </ul>
          <SocialLinks socials={socialLinks} />
        </div>
      </div>

      <div className={`block md:hidden ${white ? "bg-[#161616]" : ""}`}>
        <div className="flex justify-between items-center py-6 px-8">
          <Link href="/">
            <RenderImage
              image={logo.data}
              sizes="10vw"
              className="w-24"
              priority
            />
          </Link>
          <button onClick={() => setMenuOpen((menuOpen) => !menuOpen)}>
            <div className={`w-7 h-5 relative`}>
              <div
                className={`absolute w-full h-1 ${
                  white ? "bg-white" : "bg-black"
                } transform origin-center ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-1 ${
                  white ? "bg-white" : "bg-black"
                } ${menuOpen ? "w-0" : "w-full"}`}
              />
              <div
                className={`absolute w-full h-1 ${
                  white ? "bg-white" : "bg-black"
                } transform origin-center ${
                  menuOpen
                    ? "bottom-1/2 translate-y-1/2 -rotate-45"
                    : "bottom-0"
                }`}
              />
            </div>
          </button>
        </div>
        <div
          className={`overflow-hidden duration-700 ${
            menuOpen ? "max-h-80" : "max-h-0"
          }`}
        >
          <ul className="px-6 pb-2.5">
            {navbarLinks &&
              navbarLinks.map((navbarLink) => (
                <li key={navbarLink.id} className="my-1 font-bold leading-7">
                  <Link href={navbarLink.attributes.link}>
                    {navbarLink.attributes.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
