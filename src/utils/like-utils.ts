import { Character } from '@/types/character';

/** * Checks if a character is liked based on its ID.
 * @param likedCharacters - Array of liked characters.
 * @param id - The ID of the character to check.
 * @returns True if the character is liked, false otherwise.
 */
export function isCharacterLiked(likedCharacters: Character[], id: number) {
  if (likedCharacters.some((item) => item.id === id)) {
    return true;
  }
  return false;
}
