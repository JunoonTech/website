import { twJoin, twMerge } from "tailwind-merge";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Paginate = ({ pageCount, page, link, segmentSize }) => {
  const segment = ((page - 1) / segmentSize).toFixed(0);
  let start = segment * segmentSize + 1;
  const end = Math.min(start + segmentSize - 1, pageCount);

  if (pageCount > segmentSize) {
    start = Math.min(start, pageCount - segmentSize + 1);
  }

  const paginationPages = Array.from(
    { length: end - start + 1 },
    (_, i) => i + start,
  );

  return (
    <div>
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <a
          href={`${link}/${page - 1}`}
          className={twJoin(
            "relative inline-flex items-center rounded-l-md bg-white p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
            page === 1 && "pointer-events-none",
          )}
        >
          <IoIosArrowBack />
        </a>

        {paginationPages.map((paginationPage) => {
          const active = paginationPage === page;
          return (
            <Link
              key={`${link}/${paginationPage}`}
              href={`${link}/${paginationPage}`}
              aria-current="page"
              className={twMerge(
                "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-200",
                active &&
                  "z-10 bg-indigo-600 text-white hover:bg-indigo-700 pointer-events-none",
              )}
            >
              {paginationPage}
            </Link>
          );
        })}
        <a
          href={`${link}/${page + 1}`}
          className={twJoin(
            "relative inline-flex items-center rounded-r-md bg-white p-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
            page === pageCount && "pointer-events-none",
          )}
        >
          <IoIosArrowForward />
        </a>
      </nav>
    </div>
  );
};

export default Paginate;
