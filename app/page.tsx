import { ShowsContainer } from "@/ui/components/ShowsContainer/ShowsContainer";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-5xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <header className="mb-3">
          <h1 className="text-4xl font-bold">ShowSpotter</h1>
          <p className="text-muted-foreground">TV Show Search & Favorites App</p>
        </header>
        <ShowsContainer />
      </main>
    </div>
  );
}
