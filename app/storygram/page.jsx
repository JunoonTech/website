import StorygramCards from "@/components/StorygramCards";
import fetchData from "@/lib/sanity/fetchData";
import Pagination from "@/components/Pagination";

export default async function Storygram({ searchParams }) {
  const pageSize = 8;
  const currentPage = parseInt(searchParams.page || "1", 10);
  const storygrams = await fetchData("storygram");

  const sortedStorygrams = storygrams.sort((a, b) => {
    const numA = parseInt(a.head.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.head.replace(/\D/g, ""), 10) || 0;
    return numB - numA;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStorygrams = sortedStorygrams.slice(
    startIndex,
    startIndex + pageSize,
  );

  const totalPages = Math.ceil(storygrams.length / pageSize);

  return (
    <main className="relative min-h-screen overflow-hidden bg-darker pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green/10 blur-[120px]" />

      <div className="mx-auto w-11/12 max-w-6xl">
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Storygrams
          </h1>
        </div>
        <StorygramCards storygrams={paginatedStorygrams} />

        <div className="mt-16 border-t border-white/5 pt-10">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            url={"storygram"}
          />
        </div>
      </div>
    </main>
  );
}
