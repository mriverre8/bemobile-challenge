import { Character } from "@/types/character";

/** * Checks if a character is liked based on its ID.
 * @param likedItems - Array of liked characters.
 * @param id - The ID of the character to check.
 * @returns True if the character is liked, false otherwise.
 */
export function isCharacterLiked(likedItems: Character[], id: number) {
  if (likedItems.some((item) => item.id === id)) {
    return true;
  }
  return false;
}
