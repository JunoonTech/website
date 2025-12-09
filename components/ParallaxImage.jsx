"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RenderImage from "./RenderImage";

export default function ParallaxImage({ image, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, height: "120%", width: "100%" }} className="relative">
        <RenderImage
          image={image}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </div>
  );
}
