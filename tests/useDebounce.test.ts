import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "@/ui/hooks/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
    it("should return the initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("initial", 500));
        expect(result.current).toBe("initial");
    });

    it("should update the value after the specified delay", () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: "initial", delay: 500 } }
        );

        expect(result.current).toBe("initial");

        // Update value
        rerender({ value: "updated", delay: 500 });

        // Should still be initial value immediately after update
        expect(result.current).toBe("initial");

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // Should be updated now
        expect(result.current).toBe("updated");
    });

    it("should use default delay of 400ms if not provided", () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value),
            { initialProps: { value: "initial" } }
        );

        rerender({ value: "updated" });

        act(() => {
            jest.advanceTimersByTime(399);
        });
        expect(result.current).toBe("initial");

        act(() => {
            jest.advanceTimersByTime(1);
        });
        expect(result.current).toBe("updated");
    });

    it("should reset the timer if value changes within the delay", () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: "initial", delay: 500 } }
        );

        rerender({ value: "update1", delay: 500 });

        act(() => {
            jest.advanceTimersByTime(400);
        });
        expect(result.current).toBe("initial");

        // Update again before timer fires
        rerender({ value: "update2", delay: 500 });

        act(() => {
            jest.advanceTimersByTime(400);
        });
        // Should still be initial because timer was reset
        expect(result.current).toBe("initial");

        act(() => {
            jest.advanceTimersByTime(100);
        });
        expect(result.current).toBe("update2");
    });
});
