import Footer from "@/components/Footer";
import Header from "@/components/Header";
import getContent from "@/lib/strapi";
import getCommonProps from "@/lib/getCommonProps";
import CollectionCard from "@/components/CollectionCard";
import dayjs from "dayjs";

const Collections = ({ collectionGroups, navbarLinks, socialLinks, logos }) => {
  return (
    <main className="bg-lightest text-dark">
      {/* header */}
      <Header
        logo={logos.fullBlack}
        navbarLinks={navbarLinks}
        socialLinks={socialLinks}
      />
      {/* body */}

      {collectionGroups.map((group) => {
        return (
          <div key={group.year}>
            <div className="m-7 text-center text-3xl">{group.year}</div>
            <div className="flex flex-wrap items-center justify-around">
              {group.collections.map((collection) => {
                return (
                  <CollectionCard
                    key={collection.id}
                    collection={collection}
                    logo={logos.logoOnlyWhite}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {/* footer */}
      <Footer logo={logos.fullWhite} socialLinks={socialLinks} />
    </main>
  );
};
export default Collections;

export const getStaticProps = async () => {
  const { data: collections } = await getContent({
    name: "collections",
    sort: ["date:desc"],
  });
  collections.forEach((collection) => {
    collection.attributes.year = dayjs(collection.attributes.date).year();
  });
  const collectionGroups = [];
  collections.forEach((collection) => {
    const existingGroup = collectionGroups.find(
      (group) => group.year === collection.attributes.year,
    );
    if (!existingGroup) {
      collectionGroups.push({
        year: collection.attributes.year,
        collections: [collection],
      });
    } else {
      existingGroup.collections.push(collection);
    }
  });
  const commonProps = await getCommonProps();
  return { props: { collectionGroups, ...commonProps } };
};
