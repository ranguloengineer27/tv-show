import { Show } from "../types/Shows";

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