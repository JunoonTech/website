"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight, FaFacebookF, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  mail: HiOutlineMail,
};

export default function ContactMenu({ links }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col border-t border-white/10 w-full">
      {links.map((link, i) => {
        const IconComponent = iconMap[link.name.toLowerCase()];

        return (
          <Link
            key={link._id}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-between border-b border-white/10 py-6 pr-4 transition-all duration-300 hover:bg-white/5 hover:pl-4 md:py-10"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
              <span className="text-xs font-mono text-gray-600 transition-colors group-hover:text-neon-green shrink-0">
                0{i + 1}
              </span>

              {IconComponent && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-gray-400 transition-all duration-300 group-hover:border-neon-green group-hover:bg-neon-green group-hover:text-black md:h-12 md:w-12">
                  <IconComponent />
                </span>
              )}

              <h3 className="text-2xl font-bold uppercase tracking-tighter text-gray-300 transition-all duration-300 group-hover:text-white md:text-5xl truncate">
                {link.name}
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10, rotate: -45 }}
              animate={{
                opacity: hovered === i ? 1 : 0,
                x: hovered === i ? 0 : -10,
                rotate: hovered === i ? 0 : -45,
              }}
              transition={{ duration: 0.3 }}
              className="hidden md:block text-3xl text-neon-green shrink-0"
            >
              <FaArrowRight />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
