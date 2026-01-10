"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../baseComponents/Card/Card";
import { StarIcon, HeartIcon } from "lucide-react";
import { Button } from "../baseComponents/Button/Button";
import { useRouter } from "next/navigation";
import styles from "./ShowCard.module.css";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { ShowDetails } from "@/api/types/Shows";

export type ShowCardProps = {
    id: number;
    title: string;
    summary?: string;
    image?: string;
    genres?: string[];
    rating?: number | null;
    url: string;
}

export function ShowCard({
    id,
    title,
    image,
    rating,
    summary,
    genres,
    url,
}: ShowCardProps) {
    const router = useRouter();
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
    const isFav = isFavorite(id);

    const navigateToPage = () => router.push(url);

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFav) {
            removeFavorite(id);
        } else {
            // Construct minimal show details for store
            addFavorite({
                id,
                name: title,
                image: image ? { medium: image, original: image } : undefined,
                rating: { average: rating || null },
                genres: genres || [],
                schedule: { time: "", days: [] }, // Default/empty for now as card doesn't have it
            } as ShowDetails);
        }
    };

    return (
        <Card className="overflow-hidden flex flex-col h-full relative group" onClick={navigateToPage}>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={handleToggleFavorite}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
                <HeartIcon className={cn("h-5 w-5", isFav && "fill-red-500 text-red-500")} />
            </Button>
            {image && (
                <div className="relative h-48 w-full">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-t-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <hr />

            <CardContent>
                <div className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    {rating ?
                        <span className="text-sm font-medium">{rating}</span>
                        : <span className="text-sm font-medium text-muted-foreground">Not rated</span>
                    }
                </div>
            </CardContent>

            {summary && (
                <CardContent>
                    <div
                        className={cn("text-sm text-muted-foreground", styles.summary)}
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </CardContent>
            )}

            {genres &&
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <span
                                key={genre}
                                className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                    <hr className="mt-4" />
                </CardContent>
            }
            <CardFooter>
                <Button
                    variant="outline"
                    onClick={navigateToPage}
                >
                    See more
                </Button>
            </CardFooter>
        </Card>
    );
}
