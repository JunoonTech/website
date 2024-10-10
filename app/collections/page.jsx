import CollectionCard from "@/components/CollectionCard";
import fetchData from "@/lib/sanity/fetchData";
import dayjs from "dayjs";
import _ from "lodash";

export default async function Collections() {
  const collections = await fetchData("collection");

  const collectionGroups = _.groupBy(collections, (collection) =>
    dayjs(collection.date).year()
  );

  const sortedCollectionGroups = Object.entries(collectionGroups).sort(
    ([yearA], [yearB]) => yearB - yearA 
  );

  return (
    <main className="p-6 pt-12">
      {sortedCollectionGroups.map(([year, collections]) => {
        const sortedCollections = collections.sort((a, b) => {
          const dateA = dayjs(a.date);
          const dateB = dayjs(b.date);
          return dateB - dateA;
        });

        return (
          <div key={year}>
            <div className="m-7 text-center text-3xl">{year}</div>
            <div className="flex flex-wrap items-center justify-around gap-20">
              {sortedCollections.map((collection) => (
                <CollectionCard key={collection._id} collection={collection} />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
