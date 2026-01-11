import { useQuery } from "@tanstack/react-query";
import { getShowById } from "@/api/services/showsService";
import { STALE_TIME } from "@/lib/constants";

export function useShow(id: string) {
    return useQuery({
        queryKey: ["show", id],
        queryFn: () => getShowById(id),
        enabled: !!id,
        staleTime: STALE_TIME,
    });
}
