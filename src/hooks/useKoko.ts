import { useState } from "react";

interface KokoState {
  innovations: any[];
  argonauts: any[];
  challenges: any[];
  projects: any[];
  roles: any[];
}

export const useKoko = () => {
  const [koko, setKoko] = useState<KokoState>({
    innovations: [],
    argonauts: [],
    challenges: [],
    projects: [],
    roles: [],
  });

  const removeKoko = (type: keyof KokoState, id: string) => {
    setKoko((prev) => ({
      ...prev,
      [type]: prev[type].filter((item: any) => item.id !== id),
    }));
  };

  return { koko, removeKoko };
};
