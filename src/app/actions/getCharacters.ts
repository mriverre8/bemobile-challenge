'use server';

import { Character } from '@/types/character';

export const getCharacters = async (
  searchQuery?: string
): Promise<Character[]> => {
  try {
    let apiUrl = `http://comicvine.gamespot.com/api/characters?api_key=${process.env.COMIC_VINE_API_KEY}&format=json&limit=50&field_list=name,image,id`;
    if (searchQuery && searchQuery.trim()) {
      apiUrl += `&filter=name:${encodeURIComponent(searchQuery.trim())}`;
    }
    const res = await fetch(apiUrl);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};
