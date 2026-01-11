import { useState, useEffect } from "react";

interface UsePaginationProps<T> {
    data: T[] | undefined;
    itemsPerPage: number;
    resetDependency?: any;
}

export function usePagination<T>({ data, itemsPerPage, resetDependency }: UsePaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when dependency changes (e.g., search query)
    useEffect(() => {
        if (resetDependency !== undefined) {
            setCurrentPage(1);
        }
    }, [resetDependency]);

    const totalItems = data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data?.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
    };
}
