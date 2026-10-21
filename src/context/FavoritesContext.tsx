"use client";

import { createContext, useContext } from "react";

export interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);

// Estado por defecto — favoritos vacíos cuando el provider no está montado
const FAVORITES_EMPTY_DEFAULT: FavoritesContextValue = {
  favorites: [],
  toggleFavorite: async () => {},
  isFavorite: () => false,
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  return ctx ?? FAVORITES_EMPTY_DEFAULT;
};
