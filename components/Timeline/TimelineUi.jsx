"use client";
import TimelineCard from "@/components/Timeline/TimelineCard";
import { useCallback, useEffect, useRef, useState } from "react";

const TimelineUi = ({ timelineEvents }) => {
  const lastEventRef = useRef(null);
  const firstEventMarker = useRef(null);

  const [progressLineHeight, setProgressLineHeight] = useState(0);
  const [totalProgressLineHeight, setTotalProgressLineHeight] = useState(0);

  const calculateTotalProgressLineHeight = useCallback(() => {
    if (firstEventMarker.current && lastEventRef.current) {
      const totalHeight =
        lastEventRef.current.getBoundingClientRect().y -
        firstEventMarker.current.getBoundingClientRect().y;
      setTotalProgressLineHeight(totalHeight);
    }
  }, []);

  const calculateProgressLineHeight = useCallback(() => {
    if (firstEventMarker.current) {
      let progress =
        window.innerHeight / 2 -
        firstEventMarker.current.getBoundingClientRect().y;

      progress = Math.max(0, Math.min(progress, totalProgressLineHeight));
      setProgressLineHeight(progress);
    }
  }, [totalProgressLineHeight]);

  useEffect(() => {
    calculateTotalProgressLineHeight();
    window.addEventListener("resize", calculateTotalProgressLineHeight);
    window.addEventListener("resize", calculateProgressLineHeight);
    document.addEventListener("scroll", calculateProgressLineHeight);

    return () => {
      window.removeEventListener("resize", calculateTotalProgressLineHeight);
      window.removeEventListener("resize", calculateProgressLineHeight);
      window.removeEventListener("scroll", calculateProgressLineHeight);
    };
  }, [
    firstEventMarker,
    lastEventRef,
    calculateProgressLineHeight,
    calculateTotalProgressLineHeight,
  ]);

  return (
    <>
      {/* progress line */}
      <div
        style={{ height: totalProgressLineHeight }}
        className="absolute left-6 top-1 w-0.5 -translate-x-1/2 overflow-hidden  bg-darker md:left-10 lg:left-1/2"
      >
        <div
          className="w-full bg-light"
          style={{ height: progressLineHeight }}
        />
      </div>

      {/* timline events */}
      {timelineEvents.map((timelineEvent, idx) => {
        const even = (idx + 1) % 2 === 0;
        const first = idx === 0;
        const last = idx === timelineEvents.length - 1;
        const EventRef = first ? firstEventMarker : last ? lastEventRef : {};

        return (
          <TimelineCard
            key={timelineEvent._id}
            timelineEvent={timelineEvent}
            even={even}
            ref={EventRef}
          />
        );
      })}
    </>
  );
};
export default TimelineUi;
