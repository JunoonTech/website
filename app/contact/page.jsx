import SocialLinks from "@/components/SocialLinks";
import fetchData from "@/lib/sanity/fetchData";

export default async function About() {
  const contact = await fetchData("contact", {}, "[0]");
  return (
    <main className="bg-lightest text-dark">
      <div className="mx-auto max-w-5xl p-4 text-center md:w-1/2">
        <h1 className="mb-10">{contact.heading}</h1>
        <h4 className="mb-10">{contact.subheading}</h4>
        <SocialLinks
          containerStyle="grid-flow-row md:grid-flow-col gap-14"
          iconStyle="mb-2 text-blue-400"
          lg
          showText
        />
      </div>
    </main>
  );
}
