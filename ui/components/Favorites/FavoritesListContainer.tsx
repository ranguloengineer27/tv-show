"use client";

import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { useIsMounted } from "@/ui/hooks/useIsMounted";
import { ShowSkeleton } from "@/ui/components/ShowSkeleton/ShowSkeleton";
import { FavoritesList } from "./FavoritesList";
import { Pagination } from "../baseComponents/Pagination/Pagination";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { usePagination } from "@/ui/hooks/usePagination";

export function FavoritesListContainer() {
    const isMounted = useIsMounted();
    const { favorites } = useFavoritesStore();
    const {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
    } = usePagination({
        data: favorites,
        itemsPerPage: ITEMS_PER_PAGE,
    });
    
    if (!isMounted) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ShowSkeleton key={i} />
                ))}
            </div>
        );
    }

    return <>
        <FavoritesList favorites={currentData} />
        {totalPages > 1 && (
            <Pagination
                className="mt-8"
                currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
        )}
    </>;
}

