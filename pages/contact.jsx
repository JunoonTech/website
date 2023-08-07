import Header from "@/components/Header";
import getContent from "@/lib/strapi";
import getCommonProps from "@/lib/getCommonProps";
import SocialLinks from "@/components/SocialLinks";

const About = ({ contact, navbarLinks, socialLinks, logos }) => {
  return (
    <main className="min-h-screen bg-lightest text-dark">
      {/* header */}
      <Header
        logo={logos.fullBlack}
        navbarLinks={navbarLinks}
        socialLinks={socialLinks}
      />
      {/* body */}
      <div className="mx-auto max-w-5xl px-4 pb-24 text-center md:w-1/2">
        <h1 className="mb-10">{contact.attributes.heading}</h1>
        <h4 className="mb-10">{contact.attributes.subheading}</h4>
        <SocialLinks
          containerStyle="grid-flow-row md:grid-flow-col gap-14"
          iconStyle="mb-2 text-blue-400"
          socials={socialLinks}
          lg
          showText
        />
      </div>
    </main>
  );
};
export default About;

export const getStaticProps = async () => {
  const { data: contact } = await getContent({ name: "contact" });
  const commonProps = await getCommonProps();
  return {
    props: {
      contact,
      ...commonProps,
    },
  };
};
