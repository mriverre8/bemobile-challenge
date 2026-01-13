import { Character } from '@/types/character';

export const LIKED_CHARACTERS_ACTION_TYPES = {
  ADD_CHARACTER: 'ADD_CHARACTER',
  REMOVE_CHARACTER: 'REMOVE_CHARACTER',
} as const;

export interface LikedCharactersAction {
  type: (typeof LIKED_CHARACTERS_ACTION_TYPES)[keyof typeof LIKED_CHARACTERS_ACTION_TYPES];
  payload: Character;
}

export function likedCharactersReducer(
  state: Character[],
  action: LikedCharactersAction
): Character[] {
  switch (action.type) {
    case LIKED_CHARACTERS_ACTION_TYPES.ADD_CHARACTER:
      if (state.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    case LIKED_CHARACTERS_ACTION_TYPES.REMOVE_CHARACTER:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}
