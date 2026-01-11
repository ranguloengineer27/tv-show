"use client";

import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { useIsMounted } from "@/ui/hooks/useIsMounted";
import { ShowSkeleton } from "@/ui/components/ShowSkeleton/ShowSkeleton";
import { FavoritesListContent } from "./FavoritesListContent";

export function FavoritesList() {
    const isMounted = useIsMounted();
    const { favorites } = useFavoritesStore();

    if (!isMounted) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ShowSkeleton key={i} />
                ))}
            </div>
        );
    }

    return <FavoritesListContent favorites={favorites} />;
}
