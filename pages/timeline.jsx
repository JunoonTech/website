import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TimelineCard from "@/components/TimelineCard";
import getContent from "@/lib/strapi";
import getCommonProps from "@/lib/getCommonProps";
import { useCallback, useEffect, useRef, useState } from "react";

const Collections = ({ timelineEvents, navbarLinks, socialLinks, logos }) => {
  const timelineRef = useRef(null);
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
    <main className="bg-black">
      {/* header */}
      <div className="absolute w-full">
        <Header
          logo={logos.fullWhite}
          navbarLinks={navbarLinks}
          socialLinks={socialLinks}
          white
        />
      </div>

      {/* body */}
      <div className="relative flex h-screen items-center justify-center">
        <h1 className="text-4xl text-gray-600">
          Welcome to the JUNOON timeline
        </h1>
        {/* scroll-down-button */}
        <button
          onClick={() => timelineRef.current.scrollIntoView()}
          className="scroll-down absolute bottom-4 block h-12 w-7 rounded-full border-2 border-white"
        />
      </div>
      {/* timeline */}
      <div ref={timelineRef} />
      <section className="relative mx-auto mt-[10vh] w-11/12 max-w-6xl pb-36 md:w-10/12">
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
          const EventRef = first
            ? firstEventMarker
            : last
            ? lastEventRef
            : null;

          return (
            <TimelineCard
              key={timelineEvent.id}
              timelineEvent={timelineEvent}
              even={even}
              ref={EventRef}
            />
          );
        })}
      </section>
      {/* footer */}
      <Footer logo={logos.fullWhite} socialLinks={socialLinks} />
    </main>
  );
};
export default Collections;

export const getStaticProps = async () => {
  const { data: timelineEvents } = await getContent({
    name: "timeline-events",
    sort: ["date:desc"],
  });
  const commonProps = await getCommonProps();
  return { props: { timelineEvents, ...commonProps } };
};
