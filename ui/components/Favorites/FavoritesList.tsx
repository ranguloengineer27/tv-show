import { ShowCard } from "@/ui/components/ShowCard/ShowCard";
import { ShowDetails } from "@/api/types/Shows";
import { FavoritesListFallbacks } from "./FavoritesListFallbacks";

type FavoritesListProps = {
    favorites: ShowDetails[];
};

export function FavoritesList({ favorites }: FavoritesListProps) {
    if (favorites.length === 0) {
        return <FavoritesListFallbacks />;
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

