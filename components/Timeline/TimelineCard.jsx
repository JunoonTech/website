"use client";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import RenderImage from "@/components/RenderImage";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

const TimelineCard = forwardRef(({ timelineEvent, even }, ref) => {
  const [markerActive, setMarkerActive] = useState(false);
  const internalRef = useRef(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") ref(internalRef.current);
      else ref.current = internalRef.current;
    }
  }, [ref]);

  const checkMarkerPosition = useCallback(() => {
    if (internalRef.current) {
      const rect = internalRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight / 2 + 100;
      setMarkerActive(isVisible);
    }
  }, []);

  useEffect(() => {
    checkMarkerPosition();
    document.addEventListener("scroll", checkMarkerPosition);
    return () => document.removeEventListener("scroll", checkMarkerPosition);
  }, [checkMarkerPosition]);

  return (
    <div
      ref={internalRef}
      className={`relative mb-24 flex w-full flex-col md:flex-row ${
        even ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="hidden flex-1 md:block">
        <div
          className={`py-10 ${even ? "text-right pr-12" : "text-left pl-12"}`}
        >
          <h3
            className={`text-4xl font-bold tracking-tighter transition-colors duration-500 ${markerActive ? "text-white" : "text-white/20"}`}
          >
            {dayjs(timelineEvent.date).year()}
          </h3>
          <p className="text-sm font-bold uppercase tracking-widest text-neon-green">
            {dayjs(timelineEvent.date).format("MMMM")}
          </p>
        </div>
      </div>

      <div className="absolute left-6 top-0 flex h-full -translate-x-1/2 flex-col items-center justify-start md:left-1/2">
        <div
          className={`flex size-4 items-center justify-center rounded-full border-2 transition-all duration-500 ${
            markerActive
              ? "scale-125 border-neon-green bg-darkest shadow-[0_0_10px_#9ccd7e]"
              : "border-white/20 bg-darker"
          }`}
        >
          {markerActive && (
            <div className="size-1.5 rounded-full bg-neon-green" />
          )}
        </div>
      </div>

      <div className="flex-1 pl-12 md:pl-0">
        <motion.div
          initial={{ opacity: 0, x: even ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full ${even ? "md:pr-12" : "md:pl-12"}`}
        >
          <SpotlightCard className="overflow-hidden border border-white/10 bg-darkest shadow-xl transition-all hover:border-white/20">
            {timelineEvent.image && (
              <div className="relative h-48 w-full overflow-hidden sm:h-64">
                <div className="absolute inset-0 transition-transform duration-700 hover:scale-105">
                  <RenderImage
                    image={timelineEvent.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-darkest to-transparent opacity-60" />
              </div>
            )}

            <div className="p-6">
              <div className="mb-2 block md:hidden">
                <span className="text-xl font-bold text-white">
                  {dayjs(timelineEvent.date).year()}
                </span>
              </div>
              <h4 className="mb-3 text-2xl font-bold text-white">
                {timelineEvent.heading}
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {timelineEvent.description}
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </div>
  );
});

TimelineCard.displayName = "TimelineCard";
export default TimelineCard;
