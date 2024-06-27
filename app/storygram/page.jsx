import StorygramCards from "@/components/StorygramCards";
import fetchData from "@/lib/sanity/fetchData";

export default async function Storygram() {
  const storygrams = await fetchData("storygram");

  return (
    <main className="bg-darker">
      <div className="mx-auto max-w-5xl pt-32 text-white">
        <StorygramCards storygrams={storygrams} />
      </div>
    </main>
  );
}