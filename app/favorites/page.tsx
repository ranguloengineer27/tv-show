import { FavoritesListContainer } from "@/ui/components/Favorites/FavoritesListContainer";

export default function FavoritesPage() {
    return (
        <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="min-h-screen w-full max-w-5xl flex-col items-center py-12 px-4 md:px-16 bg-white dark:bg-black sm:items-start">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold">Your Favorites</h1>
                    <p className="text-muted-foreground">Shows you've saved to watch later</p>
                </header>
                <FavoritesListContainer />
            </main>
        </div>
    );
}
