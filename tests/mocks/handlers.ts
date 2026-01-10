import { http, HttpResponse } from "msw";

export const handlers = [
    http.get("https://api.tvmaze.com/search/shows", ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get("q");

        if (query === "error") {
            return HttpResponse.json({ error: "error" }, { status: 500 });
        }

        return HttpResponse.json([
            {
                score: 1,
                show: {
                    id: 1,
                    name: "Breaking Bad",
                    summary: "Test summary",
                },
            },
        ])
    }),
];
