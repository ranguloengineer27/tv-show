"use client";

import { ShowSkeleton } from "../ShowSkeleton/ShowSkeleton";

type ShowsContainerFallbacksProps = {
    isLoading: boolean;
    error: any;
    isEmpty: boolean;
};

export function ShowsContainerFallbacks({
    isLoading,
    error,
    isEmpty,
}: ShowsContainerFallbacksProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <ShowSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500">
                Error loading shows. Please try again.
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="text-gray-500">
                No shows found.
            </div>
        );
    }

    return null;
}
