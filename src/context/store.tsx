'use client';

import { Character } from '@/types/character';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

interface ContextType {
  likedItems: Character[];
  setLikedItems: Dispatch<SetStateAction<Character[]>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [likedItems, setLikedItems] = useState<Character[]>([]);

  const value = {
    likedItems,
    setLikedItems,
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
