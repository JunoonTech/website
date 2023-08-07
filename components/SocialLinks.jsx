import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const icons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  mail: HiOutlineMail,
};
const SocialLinks = ({ socials, showText, lg, iconStyle, containerStyle }) => {
  return (
    <ul className={twMerge("grid grid-flow-col gap-5", containerStyle)}>
      {socials.map((social) => (
        <li key={social.id} className="opacity-80">
          <Link
            href={social.attributes.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center"
          >
            {React.createElement(icons[social.attributes.name.toLowerCase()], {
              className: twMerge("w-5 h-5", lg && "w-12 h-12", iconStyle),
            })}
            {showText && <div>{social.attributes.text}</div>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
