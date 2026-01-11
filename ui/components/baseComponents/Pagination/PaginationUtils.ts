export const DOTS = "DOTS"

export function getPaginationRange({
    currentPage,
    totalPages,
    siblingCount = 1,
}: {
    currentPage: number
    totalPages: number
    siblingCount?: number
}): (number | typeof DOTS)[] {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPageNumbers >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
    )

    const showLeftDots = leftSiblingIndex > 2
    const showRightDots = rightSiblingIndex < totalPages - 1

    if (!showLeftDots && showRightDots) {
        const leftRange = Array.from(
            { length: 3 + siblingCount * 2 },
            (_, i) => i + 1
        )
        return [...leftRange, DOTS, totalPages]
    }

    if (showLeftDots && !showRightDots) {
        const rightRange = Array.from(
            { length: 3 + siblingCount * 2 },
            (_, i) => totalPages - (3 + siblingCount * 2) + 1 + i
        )
        return [1, DOTS, ...rightRange]
    }

    const middleRange = Array.from(
        { length: siblingCount * 2 + 1 },
        (_, i) => leftSiblingIndex + i
    )

    return [1, DOTS, ...middleRange, DOTS, totalPages]
}
