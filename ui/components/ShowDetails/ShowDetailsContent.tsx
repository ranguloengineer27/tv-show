"use client";

import Image from "next/image";
import { StarIcon, HeartIcon, TvIcon } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/ui/components/baseComponents/Card/Card";
import { Button } from "@/ui/components/baseComponents/Button/Button";
import { cn } from "@/lib/utils";
import { ShowDetails } from "@/api/types/Shows";
import { ShowDetailsContentFallbacks } from "./ShowDetailsContentFallbacks";
import { useIsMounted } from "@/ui/hooks/useIsMounted";

type ShowDetailsContentProps = {
    show: ShowDetails | undefined;
    isLoading: boolean;
    error: Error | null;
    isFav: boolean;
    onToggleFavorite: () => void;
};

export function ShowDetailsContent({
    show,
    isLoading,
    error,
    isFav: isFavProp,
    onToggleFavorite,
}: ShowDetailsContentProps) {
    const isMounted = useIsMounted();
    const isFav = isMounted ? isFavProp : false;

    if (isLoading || error || !show) {
        return (
            <ShowDetailsContentFallbacks
                isLoading={isLoading}
                error={error}
                show={show}
            />
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="md:flex">
                <div className="md:w-1/3">
                    <div className="relative aspect-[2/3] w-full bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                        {show.image ? (
                            <Image
                                src={show.image.original || show.image.medium}
                                alt={show.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <TvIcon className="h-24 w-24 text-muted-foreground/50" />
                        )}
                    </div>
                </div>
                <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="text-3xl font-bold">{show.name}</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onToggleFavorite}
                            className="gap-2 w-[200px] justify-center"
                        >
                            <HeartIcon className={cn("h-4 w-4", isFav && "fill-red-500 text-red-500")} />
                            {isFav ? "Remove from favorites" : "Add to favorites"}
                        </Button>
                    </CardHeader>

                    <div className="flex items-center gap-2 mb-6">
                        <StarIcon className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                        {show.rating.average ? (
                            <span className="text-xl font-semibold">{show.rating.average}</span>
                        ) : (
                            <span className="text-lg text-muted-foreground">Not rated</span>
                        )}
                    </div>

                    {show.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {show.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        {show.network && (
                            <div>
                                <span className="font-semibold block text-muted-foreground">Network</span>
                                <span>{show.network.name} ({show.network.country.code})</span>
                            </div>
                        )}
                        {show.schedule && show.schedule.days.length > 0 && (
                            <div>
                                <span className="font-semibold block text-muted-foreground">Schedule</span>
                                <span>{show.schedule.days.join(", ")} at {show.schedule.time}</span>
                                <span className="text-xs text-muted-foreground"> - {show.network.country.timezone} timezone</span>
                            </div>
                        )}
                    </div>

                    {show.summary && (
                        <>
                            <hr className="mb-6" />
                            <CardContent className="p-0">
                                <div
                                    className="prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: show.summary }}
                                />
                            </CardContent>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
