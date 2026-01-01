import fetchData from "@/lib/sanity/fetchData";
import TimelineUi from "@/components/Timeline/TimelineUi";
import "@/styles/timeline.css";

export default async function Timeline() {
  const timelineEvents = await fetchData("timelineEvent");
  const sortedTimelineEvents = timelineEvents.sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return (
    <main className="relative min-h-screen bg-darker overflow-hidden text-white">
      <div className="pointer-events-none fixed left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green/5 blur-[120px]" />

      <div className="relative flex h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tighter text-white drop-shadow-2xl md:text-7xl">
          Our <span className="text-neon-green">Journey</span>
        </h1>
        <p className="max-w-xl text-lg text-gray-400">
          A visual history of our milestones, events, and memories over the
          years.
        </p>
        <a
          href="#timeline-top"
          className="scroll-down absolute bottom-10 block h-12 w-7 rounded-full border-2 border-white/20 transition-colors hover:border-neon-green"
        />
      </div>

      <div id="timeline-top" />

      <section className="relative z-10 mx-auto mt-10 w-11/12 max-w-7xl pb-48 md:w-10/12">
        <TimelineUi timelineEvents={sortedTimelineEvents} />
      </section>
    </main>
  );
}
