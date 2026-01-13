import {
  likedCharactersReducer,
  LIKED_CHARACTERS_ACTION_TYPES,
} from '@/context/liked-characters-reducer';
import { Character } from '@/types/character';

describe('likedCharactersReducer Test Battery', () => {
  const likedCharacters: Character[] = [
    {
      id: 1,
      name: 'Test Character One',
      image: { super_url: 'http://example.com/image1.jpg' },
    },
    {
      id: 2,
      name: 'Test Character Two',
      image: { super_url: 'http://example.com/image2.jpg' },
    },
  ];

  it('should add a character to an empty array', () => {
    const initialState: Character[] = [];
    const action = {
      type: LIKED_CHARACTERS_ACTION_TYPES.ADD_CHARACTER,
      payload: likedCharacters[0],
    };

    const newState = likedCharactersReducer(initialState, action);

    expect(newState).toEqual([likedCharacters[0]]);
    expect(newState.length).toBe(1);
  });

  it('should add a character to an existing array', () => {
    const initialState: Character[] = [likedCharacters[0]];
    const action = {
      type: LIKED_CHARACTERS_ACTION_TYPES.ADD_CHARACTER,
      payload: likedCharacters[1],
    };

    const newState = likedCharactersReducer(initialState, action);

    expect(newState).toEqual(likedCharacters);
    expect(newState.length).toBe(2);
  });

  it('should remove a character from an existing array', () => {
    const initialState: Character[] = [likedCharacters[0], likedCharacters[1]];
    const action = {
      type: LIKED_CHARACTERS_ACTION_TYPES.REMOVE_CHARACTER,
      payload: likedCharacters[0],
    };

    const newState = likedCharactersReducer(initialState, action);

    expect(newState).toEqual([likedCharacters[1]]);
    expect(newState.length).toBe(1);
    expect(newState).not.toContain(likedCharacters[0]);
  });

  it('should remove the last character from the array', () => {
    const initialState: Character[] = [likedCharacters[0]];
    const action = {
      type: LIKED_CHARACTERS_ACTION_TYPES.REMOVE_CHARACTER,
      payload: likedCharacters[0],
    };

    const newState = likedCharactersReducer(initialState, action);

    expect(newState).toEqual([]);
    expect(newState.length).toBe(0);
  });

  it('should return the same state for unknown action types', () => {
    const initialState: Character[] = [likedCharacters[0]];
    const action = {
      type: 'UNKNOWN_ACTION' as keyof typeof LIKED_CHARACTERS_ACTION_TYPES,
      payload: likedCharacters[0],
    };
    const newState = likedCharactersReducer(initialState, action);

    expect(newState).toEqual(initialState);
    expect(newState.length).toBe(1);
  });
});
