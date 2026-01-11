"use client";

import Link from "next/link";
import { HeartIcon, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-zinc-800">
            <div className="container mx-auto max-w-5xl flex h-16 items-center justify-between px-4 md:px-16">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            ShowSpotter
                        </h1>
                    </Link>
                </div>
                <nav className="flex items-center gap-6">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-indigo-500",
                            pathname === "/" ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"
                        )}
                    >
                        <HomeIcon className="h-4 w-4" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/favorites"
                        className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-500",
                            pathname === "/favorites" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
                        )}
                    >
                        <HeartIcon className="h-4 w-4" />
                        <span>Favorites</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
