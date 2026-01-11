import Link from "next/link";
import RenderImage from "../RenderImage";
import SocialLinks from "../SocialLinks";
import fetchData from "@/lib/sanity/fetchData";
import fetchLogo from "@/lib/sanity/fetchLogo";
import MenuButton from "./MenuButton";
import Menu from "./Menu";

export default async function Header() {
  const navbarLinks = await fetchData("navbarLink");
  const fullWhite = await fetchLogo("full-white");

  return (
    <>
      <header className="fixed left-1/2 top-6 z-50 hidden w-[95%] max-w-[75rem] -translate-x-1/2 transform items-center justify-between rounded-full border border-white/10 bg-darkest/80 px-6 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 lg:flex">
        <Link
          href="/"
          className="relative block w-32 transition-transform duration-300 hover:scale-105"
        >
          <RenderImage image={fullWhite.image} sizes="150px" priority />
        </Link>

        <nav>
          <ul className="flex items-center gap-8">
            {navbarLinks &&
              navbarLinks.map((navbarLink) => (
                <li key={navbarLink._id}>
                  <Link
                    href={navbarLink.link}
                    className="relative text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors duration-300 hover:text-white group"
                  >
                    {navbarLink.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-neon-green transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(156,205,126,0.8)]"></span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="border-l border-white/10 pl-6">
          <SocialLinks iconStyle="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
        </div>
      </header>

      <header className="fixed top-0 left-0 z-50 block w-full border-b border-white/5 bg-darkest/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="w-28">
            <RenderImage image={fullWhite.image} sizes="120px" priority />
          </Link>
          <MenuButton white={true} />
        </div>

        <div className="border-t border-white/5 bg-darker/95 backdrop-blur-xl">
          <Menu navbarLinks={navbarLinks} />
        </div>
      </header>
    </>
  );
}
