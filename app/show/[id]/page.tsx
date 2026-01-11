"use client";

import Image from "next/image";
import { StarIcon, HeartIcon } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/ui/components/baseComponents/Card/Card";
import { Button } from "@/ui/components/baseComponents/Button/Button";
import { useShow } from "@/ui/hooks/useShow";
import { use } from "react";
import { ShowSkeleton } from "@/ui/components/ShowSkeleton/ShowSkeleton";
import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { cn } from "@/lib/utils";

export default function ShowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: show, isLoading, error } = useShow(id);
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

    // Convert id to number for store consistency if needed, assuming id from params is string
    // but store uses number. ShowDetails uses number.
    const showId = parseInt(id, 10);
    const isFav = isFavorite(showId);

    const handleToggleFavorite = () => {
        if (!show) return;

        if (isFav) {
            removeFavorite(showId);
        } else {
            addFavorite(show);
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <ShowSkeleton variant="details" />
            </div>
        );
    }

    if (error || !show) {
        return (
            <div className="container mx-auto py-8 px-4 text-center text-red-500">
                Error loading show details.
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="md:flex">
                {show.image && (
                    <div className="md:w-1/3">
                        <Image
                            src={show.image.original || show.image.medium}
                            alt={show.name}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto rounded-lg"
                            priority
                        />
                    </div>
                )}
                <div className="md:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-3xl font-bold">{show.name}</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleToggleFavorite}
                            className="gap-2"
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
                                <span className="block text-xs text-muted-foreground">{show.network.country.timezone} timezone</span>
                            </div>
                        )}
                        {show.schedule && show.schedule.days.length > 0 && (
                            <div>
                                <span className="font-semibold block text-muted-foreground">Schedule</span>
                                <span>{show.schedule.days.join(", ")} at {show.schedule.time}</span>
                            </div>
                        )}
                    </div>

                    <hr className="mb-6" />

                    {show.summary && (
                        <CardContent className="p-0">
                            <div
                                className="prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: show.summary }}
                            />
                        </CardContent>
                    )}

                </div>
            </div>
        </div>
    );
}
