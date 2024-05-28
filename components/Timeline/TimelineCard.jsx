import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
const dayjs = require("dayjs");
import RenderImage from "@/components/RenderImage";
import useOnScreen from "@/hooks/useOnScreen";

const TimelineCard = ({ timelineEvent, even }, ref) => {
  const isCardVisible = useOnScreen(ref, false, 0.2);
  const [cardSeenOnce, setCardSeenOnce] = useState(false);

  useEffect(() => {
    if (isCardVisible) {
      setCardSeenOnce(true);
    }
  }, [isCardVisible]);

  const [markerAboveHalf, setMarkerAboveHalf] = useState(false);
  const markerRef = useRef(null);
  const checkMarkerAboveHalf = useCallback(() => {
    if (markerRef.current) {
      const isAboveHalf =
        window.innerHeight / 2 - markerRef.current.getBoundingClientRect().y >
        0;
      setMarkerAboveHalf(isAboveHalf);
    }
  }, []);

  useEffect(() => {
    checkMarkerAboveHalf();
    window.addEventListener("resize", checkMarkerAboveHalf);
    document.addEventListener("scroll", checkMarkerAboveHalf);

    return () => {
      window.removeEventListener("resize", checkMarkerAboveHalf);
      window.removeEventListener("scroll", checkMarkerAboveHalf);
    };
  }, [markerRef, checkMarkerAboveHalf]);

  return (
    <div
      ref={ref}
      key={timelineEvent._id}
      className={`relative mb-12 flex ${even ? "" : "lg:flex-row-reverse"}`}
    >
      {/* desktop heading */}
      <div
        className={`mt-1 hidden w-1/2 font-eslLegend text-3xl font-bold text-light lg:block ${
          even ? "text-right" : ""
        }`}
      >
        {timelineEvent.heading}
      </div>

      {/* marker */}
      <div
        ref={markerRef}
        className={`mr-4 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-light font-eslLegend text-lg md:mx-4  lg:mx-5  ${
          markerAboveHalf ? "bg-light text-dark" : "bg-darker text-white"
        }`}
      >
        {dayjs(timelineEvent.date).year()}
      </div>

      {/* image card */}
      <div
        className={`relative rounded-md bg-dark duration-[2000ms] lg:w-1/2 ${
          !cardSeenOnce
            ? `opacity-0 ${
                even
                  ? "translate-x-full"
                  : "translate-x-full lg:-translate-x-full"
              }`
            : ""
        }`}
      >
        {/* arrow */}
        <div
          className={`absolute  left-0 top-5 size-4 -translate-x-1/2 rotate-45 bg-dark ${
            even ? "" : "lg:left-auto lg:right-0 lg:translate-x-1/2"
          }`}
        />

        <RenderImage
          image={timelineEvent.image}
          className="relative"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* content */}
        <div className={`px-8 py-5 ${even ? "text-right" : ""}`}>
          {/* heading */}
          <div className="mb-1 font-eslLegend text-2xl font-bold text-light lg:hidden">
            {timelineEvent.heading}
          </div>
          {/* description */}
          <div className="text-white">{timelineEvent.description}</div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(TimelineCard);
