"use server";

import { CharacterInfo } from "@/types/character";

export const getCharacterById = async (
  id: string
): Promise<CharacterInfo | null> => {
  try {
    const apiUrl = `http://comicvine.gamespot.com/api/character/4005-${id}?api_key=${process.env.COMIC_VINE_API_KEY}&format=json&field_list=name,image,id,deck,issue_credits`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data.error !== "OK") {
      return null;
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
};
