import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { ShowDetails } from "@/api/types/Shows";

describe("useFavoritesStore", () => {
    const mockShow: ShowDetails = {
        id: 1,
        name: "Test Show",
        image: { medium: "image.jpg", original: "image.jpg" },
        rating: { average: 8.5 },
        genres: ["Action"],
        schedule: { time: "20:00", days: ["Monday"] },
    };

    beforeEach(() => {
        // Clear store before each test
        useFavoritesStore.setState({ favorites: [] });
    });

    it("should start with an empty favorites list", () => {
        const { favorites } = useFavoritesStore.getState();
        expect(favorites).toEqual([]);
    });

    it("should add a favorite", () => {
        const { addFavorite } = useFavoritesStore.getState();
        addFavorite(mockShow);
        const { favorites } = useFavoritesStore.getState();
        expect(favorites).toHaveLength(1);
        expect(favorites[0]).toEqual(mockShow);
    });

    it("should remove a favorite", () => {
        const { addFavorite, removeFavorite } = useFavoritesStore.getState();
        addFavorite(mockShow);
        removeFavorite(mockShow.id);
        const { favorites } = useFavoritesStore.getState();
        expect(favorites).toHaveLength(0);
    });

    it("should check if a show is favorite", () => {
        const { addFavorite, isFavorite } = useFavoritesStore.getState();
        expect(isFavorite(mockShow.id)).toBe(false);
        addFavorite(mockShow);
        expect(isFavorite(mockShow.id)).toBe(true);
    });
});
