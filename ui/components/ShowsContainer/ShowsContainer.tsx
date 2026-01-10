"use client";

import { Input } from "../baseComponents/Input/Input";
import { useSearchShow } from "../../hooks/useSearchShow";
import { ShowCard } from "../ShowCard/ShowCard";
import { ShowSkeleton } from "../ShowSkeleton/ShowSkeleton";

export function ShowsContainer() {
    const {
        search,
        onSearchChange,
        data,
        isLoading,
        error,
    } = useSearchShow();

    return (
        <div className="space-y-6">
            <Input
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            />

            {error && (
                <p className="text-sm text-destructive">
                    Something went wrong
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {isLoading &&
                    Array.from({ length: 6 }).map((_, i) => (
                        <ShowSkeleton key={i} />
                    ))}

                {data?.map(({ show }) => (
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
        </div>
    );
}
