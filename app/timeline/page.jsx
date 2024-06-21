import fetchData from "@/lib/sanity/fetchData";
import TimelineUi from "@/components/Timeline/TimelineUi";
import "@/styles/timeline.css";

export default async function Timeline() {
  const timelineEvents = await fetchData("timelineEvent");
  // sorted the timeline
  const sortedTimelineEvents = timelineEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <main className="bg-black">
      {/* body */}
      <div className="relative flex h-screen items-center justify-center">
        <h1 className="text-4xl text-gray-600">
          Welcome to the JUNOON timeline
        </h1>
        {/* scroll-down-button */}
        <a
          href="#timeline-top"
          className="scroll-down absolute bottom-4 block h-12 w-7 rounded-full border-2 border-white"
        />
      </div>

      <div id="timeline-top" />
      {/* timeline */}
      <section className="relative mx-auto mt-[10vh] w-11/12 max-w-6xl pb-36 md:w-10/12">
        <TimelineUi timelineEvents={sortedTimelineEvents} />
      </section>
    </main>
  );
}
