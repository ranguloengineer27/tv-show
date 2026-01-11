import { render, screen, fireEvent } from "@testing-library/react";
import { ShowsContainer } from "@/ui/components/ShowsContainer/ShowsContainer";
import { useSearchShow } from "@/ui/hooks/useSearchShow";
import { QueryWrapper } from "./test-utils";
import * as getShowsDataModule from "@/api/services/showsService";

// Mock hooks
jest.mock("@/ui/hooks/useSearchShow");
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));
jest.mock("@/ui/hooks/useFavoritesStore", () => ({
    useFavoritesStore: jest.fn(() => ({
        isFavorite: jest.fn(),
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
    })),
}));

jest.mock("@/ui/components/ShowSkeleton/ShowSkeleton", () => ({
    ShowSkeleton: () => <div data-testid="show-skeleton" />,
}));

jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

// Mock getAllShows
jest.spyOn(getShowsDataModule, "getAllShows").mockResolvedValue([]);

describe("ShowsContainer", () => {
    const mockData = Array.from({ length: 15 }, (_, i) => ({
        show: {
            id: i + 1,
            name: `Show ${i + 1}`,
            image: { medium: "image.jpg" },
            rating: { average: 8.0 },
            genres: ["Drama"],
            summary: "<p>Summary</p>",
        },
    }));

    const mockOnSearchChange = jest.fn();

    beforeEach(() => {
        (useSearchShow as jest.Mock).mockReturnValue({
            search: "test",
            onSearchChange: mockOnSearchChange,
            data: mockData,
            isLoading: false,
            error: null,
        });
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the first page of items", () => {
        render(<ShowsContainer />, { wrapper: QueryWrapper });
        // ITEMS_PER_PAGE is 8
        expect(screen.getByText("Show 1")).toBeInTheDocument();
        expect(screen.getByText("Show 8")).toBeInTheDocument();
        expect(screen.queryByText("Show 9")).not.toBeInTheDocument();
    });

    it("should navigate to the next page", () => {
        render(<ShowsContainer />, { wrapper: QueryWrapper });

        const nextButton = screen.getByLabelText("Go to next page");
        fireEvent.click(nextButton);

        expect(screen.getByText("Show 9")).toBeInTheDocument();
        expect(screen.queryByText("Show 1")).not.toBeInTheDocument();
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });

    it("should navigate to the previous page", () => {
        render(<ShowsContainer />, { wrapper: QueryWrapper });

        // Go to page 2 first
        const nextButton = screen.getByLabelText("Go to next page");
        fireEvent.click(nextButton);

        // Go back to page 1
        const prevButton = screen.getByLabelText("Go to previous page");
        fireEvent.click(prevButton);

        expect(screen.getByText("Show 1")).toBeInTheDocument();
    });

    it("should render pagination numbers", () => {
        render(<ShowsContainer />, { wrapper: QueryWrapper });
        // 15 items / 8 per page = 2 pages
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("should render loading state", () => {
        (useSearchShow as jest.Mock).mockReturnValue({
            search: "test",
            onSearchChange: mockOnSearchChange,
            data: [],
            isLoading: true,
            error: null,
        });

        render(<ShowsContainer />, { wrapper: QueryWrapper });
        // ShowsListFallback renders 6 skeletons
        expect(screen.getAllByTestId("show-skeleton")).toHaveLength(6);
    });

    it("should render error state", () => {
        const error = new Error("Test error");
        (useSearchShow as jest.Mock).mockReturnValue({
            search: "test",
            onSearchChange: mockOnSearchChange,
            data: [],
            isLoading: false,
            error,
        });

        render(<ShowsContainer />, { wrapper: QueryWrapper });
        expect(screen.getByText("Test error")).toBeInTheDocument();
    });

    it("should render empty state", () => {
        (useSearchShow as jest.Mock).mockReturnValue({
            search: "test",
            onSearchChange: mockOnSearchChange,
            data: [],
            isLoading: false,
            error: null,
        });

        render(<ShowsContainer />, { wrapper: QueryWrapper });
        expect(screen.getByText(/No shows found/i)).toBeInTheDocument();
    });
});
