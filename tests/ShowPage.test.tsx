import { render, screen, fireEvent } from "@testing-library/react";
import ShowPage from "@/app/show/[id]/page";
import { useShow } from "@/ui/hooks/useShow";
import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";
import { use } from "react";

// Mock hooks
jest.mock("@/ui/hooks/useShow");
jest.mock("@/ui/hooks/useFavoritesStore");
jest.mock("react", () => ({
    ...jest.requireActual("react"),
    use: jest.fn(),
}));

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe("ShowPage", () => {
    const mockShow = {
        id: 1,
        name: "Test Show",
        image: { medium: "image.jpg", original: "image.jpg" },
        rating: { average: 9.0 },
        genres: ["Drama"],
        summary: "<p>Summary</p>",
        network: { name: "HBO", country: { code: "US", timezone: "America/New_York" } },
        schedule: { time: "21:00", days: ["Sunday"] },
    };

    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();
    const mockIsFavorite = jest.fn();

    beforeEach(() => {
        (use as jest.Mock).mockReturnValue({ id: "1" });
        (useShow as jest.Mock).mockReturnValue({
            data: mockShow,
            isLoading: false,
            error: null,
        });
        // @ts-ignore
        useFavoritesStore.mockReturnValue({
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
            isFavorite: mockIsFavorite,
        });
        mockIsFavorite.mockReturnValue(false);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render show details", async () => {
        // @ts-ignore
        render(<ShowPage params={Promise.resolve({ id: "1" })} />);

        expect(screen.getByText("Test Show")).toBeInTheDocument();
        expect(screen.getByText("HBO (US)")).toBeInTheDocument();
        expect(screen.getByText("Sunday at 21:00")).toBeInTheDocument();
    });

    it("should toggle favorite status", async () => {
        // @ts-ignore
        render(<ShowPage params={Promise.resolve({ id: "1" })} />);

        const button = screen.getByText("Add to favorites");
        fireEvent.click(button);

        expect(mockAddFavorite).toHaveBeenCalledWith(mockShow);

        mockIsFavorite.mockReturnValue(true);
        // Re-render to reflect state change
        // @ts-ignore
        render(<ShowPage params={Promise.resolve({ id: "1" })} />);

        const removeButton = screen.getByText("Remove from favorites");
        fireEvent.click(removeButton);

        expect(mockRemoveFavorite).toHaveBeenCalledWith(1);
    });
});
