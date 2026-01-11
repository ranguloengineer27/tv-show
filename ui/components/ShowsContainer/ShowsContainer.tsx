
"use client";

import { Input } from "../baseComponents/Input/Input";
import { useSearchShow } from "../../hooks/useSearchShow";
import { ShowCard } from "../ShowCard/ShowCard";
import { ShowsContainerFallbacks } from "./ShowsContainerFallbacks";
import { Pagination } from "../baseComponents/Pagination/Pagination";
import { usePagination } from "../../hooks/usePagination";

const ITEMS_PER_PAGE = 6;

export function ShowsContainer() {
    const {
        search,
        onSearchChange,
        data,
        isLoading,
        error,
    } = useSearchShow();

    const {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
    } = usePagination({
        data,
        itemsPerPage: ITEMS_PER_PAGE,
        resetDependency: search,
    });

    return (
        <div className="space-y-6">
            <Input
                type="text"
                placeholder="Search TV shows..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="max-w-md w-full"
                aria-label="Search TV shows"
            />

            <ShowsContainerFallbacks
                isLoading={isLoading}
                error={error}
                isEmpty={!isLoading && !error && currentData?.length === 0}
            />

            {!isLoading && !error && currentData?.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentData.map(({ show }) => (
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

                    {totalPages > 1 && (
                        <Pagination
                            className="mt-8"
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </div>
    );
}
