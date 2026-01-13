'use client';

import { Character } from '@/types/character';
import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from 'react';
import {
  LikedCharactersAction,
  likedCharactersReducer,
} from './liked-characters-reducer';

interface ContextType {
  likedCharacters: Character[];
  dispatchLikedCharacters: Dispatch<LikedCharactersAction>;
}

export const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [likedCharacters, dispatchLikedCharacters] = useReducer(
    likedCharactersReducer,
    []
  );

  const value = {
    likedCharacters,
    dispatchLikedCharacters,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useStore() {
  const context = useContext(Context);

  if (!context) {
    throw new Error();
  }

  return context;
}
