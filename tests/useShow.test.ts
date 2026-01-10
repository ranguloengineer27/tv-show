import { renderHook, waitFor } from "@testing-library/react";
import { useShow } from "@/ui/hooks/useShow";
import { QueryWrapper } from "./test-utils";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";

describe("useShow", () => {
    it("should fetch show details", async () => {
        server.use(
            http.get("https://api.tvmaze.com/shows/1", () => {
                return HttpResponse.json({
                    id: 1,
                    name: "Breaking Bad",
                    rating: { average: 9.5 },
                    image: { medium: "image.jpg", original: "image.jpg" },
                    genres: ["Drama"],
                    summary: "Summary",
                });
            })
        );

        const { result } = renderHook(() => useShow("1"), {
            wrapper: QueryWrapper,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(expect.objectContaining({
            id: 1,
            name: "Breaking Bad",
        }));
    });

    it("should handle errors", async () => {
        server.use(
            http.get("https://api.tvmaze.com/shows/999", () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        const { result } = renderHook(() => useShow("999"), {
            wrapper: QueryWrapper,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});
