"use client";

import { ShowSkeleton } from "../ShowSkeleton/ShowSkeleton";
import { getErrorMessage } from "@/lib/errors";

type ShowsListFallbackProps = {
    isLoading: boolean;
    error: Error | null;
    isEmpty: boolean;
};

export function ShowsListFallback({
    isLoading,
    error,
    isEmpty,
}: ShowsListFallbackProps) {
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
                {getErrorMessage(error)}
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
