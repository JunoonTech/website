import axios from "axios";

const strapi = axios.create({
  baseURL: process.env.STRAPI_URL,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
});

const getContent = async ({ name, sort, pageSize, page }) => {
  let query = `/api/${name}?populate=deep`;
  if (sort && sort.length > 0) {
    query += sort.map((field, idx) => `&sort[${idx}]=${field}`).join("");
  }
  if (pageSize && page) {
    query += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  }
  const { data } = await strapi({
    url: query,
  });
  return data;
};

export default getContent;
