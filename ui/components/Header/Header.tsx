"use client";

import Link from "next/link";
import { HeartIcon, HomeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-zinc-800">
            <div className="container mx-auto max-w-5xl flex h-16 items-center justify-between px-4 sm:px-8 md:px-16">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            ShowSpotter
                        </span>
                    </Link>
                </div>
                <nav className="flex items-center gap-3 sm:gap-6">
                    <Link
                        href="/"
                        className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-indigo-500",
                            pathname === "/" ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"
                        )}
                        aria-label="Home"
                    >
                        <HomeIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                    <Link
                        href="/favorites"
                        className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-500",
                            pathname === "/favorites" ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
                        )}
                        aria-label="Favorites"
                    >
                        <HeartIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Favorites</span>
                    </Link>
                    <div className="ml-1 sm:ml-2 border-l pl-3 sm:pl-4 dark:border-zinc-800">
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </header>
    );
}
