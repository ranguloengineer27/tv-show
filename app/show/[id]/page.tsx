"use client";

import { useShow } from "@/ui/hooks/useShow";
import { use } from "react";
import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { ShowDetailsContent } from "@/ui/components/ShowDetails/ShowDetailsContent";

export default function ShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: show, isLoading, error } = useShow(id);
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

    const showId = parseInt(id, 10);
    const isFav = isFavorite(showId);

    const handleToggleFavorite = () => {
        if (!show) return;

        if (isFav) {
            removeFavorite(showId);
        } else {
            addFavorite(show);
        }
    };

    return (
        <ShowDetailsContent
            show={show}
            isLoading={isLoading}
            error={error}
            isFav={isFav}
            onToggleFavorite={handleToggleFavorite}
        />
    );
}
