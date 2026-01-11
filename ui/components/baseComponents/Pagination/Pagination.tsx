import * as React from "react"
import { DOTS, getPaginationRange } from "./PaginationUtils"
import {
    PaginationRoot,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
} from "./PaginationComponents"

export type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    siblingCount?: number
    className?: string
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    className,
}: PaginationProps) {
    if (totalPages <= 1) return null

    const paginationRange = React.useMemo(
        () =>
            getPaginationRange({
                currentPage,
                totalPages,
                siblingCount,
            }),
        [currentPage, totalPages, siblingCount]
    )

    return (
        <PaginationRoot className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        disabled={currentPage === 1}
                        onClick={() =>
                            onPageChange(Math.max(1, currentPage - 1))
                        }
                    />
                </PaginationItem>

                {paginationRange.map((item, index) => {
                    if (item === DOTS) {
                        return (
                            <PaginationItem key={`dots-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }

                    return (
                        <PaginationItem key={item}>
                            <PaginationLink
                                isActive={item === currentPage}
                                onClick={() => onPageChange(item as number)}
                                aria-label={`Go to page ${item}`}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationNext
                        disabled={currentPage === totalPages}
                        onClick={() =>
                            onPageChange(
                                Math.min(totalPages, currentPage + 1)
                            )
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationRoot>
    )
}
