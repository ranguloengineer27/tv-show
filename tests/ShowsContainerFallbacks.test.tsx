import { render, screen } from "@testing-library/react";
import { ShowsContainerFallbacks } from "@/ui/components/ShowsContainer/ShowsContainerFallbacks";

// Mock ShowSkeleton
jest.mock("@/ui/components/ShowSkeleton/ShowSkeleton", () => ({
    ShowSkeleton: () => <div data-testid="show-skeleton" />,
}));

describe("ShowsContainerFallbacks", () => {
    it("should render loading skeletons when isLoading is true", () => {
        render(<ShowsContainerFallbacks isLoading={true} error={null} isEmpty={false} />);
        expect(screen.getAllByTestId("show-skeleton")).toHaveLength(6);
    });

    it("should render error message when error is provided", () => {
        render(<ShowsContainerFallbacks isLoading={false} error={{ message: "Error" }} isEmpty={false} />);
        expect(screen.getByText(/Error loading shows/i)).toBeInTheDocument();
    });

    it("should render empty message when isEmpty is true", () => {
        render(<ShowsContainerFallbacks isLoading={false} error={null} isEmpty={true} />);
        expect(screen.getByText(/No shows found/i)).toBeInTheDocument();
    });

    it("should render null when no state is active", () => {
        const { container } = render(<ShowsContainerFallbacks isLoading={false} error={null} isEmpty={false} />);
        expect(container.firstChild).toBeNull();
    });
});
