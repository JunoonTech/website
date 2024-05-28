import fetchData from "./fetchData";

export default async function fetchLogo(slug) {
  const logo = await fetchData("logo", { "slug.current": slug }, "{image}[0]");

  return logo;
}
