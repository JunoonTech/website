import CollectionCard from "@/components/CollectionCard";
import fetchData from "@/lib/sanity/fetchData";
import dayjs from "dayjs";
import _ from "lodash";

export default async function Collections() {
  const collections = await fetchData("collection");
  const collectionGroups = _.groupBy(
    collections,
    (collection) => (collection.year = dayjs(collection.date).year()),
  );
  return (
    <main className="bg-lightest text-dark">
      {Object.entries(collectionGroups).map(([year, collections]) => {
        return (
          <div key={year}>
            <div className="m-7 text-center text-3xl">{year}</div>
            <div className="flex flex-wrap items-center justify-around">
              {collections.map((collection) => {
                return (
                  <CollectionCard
                    key={collection._id}
                    collection={collection}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}
