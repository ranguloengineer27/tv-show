"use client";

import { Button } from "@/ui/components/baseComponents/Button/Button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

export function FavoritesListFallbacks() {
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

