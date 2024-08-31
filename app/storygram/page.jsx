import StorygramCards from "@/components/StorygramCards";
import fetchData from "@/lib/sanity/fetchData";
import Pagination from "@/components/Pagination";

export default async function Storygram({ searchParams }) {
  const pageSize = 8;
  const currentPage = parseInt(searchParams.page || "1", 10);
  const storygrams = await fetchData("storygram");
  const sortedStorygrams = storygrams.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStorygrams = sortedStorygrams.slice(
    startIndex,
    startIndex + pageSize,
  );

  const totalPages = Math.ceil(storygrams.length / pageSize);

  return (
    <main className="p-6">
      <div className="mx-auto max-w-5xl pt-24 text-white">
        <StorygramCards storygrams={paginatedStorygrams} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          url={"storygram"}
        />
      </div>
    </main>
  );
}
