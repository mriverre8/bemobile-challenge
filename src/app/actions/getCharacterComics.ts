"use server";

import { Comic } from "@/types/comic";

export const getCharacterComics = async (
  issue_credits: Array<{
    id: number;
  }>
): Promise<Comic[]> => {
  try {
    const comicIds = issue_credits
      .slice(0, 20)
      .map((credit) => credit.id)
      .join("|");
    const apiUrl = `https://comicvine.gamespot.com/api/issues/?api_key=${process.env.COMIC_VINE_API_KEY}&format=json&filter=id:${comicIds}&field_list=id,name,image,cover_date&limit=20&sort=cover_date:desc`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching comics:", error);
    return [];
  }
};
