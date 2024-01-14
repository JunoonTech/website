import getContent from "../../lib/strapi";
import getCommonProps from "../../lib/getCommonProps";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useMemo } from "react";
import Paginate from "@/components/Paginate";
import StorygramCards from "@/components/StorygramCards";

const getStorygrams = async ({ page }) =>
  getContent({
    name: "storygrams",
    sort: ["createdAt:desc"],
    pageSize: 6,
    page,
  });

const Storygram = ({ storygrams, navbarLinks, socialLinks, logos }) => {
  const { page, pageCount } = useMemo(
    () => storygrams.meta.pagination,
    [storygrams],
  );

  return (
    <main className="bg-darker text-white">
      {/* header */}
      <Header
        navbarLinks={navbarLinks}
        socialLinks={socialLinks}
        logo={logos.fullWhite}
        white
      />

      {/* body */}
      <main className="mx-auto max-w-5xl">
        {pageCount > 1 && (
          <div className="mb-10 flex justify-center">
            <Paginate
              pageCount={pageCount}
              page={page}
              segmentSize={6}
              link="/storygram"
            />
          </div>
        )}

        <StorygramCards storygrams={storygrams} />
      </main>

      {/* footer */}
      <Footer logo={logos.fullWhite} socialLinks={socialLinks} />
    </main>
  );
};

export default Storygram;

export const getStaticProps = async (req) => {
  const { page } = req.params;
  const storygrams = await getStorygrams({ page });
  const commonProps = await getCommonProps();
  return { props: { storygrams, ...commonProps } };
};

export const getStaticPaths = async () => {
  try {
    const storygrams = await getStorygrams({ page: 1 });
    const pageCount = storygrams.meta.pagination.pageCount;
    const paths = Array.from({ length: pageCount }, (_, i) => ({
      params: { page: (i + 1).toString() },
    }));
    return { paths, fallback: false };
  } catch (err) {
    console.log(err);
    return { paths: [], fallback: true };
  }
};
