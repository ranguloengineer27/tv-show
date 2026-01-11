
"use client";

import { Input } from "../baseComponents/Input/Input";
import { useSearchShow } from "../../hooks/useSearchShow";
import { ShowsList } from "./ShowsList";
import { usePagination } from "../../hooks/usePagination";
import { getAllShows } from "@/api/services/showsService";
import { useQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 8;

export function ShowsContainer() {
    const {
        search,
        onSearchChange,
        data,
        isLoading,
        error,
    } = useSearchShow();

    const { data: shows } = useQuery({
        queryKey: ["all-shows"],
        queryFn: () => getAllShows(),
    });

    const showsData = data?.map((show) => show.show);

    const {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
    } = usePagination({
        data: showsData ?? shows,
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

            <ShowsList
                data={currentData ?? shows}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                error={error}
                isEmpty={!isLoading && !error && currentData?.length === 0}
            />
        </div>
    );
}
