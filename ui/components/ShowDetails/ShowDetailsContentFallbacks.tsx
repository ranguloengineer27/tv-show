"use client";

import { ShowSkeleton } from "@/ui/components/ShowSkeleton/ShowSkeleton";
import { ShowDetails } from "@/api/types/Shows";
import { getErrorMessage } from "@/lib/errors";

type ShowDetailsContentFallbacksProps = {
    isLoading: boolean;
    error: Error | null;
    show: ShowDetails | undefined;
};

export function ShowDetailsContentFallbacks({
    isLoading,
    error,
    show,
}: ShowDetailsContentFallbacksProps) {
    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <ShowSkeleton variant="details" />
            </div>
        );
    }

    if (error || !show) {
        return (
            <div className="container mx-auto py-8 px-4 text-center text-red-500">
                {error ? getErrorMessage(error) : 'Show not found'}
            </div>
        );
    }

    return null;
}
