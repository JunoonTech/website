const getContent = async ({ name, sort, pageSize, page }) => {
  let query = `api/${name}?populate=deep`;
  if (sort && sort.length > 0) {
    query += sort.map((field, idx) => `&sort[${idx}]=${field}`).join("");
  }
  if (pageSize && page) {
    query += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  }

  const data = await fetch(process.env.STRAPI_URL + query, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
    },
  }).then((res) => res.json());
  return data;
};

export default getContent;
