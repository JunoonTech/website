import axios from "axios";

const strapi = axios.create({
  baseURL: process.env.STRAPI_URL,
  headers: {
    Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
  },
});

const getContent = async ({ name }) => {
  const { data } = await strapi({
    url: `/api/${name}?populate=deep`,
  });
  return data;
};

export default getContent;
