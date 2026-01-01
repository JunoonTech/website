import CollectionCard from "@/components/CollectionCard";
import fetchData from "@/lib/sanity/fetchData";
import dayjs from "dayjs";
import _ from "lodash";

export default async function Collections() {
  const collections = await fetchData("collection");

  const collectionGroups = _.groupBy(collections, (collection) =>
    dayjs(collection.date).year(),
  );

  const sortedCollectionGroups = Object.entries(collectionGroups).sort(
    ([yearA], [yearB]) => yearB - yearA,
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-darker pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green/10 blur-[120px]" />

      <div className="mx-auto w-11/12 max-w-6xl">
        <div className="mb-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Collections
          </h1>
        </div>
        {sortedCollectionGroups.map(([year, collections]) => {
          const sortedCollections = collections.sort((a, b) => {
            const dateA = dayjs(a.date);
            const dateB = dayjs(b.date);
            return dateB - dateA;
          });

          return (
            <div key={year} className="mb-24">
              <div className="mb-10 flex items-center gap-6">
                <span className="text-4xl font-bold text-white/20">{year}</span>
                <div className="h-px grow bg-gradient-to-r from-neon-green/50 to-transparent"></div>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {sortedCollections.map((collection) => (
                  <CollectionCard
                    key={collection._id}
                    collection={collection}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
