"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FavoriteContextType = {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

const FavoriteContext = createContext<
  FavoriteContextType | undefined
>(undefined);

export function FavoriteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("nova-favorites");

    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);

        if (
          Array.isArray(parsed) &&
          parsed.every((id) => typeof id === "string")
        ) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFavoriteIds(parsed);
        }
      } catch {
        localStorage.removeItem("nova-favorites");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "nova-favorites",
      JSON.stringify(favoriteIds),
    );
  }, [favoriteIds, isLoaded]);

  function toggleFavorite(productId: string) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  }

  function isFavorite(productId: string) {
    return favoriteIds.includes(productId);
  }

  return (
    <FavoriteContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "useFavorites باید داخل FavoriteProvider استفاده شود.",
    );
  }

  return context;
}