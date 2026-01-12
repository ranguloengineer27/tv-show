import { DOTS, getPaginationRange } from "@/ui/components/baseComponents/Pagination/PaginationUtils";

describe("PaginationUtils", () => {
    describe("getPaginationRange", () => {
        describe("when total pages is small (shows all pages)", () => {
            it("should return all pages when totalPages <= 7 (default siblingCount)", () => {
                const result = getPaginationRange({
                    currentPage: 1,
                    totalPages: 5,
                });

                expect(result).toEqual([1, 2, 3, 4, 5]);
            });

            it("should return all pages when totalPages equals 7", () => {
                const result = getPaginationRange({
                    currentPage: 4,
                    totalPages: 7,
                });

                expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
            });

            it("should return all pages for single page", () => {
                const result = getPaginationRange({
                    currentPage: 1,
                    totalPages: 1,
                });

                expect(result).toEqual([1]);
            });

            it("should return all pages with custom siblingCount", () => {
                const result = getPaginationRange({
                    currentPage: 1,
                    totalPages: 9,
                    siblingCount: 2,
                });

                // With siblingCount=2, totalPageNumbers = 2*2 + 5 = 9
                expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });

        describe("when showing right dots only (left side)", () => {
            it("should show first pages and right dots when on first page", () => {
                const result = getPaginationRange({
                    currentPage: 1,
                    totalPages: 10,
                });

                // Should show: [1, 2, 3, 4, 5, DOTS, 10]
                expect(result).toEqual([1, 2, 3, 4, 5, DOTS, 10]);
            });

            it("should show first pages and right dots when on second page", () => {
                const result = getPaginationRange({
                    currentPage: 2,
                    totalPages: 10,
                });

                // Should show: [1, 2, 3, 4, 5, DOTS, 10]
                expect(result[0]).toBe(1);
                expect(result[result.length - 1]).toBe(10);
                expect(result).toContain(DOTS);
            });

            it("should work with custom siblingCount", () => {
                const result = getPaginationRange({
                    currentPage: 1,
                    totalPages: 20,
                    siblingCount: 2,
                });

                // With siblingCount=2, should show: [1, 2, 3, 4, 5, DOTS, 20]
                expect(result[0]).toBe(1);
                expect(result[result.length - 1]).toBe(20);
                expect(result).toContain(DOTS);
            });
        });

        describe("when showing left dots only (right side)", () => {
            it("should show left dots and last pages when on last page", () => {
                const result = getPaginationRange({
                    currentPage: 10,
                    totalPages: 10,
                });

                // Should show: [1, DOTS, 8, 9, 10]
                expect(result[0]).toBe(1);
                expect(result[1]).toBe(DOTS);
                expect(result[result.length - 1]).toBe(10);
            });

            it("should show left dots and last pages when near last page", () => {
                const result = getPaginationRange({
                    currentPage: 9,
                    totalPages: 10,
                });

                expect(result[0]).toBe(1);
                expect(result[1]).toBe(DOTS);
                expect(result[result.length - 1]).toBe(10);
            });

            it("should work with custom siblingCount", () => {
                const result = getPaginationRange({
                    currentPage: 20,
                    totalPages: 20,
                    siblingCount: 2,
                });

                // Should show: [1, DOTS, 16, 17, 18, 19, 20]
                expect(result[0]).toBe(1);
                expect(result[1]).toBe(DOTS);
                expect(result[result.length - 1]).toBe(20);
            });
        });

        describe("when showing both left and right dots (middle)", () => {
            it("should show both dots when in middle pages", () => {
                const result = getPaginationRange({
                    currentPage: 5,
                    totalPages: 10,
                });

                // Should show: [1, DOTS, 4, 5, 6, DOTS, 10]
                expect(result[0]).toBe(1);
                expect(result[1]).toBe(DOTS);
                expect(result[result.length - 2]).toBe(DOTS);
                expect(result[result.length - 1]).toBe(10);
                expect(result).toContain(5); // Current page should be included
            });

            it("should show correct middle range", () => {
                const result = getPaginationRange({
                    currentPage: 6,
                    totalPages: 15,
                });

                // Should show: [1, DOTS, 5, 6, 7, DOTS, 15]
                expect(result[0]).toBe(1);
                expect(result[1]).toBe(DOTS);
                expect(result).toContain(5);
                expect(result).toContain(6);
                expect(result).toContain(7);
                expect(result[result.length - 2]).toBe(DOTS);
                expect(result[result.length - 1]).toBe(15);
            });

            it("should work with custom siblingCount", () => {
                const result = getPaginationRange({
                    currentPage: 10,
                    totalPages: 20,
                    siblingCount: 2,
                });

                // Should show: [1, DOTS, 8, 9, 10, 11, 12, DOTS, 20]
                expect(result[0]).toBe(1);
                expect(result[1]).toBe(DOTS);
                expect(result).toContain(10); // Current page
                expect(result[result.length - 2]).toBe(DOTS);
                expect(result[result.length - 1]).toBe(20);
            });
        });

        describe("edge cases", () => {
            it("should handle currentPage at boundary (page 1)", () => {
                const result = getPaginationRange({
                    currentPage: 1,
                    totalPages: 20,
                });

                expect(result[0]).toBe(1);
                expect(result).toContain(DOTS);
            });

            it("should handle currentPage at boundary (last page)", () => {
                const result = getPaginationRange({
                    currentPage: 20,
                    totalPages: 20,
                });

                expect(result[result.length - 1]).toBe(20);
                expect(result).toContain(DOTS);
            });

            it("should handle large totalPages", () => {
                const result = getPaginationRange({
                    currentPage: 50,
                    totalPages: 100,
                });

                expect(result[0]).toBe(1);
                expect(result[result.length - 1]).toBe(100);
                expect(result).toContain(DOTS);
                expect(result).toContain(50); // Current page
            });

            it("should handle siblingCount of 0", () => {
                const result = getPaginationRange({
                    currentPage: 5,
                    totalPages: 10,
                    siblingCount: 0,
                });

                // With siblingCount=0, totalPageNumbers = 5
                // So should show all pages if totalPages <= 5
                // For 10 pages, should show middle range
                expect(result).toContain(5); // Current page
            });

            it("should handle large siblingCount", () => {
                const result = getPaginationRange({
                    currentPage: 10,
                    totalPages: 50,
                    siblingCount: 5,
                });

                // With siblingCount=5, totalPageNumbers = 5*2 + 5 = 15
                // For 50 pages, should show middle range with dots
                expect(result[0]).toBe(1);
                expect(result[result.length - 1]).toBe(50);
                expect(result).toContain(10); // Current page
            });
        });

        describe("validation and structure", () => {
            it("should always include first page when totalPages > 1", () => {
                const result = getPaginationRange({
                    currentPage: 10,
                    totalPages: 20,
                });

                expect(result[0]).toBe(1);
            });

            it("should always include last page when totalPages > 1", () => {
                const result = getPaginationRange({
                    currentPage: 5,
                    totalPages: 20,
                });

                expect(result[result.length - 1]).toBe(20);
            });

            it("should always include current page", () => {
                const result = getPaginationRange({
                    currentPage: 7,
                    totalPages: 15,
                });

                expect(result).toContain(7);
            });

            it("should return array of numbers and DOTS", () => {
                const result = getPaginationRange({
                    currentPage: 5,
                    totalPages: 10,
                });

                result.forEach((item) => {
                    expect(
                        typeof item === "number" || item === DOTS
                    ).toBe(true);
                });
            });

            it("should not have consecutive DOTS", () => {
                const result = getPaginationRange({
                    currentPage: 10,
                    totalPages: 30,
                });

                for (let i = 0; i < result.length - 1; i++) {
                    if (result[i] === DOTS) {
                        expect(result[i + 1]).not.toBe(DOTS);
                    }
                }
            });

            it("should have numbers in ascending order", () => {
                const result = getPaginationRange({
                    currentPage: 10,
                    totalPages: 30,
                });

                const numbers = result.filter(
                    (item): item is number => typeof item === "number"
                );

                for (let i = 0; i < numbers.length - 1; i++) {
                    expect(numbers[i]).toBeLessThan(numbers[i + 1]);
                }
            });
        });
    });
});

