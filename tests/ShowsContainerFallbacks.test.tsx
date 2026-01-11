import { render, screen } from "@testing-library/react";
import { ShowsListFallback } from "@/ui/components/ShowsContainer/ShowsListFallback";

// Mock ShowSkeleton
jest.mock("@/ui/components/ShowSkeleton/ShowSkeleton", () => ({
    ShowSkeleton: () => <div data-testid="show-skeleton" />,
}));

describe("ShowsListFallback", () => {
    it("should render loading skeletons when isLoading is true", () => {
        render(<ShowsListFallback isLoading={true} error={null} isEmpty={false} />);
        expect(screen.getAllByTestId("show-skeleton")).toHaveLength(6);
    });

    it("should render error message when error is provided", () => {
        const error = new Error("Test error");
        render(<ShowsListFallback isLoading={false} error={error} isEmpty={false} />);
        expect(screen.getByText("Test error")).toBeInTheDocument();
    });

    it("should render empty message when isEmpty is true", () => {
        render(<ShowsListFallback isLoading={false} error={null} isEmpty={true} />);
        expect(screen.getByText(/No shows found/i)).toBeInTheDocument();
    });

    it("should render null when no state is active", () => {
        const { container } = render(<ShowsListFallback isLoading={false} error={null} isEmpty={false} />);
        expect(container.firstChild).toBeNull();
    });
});
