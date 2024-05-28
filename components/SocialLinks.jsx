import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import fetchData from "@/lib/sanity/fetchData";

const icons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  mail: HiOutlineMail,
};
export default async function SocialLinks({
  showText,
  lg,
  iconStyle,
  containerStyle,
}) {
  const socialLinks = await fetchData("socialLink");

  return (
    <ul className={twMerge("grid grid-flow-col gap-5", containerStyle)}>
      {socialLinks.map((social) => (
        <li key={social._id} className="opacity-80">
          <Link
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            {React.createElement(icons[social.name.toLowerCase()], {
              className: twMerge("w-5 h-5", lg && "w-12 h-12", iconStyle),
            })}
            {showText && <div>{social.text}</div>}
          </Link>
        </li>
      ))}
    </ul>
  );
}
