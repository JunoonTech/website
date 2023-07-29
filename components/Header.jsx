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
    <header className={`relative z-50 ${white ? "white" : ""}`} ref={headerRef}>
      <div className="hidden items-center justify-center px-8 py-4 md:flex">
        <Link href="/" className="max-w-xs">
          <RenderImage image={logo.data} sizes="25vw" priority />
        </Link>
        <ul className="flex grow items-center justify-center">
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
          className={`secondary fixed left-0 top-0 w-full px-8 ${
            white ? "bg-black/80" : "bg-white"
          }  flex items-center ${!headerOnScreen ? "" : "-translate-y-full"}`}
        >
          <Link href="/">
            <RenderImage
              image={logo.data}
              sizes="10vw"
              className="w-24"
              priority
            />
          </Link>
          <ul className="flex grow items-center justify-center">
            {navbarLinks &&
              navbarLinks.map((navbarLink) => (
                <li key={navbarLink.id} className="p-4 font-bold">
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
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/">
            <RenderImage
              image={logo.data}
              sizes="10vw"
              className="w-24"
              priority
            />
          </Link>
          <button onClick={() => setMenuOpen((menuOpen) => !menuOpen)}>
            <div className={`relative h-5 w-7`}>
              <div
                className={`absolute h-1 w-full ${
                  white ? "bg-white" : "bg-black"
                } origin-center ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <div
                className={`absolute left-1/2 top-1/2 h-1 -translate-x-1/2 -translate-y-1/2 ${
                  white ? "bg-white" : "bg-black"
                } ${menuOpen ? "w-0" : "w-full"}`}
              />
              <div
                className={`absolute h-1 w-full ${
                  white ? "bg-white" : "bg-black"
                } origin-center ${
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
