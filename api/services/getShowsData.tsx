import { Show, ShowDetails } from "../types/Shows";
import { handleApiError, handleHttpError } from "@/lib/errors";

export const getShowsData = async (query: string): Promise<Show[]> => {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            handleHttpError(response, 'Search shows');
        }
        return await response.json();
    } catch (e) {
        handleApiError(e, 'Search shows');
    }
}

export const getShowById = async (id: string): Promise<ShowDetails> => {
    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`, {
            next: { revalidate: 14400 } // 4 hours
        });
        if (!response.ok) {
            handleHttpError(response, `Show ${id}`);
        }
        return await response.json();
    } catch (e) {
        handleApiError(e, `Show ${id}`);
    }
}

export const getAllShows = async (): Promise<ShowDetails[]> => {
    try {
        const response = await fetch(`https://api.tvmaze.com/shows`, {
            next: { revalidate: 14400 } // 4 hours
        });
        if (!response.ok) {
            handleHttpError(response, 'All shows');
        }
        return await response.json();
    } catch (e) {
        handleApiError(e, 'All shows');
    }
}