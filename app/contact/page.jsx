import fetchData from "@/lib/sanity/fetchData";
import ContactMenu from "@/components/ContactMenu";

export default async function Contact() {
  const contact = await fetchData("contact", {}, "[0]");
  const socialLinks = await fetchData("socialLink");

  return (
    <main className="min-h-screen bg-darker pt-32 pb-20 text-white relative overflow-x-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-neon-green/5 blur-[120px] md:h-[600px] md:w-[600px]" />

      <div className="mx-auto w-11/12 max-w-6xl relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-between">
            <div className="mt-4 md:mt-10">
              <h1 className="mb-6 text-5xl font-bold leading-[0.9] tracking-tighter text-white break-words md:text-7xl lg:text-8xl">
                {contact?.heading || "Let's Create Together."}
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-gray-400 md:text-xl">
                {contact?.subheading ||
                  "Have an idea? We'd love to hear from you."}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <div className="mb-6 md:mb-8 text-right">
              <span className="text-xs font-bold uppercase text-neon-green tracking-widest">
                Socials
              </span>
            </div>
            {socialLinks && <ContactMenu links={socialLinks} />}
          </div>

          <div className="block lg:hidden mt-8">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                Available for Work
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
