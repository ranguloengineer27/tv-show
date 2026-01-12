"use client";

import { ShowCard } from "../ShowCard/ShowCard";
import { ShowDetails } from "@/api/types/Shows";
import { ShowsListFallback } from "./ShowsListFallback";

type ShowsListProps = {
    data: ShowDetails[];
    isLoading: boolean;
    error: Error | null;
    isEmpty: boolean;
};

export function ShowsList({
    data,
    isLoading,
    error,
    isEmpty,
}: ShowsListProps) {
    if (isLoading || error || isEmpty) {
        return (
            <ShowsListFallback
                isLoading={isLoading}
                error={error}
                isEmpty={isEmpty}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map((show) => (
                <ShowCard
                    key={show.id}
                    id={show.id}
                    url={`show/${show.id}`}
                    title={show.name}
                    summary={show.summary}
                    image={show.image?.medium}
                    genres={show.genres}
                    rating={show.rating?.average}
                />
            ))}
        </div>
    );
}
