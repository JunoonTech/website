import fetchData from "./fetchData";

export default async function fetchTeam() {
  const team = await fetchData(
    "team",
    {},
    `{
        ...,
        members[]->,
    }[0]`,
  );

  return team;
}
