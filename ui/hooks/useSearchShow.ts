import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { getShowsData } from "@/api/services/getShowsData";
import { useState } from "react";

const STALE_TIME = 1000 * 60 * 5;
const QUERY_TIME = 400;

export function useSearchShow() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, QUERY_TIME);
    const isThereAnyResult = debouncedSearch.trim().length > 0;

    const query = useQuery({
        queryKey: ["shows", debouncedSearch],
        queryFn: () => getShowsData(debouncedSearch),
        enabled: isThereAnyResult,
        staleTime: STALE_TIME,
    });

    return {
        search,
        onSearchChange: (value: string) => setSearch(value),
        ...query,
    };
}