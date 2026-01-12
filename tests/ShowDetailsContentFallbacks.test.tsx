import { render, screen } from "@testing-library/react";
import { ShowDetailsContentFallbacks } from "@/ui/components/ShowDetails/ShowDetailsContentFallbacks";
import { ShowDetails } from "@/api/types/Shows";
import { ApiError } from "@/lib/errors";

// Mock ShowSkeleton
jest.mock("@/ui/components/ShowSkeleton/ShowSkeleton", () => ({
    ShowSkeleton: ({ variant }: { variant?: string }) => (
        <div data-testid="show-skeleton" data-variant={variant} />
    ),
}));

describe("ShowDetailsContentFallbacks", () => {
    const mockShow: ShowDetails = {
        id: 1,
        name: "Test Show",
        summary: "<p>Test summary</p>",
        image: { medium: "image.jpg", original: "image.jpg" },
        rating: { average: 8.5 },
        genres: ["Drama"],
        network: {
            name: "HBO",
            id: 1,
            officialSite: "https://www.hbo.com",
            country: { code: "US", name: "United States", timezone: "America/New_York" },
        },
        schedule: { time: "21:00", days: ["Sunday"] },
    };

    it("should render loading skeleton when isLoading is true", () => {
        render(
            <ShowDetailsContentFallbacks
                isLoading={true}
                error={null}
                show={undefined}
            />
        );

        const skeleton = screen.getByTestId("show-skeleton");
        expect(skeleton).toBeInTheDocument();
        expect(skeleton).toHaveAttribute("data-variant", "details");
    });

    it("should render error message when error is provided", () => {
        const error = new Error("Test error");
        render(
            <ShowDetailsContentFallbacks
                isLoading={false}
                error={error}
                show={undefined}
            />
        );

        expect(screen.getByText("Test error")).toBeInTheDocument();
        expect(screen.queryByTestId("show-skeleton")).not.toBeInTheDocument();
    });

    it("should render ApiError message correctly", () => {
        const error = new ApiError("API error", 404);
        render(
            <ShowDetailsContentFallbacks
                isLoading={false}
                error={error}
                show={undefined}
            />
        );

        expect(screen.getByText("API error")).toBeInTheDocument();
    });

    it("should render 'Show not found' when show is undefined and no error", () => {
        render(
            <ShowDetailsContentFallbacks
                isLoading={false}
                error={null}
                show={undefined}
            />
        );

        expect(screen.getByText("Show not found")).toBeInTheDocument();
        expect(screen.queryByTestId("show-skeleton")).not.toBeInTheDocument();
    });

    it("should render 'Show not found' when show is null and no error", () => {
        render(
            <ShowDetailsContentFallbacks
                isLoading={false}
                error={null}
                show={null as unknown as ShowDetails}
            />
        );

        expect(screen.getByText("Show not found")).toBeInTheDocument();
    });

    it("should prioritize error over missing show", () => {
        const error = new Error("Network error");
        render(
            <ShowDetailsContentFallbacks
                isLoading={false}
                error={error}
                show={undefined}
            />
        );

        expect(screen.getByText("Network error")).toBeInTheDocument();
        expect(screen.queryByText("Show not found")).not.toBeInTheDocument();
    });

    it("should return null when show is provided and not loading", () => {
        const { container } = render(
            <ShowDetailsContentFallbacks
                isLoading={false}
                error={null}
                show={mockShow}
            />
        );

        expect(container.firstChild).toBeNull();
        expect(screen.queryByTestId("show-skeleton")).not.toBeInTheDocument();
        expect(screen.queryByText("Show not found")).not.toBeInTheDocument();
    });

    it("should prioritize loading state over error", () => {
        const error = new Error("Test error");
        render(
            <ShowDetailsContentFallbacks
                isLoading={true}
                error={error}
                show={undefined}
            />
        );

        const skeleton = screen.getByTestId("show-skeleton");
        expect(skeleton).toBeInTheDocument();
        expect(screen.queryByText("Test error")).not.toBeInTheDocument();
    });

    it("should prioritize loading state over missing show", () => {
        render(
            <ShowDetailsContentFallbacks
                isLoading={true}
                error={null}
                show={undefined}
            />
        );

        const skeleton = screen.getByTestId("show-skeleton");
        expect(skeleton).toBeInTheDocument();
        expect(screen.queryByText("Show not found")).not.toBeInTheDocument();
    });

    it("should apply correct CSS classes for error state", () => {
        const error = new Error("Test error");
        const { container } = render(
            <ShowDetailsContentFallbacks
                isLoading={false}
                error={error}
                show={undefined}
            />
        );

        const errorDiv = container.querySelector(".text-red-500");
        expect(errorDiv).toBeInTheDocument();
        expect(errorDiv).toHaveClass("container", "mx-auto", "py-8", "px-4", "text-center", "text-red-500");
    });

    it("should apply correct CSS classes for loading state", () => {
        const { container } = render(
            <ShowDetailsContentFallbacks
                isLoading={true}
                error={null}
                show={undefined}
            />
        );

        const loadingDiv = container.querySelector(".container");
        expect(loadingDiv).toBeInTheDocument();
        expect(loadingDiv).toHaveClass("container", "mx-auto", "py-8", "px-4");
    });
});

