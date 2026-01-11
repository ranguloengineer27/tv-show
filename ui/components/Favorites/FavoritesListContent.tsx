"use client";

import { ShowCard } from "@/ui/components/ShowCard/ShowCard";
import { Button } from "@/ui/components/baseComponents/Button/Button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { ShowDetails } from "@/api/types/Shows";

type FavoritesListContentProps = {
    favorites: ShowDetails[];
};

export function FavoritesListContent({ favorites }: FavoritesListContentProps) {
    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 w-full text-center space-y-4">
                <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-full">
                    <HeartIcon className="h-12 w-12 text-zinc-400" />
                </div>
                <h2 className="text-xl font-semibold">No favorites yet</h2>
                <p className="text-muted-foreground max-w-xs">
                    Start exploring shows and click the heart icon to save them here.
                </p>
                <Link href="/">
                    <Button variant="default" className="mt-4">
                        Browse Shows
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {favorites.map((show) => (
                <ShowCard
                    key={show.id}
                    id={show.id}
                    url={`/show/${show.id}`}
                    title={show.name}
                    summary={show.summary}
                    image={show.image?.medium}
                    genres={show.genres}
                    rating={show.rating?.average}
                />
            ))}
        </div>
    );
}
