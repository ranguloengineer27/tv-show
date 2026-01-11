"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../baseComponents/Button/Button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="w-9 h-9">
                <div className="h-4 w-4" />
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-full transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <SunIcon className="h-4 w-4 text-yellow-500 transition-all" />
            ) : (
                <MoonIcon className="h-4 w-4 text-zinc-700 transition-all" />
            )}
        </Button>
    );
}
