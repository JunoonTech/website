import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Link from "next/link";
const icons = { facebook: <FaFacebookF />, instagram: <FaInstagram /> };

const SocialLinks = ({ socials }) => {
  return (
    <ul className="flex">
      {socials.map((social) => (
        <li key={social.id} className="ml-5 opacity-80 text-lg">
          <Link
            href={social.attributes.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icons[social.attributes.name.toLowerCase()]}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
