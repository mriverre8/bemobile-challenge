import { Character } from "@/types/character";
import { isCharacterLiked } from "@/utils/like-utils";

describe("Like Utils Test Battery", () => {
  it("runs isCharacterLiked with a character id contained in the liked list", () => {
    const likedList = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const idToCheck = 2;
    const result = isCharacterLiked(likedList as Character[], idToCheck);
    expect(result).toBe(true);
  });

  it("runs isCharacterLiked with a character id not contained in the liked list", () => {
    const likedList = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const idToCheck = 4;
    const result = isCharacterLiked(likedList as Character[], idToCheck);
    expect(result).toBe(false);
  });
});
