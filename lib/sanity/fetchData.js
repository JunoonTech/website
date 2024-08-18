import { createClient } from "@sanity/client";
import singletons from "./singletons";

const client = createClient({
  projectId: "tvwtacpm",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false,
});

const replaceRefs = async (data) => {
  if (!data) return data;
  if (Array.isArray(data)) {
    return await Promise.all(data.map((item) => replaceRefs(item)));
  }

  if (typeof data === "object") {
    if (data._ref) {
      const refDoc = await client.getDocument(data._ref);
      return await replaceRefs(refDoc);
    }

    await Promise.all(
      Object.keys(data).map(async (key) => {
        data[key] = await replaceRefs(data[key]);
      }),
    );
  }

  return data;
};

export default async function fetchData(type, filters = {}, selector = "") {
  try {
    const filterString = Object.keys(filters)
      .map((key) => `&& ${key} == "${filters[key]}"`)
      .join(" ");
    const queryString = `*[_type == "${type}" ${filterString}]${selector}`;
    const data = await client.fetch(queryString);
    const completeData = await replaceRefs(data);

    if (Array.isArray(completeData) && singletons.includes(type)) {
      return completeData[0];
    }
    return completeData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
