
"use client";

import { Input } from "../baseComponents/Input/Input";
import { useSearchShow } from "../../hooks/useSearchShow";
import { ShowCard } from "../ShowCard/ShowCard";
import { ShowSkeleton } from "../ShowSkeleton/ShowSkeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../baseComponents/Pagination/Pagination";
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
            />

            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ShowSkeleton key={i} />
                    ))}
                </div>
            )}

            {error && (
                <div className="text-red-500">
                    Error loading shows. Please try again.
                </div>
            )}

            {!isLoading && !error && currentData?.length === 0 && (
                <div className="text-gray-500">
                    No shows found.
                </div>
            )}

            {!isLoading && !error && currentData && currentData.length > 0 && (
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
                        <Pagination className="mt-8">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }).map((_, i) => {
                                    const page = i + 1;
                                    // Simple pagination logic: show all pages if <= 5, otherwise show current, first, last, etc.
                                    // For simplicity in this iteration, let's show all if totalPages is small, 
                                    // or just a simple list. Given API limits (usually ~10 results), pages will be few.
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={currentPage === page}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}
        </div>
    );
}
