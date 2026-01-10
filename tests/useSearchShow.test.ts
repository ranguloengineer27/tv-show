import { QueryWrapper } from "./test-utils";
import { useSearchShow } from "@/ui/hooks/useSearchShow";
import { renderHook, act, waitFor } from "@testing-library/react";

jest.useFakeTimers();

describe("useSearchShow", () => {
    it("should initialize with empty search", () => {
        const { result } = renderHook(() => useSearchShow(), {
            wrapper: QueryWrapper,
        });

        expect(result.current.search).toBe("");
        expect(result.current.data).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
    });

    it("should update search value when onSearchChange is called", () => {
        const { result } = renderHook(() => useSearchShow(), {
            wrapper: QueryWrapper,
        });

        act(() => {
            result.current.onSearchChange("breaking");
        });

        expect(result.current.search).toBe("breaking");
    });

    it("should NOT fetch when search is empty", async () => {
        const { result } = renderHook(() => useSearchShow(), {
            wrapper: QueryWrapper,
        });

        await waitFor(() => {
            expect(result.current.data).toBeUndefined();
            expect(result.current.fetchStatus).toBe("idle");
        });
    });

    it("should fetch data after debounce delay", async () => {
        const { result } = renderHook(() => useSearchShow(), {
            wrapper: QueryWrapper,
        });

        act(() => {
            result.current.onSearchChange("breaking");
        });

        // advance debounce timer
        act(() => {
            jest.advanceTimersByTime(400);
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data?.[0].show.name).toBe("Breaking Bad");
    });

    it("should handle API errors", async () => {
        const { result } = renderHook(() => useSearchShow(), {
            wrapper: QueryWrapper,
        });

        act(() => {
            result.current.onSearchChange("error");
        });

        act(() => {
            jest.advanceTimersByTime(400);
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        });
    });
});
