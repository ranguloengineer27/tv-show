"use client";

import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { ShowCard } from "@/ui/components/ShowCard/ShowCard";
import Link from "next/link";
import { Button } from "@/ui/components/baseComponents/Button/Button";
import { HeartIcon } from "lucide-react";

export default function FavoritesPage() {
    const { favorites } = useFavoritesStore();

    return (
        <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="min-h-screen w-full max-w-5xl flex-col items-center py-12 px-4 md:px-16 bg-white dark:bg-black sm:items-start">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Your Favorites</h1>
                    <p className="text-muted-foreground">Shows you've saved to watch later</p>
                </header>

                {favorites.length === 0 ? (
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
                ) : (
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
                )}
            </main>
        </div>
    );
}
