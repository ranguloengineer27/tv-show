import { render, screen, fireEvent } from "@testing-library/react";
import { ShowCard } from "@/ui/components/ShowCard/ShowCard";
import { useRouter } from "next/navigation";
import { useFavoritesStore } from "@/ui/hooks/useFavoritesStore";

jest.mock("@/ui/hooks/useFavoritesStore", () => ({
    useFavoritesStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("ShowCard", () => {
    const defaultProps = {
        id: 1,
        title: "Test Show",
        summary: "<p>Test summary</p>",
        image: "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
        genres: ["Drama", "Thriller"],
        rating: 9.5,
        url: "/show/1",
    };

    const mockAddFavorite = jest.fn();
    const mockRemoveFavorite = jest.fn();
    const mockIsFavorite = jest.fn();

    beforeEach(() => {
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

    it("should render the title", () => {
        render(<ShowCard {...defaultProps} />);
        expect(screen.getByText("Test Show")).toBeInTheDocument();
    });

    it("should render the image with correct alt text", () => {
        render(<ShowCard {...defaultProps} />);
        const image = screen.getByRole("img", { name: "Test Show" });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src");
    });

    it("should render the rating", () => {
        render(<ShowCard {...defaultProps} />);
        expect(screen.getByText("9.5")).toBeInTheDocument();
    });

    it("should render 'Not rated' when rating is missing", () => {
        render(<ShowCard {...defaultProps} rating={null} />);
        expect(screen.getByText("Not rated")).toBeInTheDocument();
    });

    it("should render the summary", () => {
        render(<ShowCard {...defaultProps} />);
        expect(screen.getByText("Test summary")).toBeInTheDocument();
    });

    it("should render genres", () => {
        render(<ShowCard {...defaultProps} />);
        expect(screen.getByText("Drama")).toBeInTheDocument();
        expect(screen.getByText("Thriller")).toBeInTheDocument();
    });

    it("should not render image container if image is missing", () => {
        render(<ShowCard {...defaultProps} image={undefined} />);
        const image = screen.queryByRole("img", { name: "Test Show" });
        expect(image).not.toBeInTheDocument();
    });

    it("should not render genres container if genres are missing", () => {
        render(<ShowCard {...defaultProps} genres={undefined} />);
        expect(screen.queryByText("Drama")).not.toBeInTheDocument();
    });

    it("should navigate to the correct url when 'See more' button is clicked", () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        render(<ShowCard {...defaultProps} />);
        const button = screen.getByText("See more");
        fireEvent.click(button);

        expect(pushMock).toHaveBeenCalledWith("/show/1");
    });

    it("should toggle favorite status when heart button is clicked", () => {
        render(<ShowCard {...defaultProps} />);
        const button = screen.getByLabelText("Add to favorites");

        fireEvent.click(button);
        expect(mockAddFavorite).toHaveBeenCalledWith(expect.objectContaining({
            id: 1,
            name: "Test Show",
        }));

        mockIsFavorite.mockReturnValue(true);
        render(<ShowCard {...defaultProps} />);
        const removeButton = screen.getByLabelText("Remove from favorites");
        fireEvent.click(removeButton);
        expect(mockRemoveFavorite).toHaveBeenCalledWith(1);
    });
});
