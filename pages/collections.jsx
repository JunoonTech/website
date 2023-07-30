import Footer from "@/components/Footer";
import Header from "@/components/Header";
import getContent from "@/lib/strapi";
import getCommonProps from "@/lib/getCommonProps";
import CollectionCard from "../../components/CollectionCard";

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
      <div className="pt-24">
        {collectionGroups.map((collectionGroup) => {
          return (
            <div key={collectionGroup.id}>
              <div className="m-7 text-center text-3xl font-bold ">
                {collectionGroup.attributes.name}
              </div>
              {collectionGroup.attributes.subgroups.map((subgroup) => {
                return (
                  <div key={subgroup.id}>
                    <div className="m-7 text-center text-3xl">
                      {subgroup.name}
                    </div>
                    <div className="flex flex-wrap items-center justify-around">
                      {subgroup.collections.data.map((collection) => {
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
            </div>
          );
        })}
      </div>
      {/* footer */}
      <Footer logo={logos.fullWhite} socialLinks={socialLinks} />
    </main>
  );
};
export default Collections;

export const getServerSideProps = async () => {
  const { data: collectionGroups } = await getContent({
    name: "collection-groups",
    sort: ["id"],
  });
  const commonProps = await getCommonProps();
  return { props: { collectionGroups, ...commonProps } };
};
