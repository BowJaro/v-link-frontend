import { createContext, useContext } from "react";

export interface KokoState {
  innovations: Array<{ id: string }>;
  argonauts: Array<{ id: string }>;
  challenges: Array<{ id: string }>;
  projects: Array<{ id: string }>;
  roles: Array<{ id: string }>;
}

export interface KokoContextType {
  koko: KokoState;
  isKoko: (type: keyof KokoState, id: string) => boolean;
  toggleKoko: (type: keyof KokoState, item: { id: string }) => void;
  removeKoko: (type: keyof KokoState, id: string) => void;
}

export const KokoContext = createContext<KokoContextType | null>(null);

export const useKoko = () => {
  const context = useContext(KokoContext);
  if (!context) {
    throw new Error("useKoko must be used within KokoContext provider");
  }
  return context;
};
