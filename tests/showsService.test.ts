import { getAllShows, getShowById, getShowsData } from "@/api/services/showsService";
import { ApiError, NetworkError } from "@/lib/errors";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";

describe("showsService", () => {
    describe("getShowsData", () => {
        it("returns search results", async () => {
            const payload = [
                {
                    score: 1,
                    show: {
                        id: 1,
                        name: "Breaking Bad",
                        summary: "Summary",
                    },
                },
            ];

            server.use(
                http.get("https://api.tvmaze.com/search/shows", ({ request }) => {
                    const url = new URL(request.url);
                    expect(url.searchParams.get("q")).toBe("query");
                    return HttpResponse.json(payload);
                })
            );

            const result = await getShowsData("query");
            expect(result).toEqual(payload);
        });

        it("throws ApiError on http failure", async () => {
            server.use(
                http.get("https://api.tvmaze.com/search/shows", () => {
                    return HttpResponse.json({ error: "server error" }, { status: 500 });
                })
            );

            await expect(getShowsData("query")).rejects.toBeInstanceOf(ApiError);
        });

        it("throws NetworkError on fetch failure", async () => {
            server.use(
                http.get("https://api.tvmaze.com/search/shows", () => {
                    return HttpResponse.error();
                })
            );

            await expect(getShowsData("query")).rejects.toBeInstanceOf(NetworkError);
        });
    });

    describe("getShowById", () => {
        it("returns show details", async () => {
            const payload = {
                id: 1,
                name: "Breaking Bad",
                summary: "Summary",
            };

            server.use(
                http.get("https://api.tvmaze.com/shows/1", () => {
                    return HttpResponse.json(payload);
                })
            );

            const result = await getShowById("1");
            expect(result).toEqual(expect.objectContaining(payload));
        });

        it("throws ApiError on not found", async () => {
            server.use(
                http.get("https://api.tvmaze.com/shows/42", () => {
                    return new HttpResponse(null, { status: 404, statusText: "Not Found" });
                })
            );

            await expect(getShowById("42")).rejects.toBeInstanceOf(ApiError);
        });
    });

    describe("getAllShows", () => {
        it("returns all shows", async () => {
            const payload = [
                { id: 1, name: "Breaking Bad", summary: "Summary" },
                { id: 2, name: "Better Call Saul", summary: "Summary" },
            ];

            server.use(
                http.get("https://api.tvmaze.com/shows", () => {
                    return HttpResponse.json(payload);
                })
            );

            const result = await getAllShows();
            expect(result).toEqual(payload);
        });

        it("throws ApiError on server error", async () => {
            server.use(
                http.get("https://api.tvmaze.com/shows", () => {
                    return HttpResponse.json({ error: "server error" }, { status: 500 });
                })
            );

            await expect(getAllShows()).rejects.toBeInstanceOf(ApiError);
        });
    });
});

