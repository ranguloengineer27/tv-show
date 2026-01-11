import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { getShowsData } from "@/api/services/showsService";
import { useState } from "react";
import { STALE_TIME } from "@/lib/constants";
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