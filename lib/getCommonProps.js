import getContent from "./strapi";

const getCommonProps = async () => {
  const { data: socialLinks } = await getContent({ name: "social-links" });
  const { data: navbarLinks } = await getContent({
    name: "navbar-links",
    sort: ["id"],
  });
  const {
    data: { attributes: logos },
  } = await getContent({ name: "logo" });
  return { logos, navbarLinks, socialLinks };
};

export default getCommonProps;
