import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ShowDetails } from "@/api/types/Shows";

type FavoritesStore = {
    favorites: ShowDetails[];
    addFavorite: (show: ShowDetails) => void;
    removeFavorite: (showId: number) => void;
    isFavorite: (showId: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (show) =>
                set((state) => ({
                    favorites: [...state.favorites, show],
                })),
            removeFavorite: (showId) =>
                set((state) => ({
                    favorites: state.favorites.filter((s) => s.id !== showId),
                })),
            isFavorite: (showId) => get().favorites.some((s) => s.id === showId),
        }),
        {
            name: "favorites-storage",
        }
    )
);
