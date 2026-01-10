import { Show, ShowDetails } from "../types/Shows";

export const getShowsData = async (query: string): Promise<Show[]> => {
    try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        throw new Error(`Error fetching tv shows: ${e}`);
    }
}

export const getShowById = async (id: string): Promise<ShowDetails> => {
    try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        throw new Error(`Error fetching show details: ${e}`);
    }
}