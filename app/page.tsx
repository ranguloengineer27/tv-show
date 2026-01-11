import { ShowsContainer } from "@/ui/components/ShowsContainer/ShowsContainer";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full max-w-5xl flex-col items-center py-12 px-4 md:px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="sr-only">Explore TV Shows</h1>
        <ShowsContainer />
      </main>
    </div>
  );
}
