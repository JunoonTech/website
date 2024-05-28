import Link from "next/link";
import RenderImage from "../RenderImage";
import SocialLinks from "../SocialLinks";
import fetchData from "@/lib/sanity/fetchData";
import fetchLogo from "@/lib/sanity/fetchLogo";
import { twJoin } from "tailwind-merge";
import MenuButton from "./MenuButton";
import Menu from "./Menu";

export default async function Header({ white }) {
  const navbarLinks = await fetchData("navbarLink");
  const fullWhite = await fetchLogo("full-white");

  return (
    <header
      className={twJoin(
        "z-50 fixed top-0 left-0 w-full backdrop-blur-2xl backdrop-brightness-50 text-white shadow-md",
        white ? "white" : "",
      )}
    >
      <div className="hidden items-center justify-center px-8 py-4 md:flex">
        <Link href="/" className="w-40">
          <RenderImage image={fullWhite.image} sizes="20vw" priority />
        </Link>
        <ul className="flex grow items-center justify-center">
          {navbarLinks &&
            navbarLinks.map((navbarLink) => (
              <li key={navbarLink._id} className="navlink font-bold">
                <Link href={navbarLink.link}>{navbarLink.name}</Link>
              </li>
            ))}
        </ul>
        <div>
          <SocialLinks />
        </div>

        {/* second header */}
      </div>

      <div className={`block md:hidden ${white ? "bg-darkest" : ""}`}>
        <div className="flex items-center justify-between px-8 py-6">
          <Link href="/">
            <RenderImage
              image={fullWhite.image}
              sizes="10vw"
              className="w-24"
              priority
            />
          </Link>
          <MenuButton white={white} />
        </div>
        <Menu navbarLinks={navbarLinks} />
      </div>
    </header>
  );
}
