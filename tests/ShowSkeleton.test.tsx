import { render } from "@testing-library/react";
import { ShowSkeleton } from "@/ui/components/ShowSkeleton/ShowSkeleton";

// Mock Skeleton component to avoid deep rendering issues if any
jest.mock("@/ui/components/baseComponents/Skeleton/Skeleton", () => ({
    Skeleton: ({ className }: { className: string }) => <div data-testid="skeleton" className={className} />,
}));

describe("ShowSkeleton", () => {
    it("should render card variant by default", () => {
        const { getAllByTestId } = render(<ShowSkeleton />);
        const skeletons = getAllByTestId("skeleton");
        // Card variant has 4 skeletons
        expect(skeletons).toHaveLength(4);
        expect(skeletons[0]).toHaveClass("h-48");
    });

    it("should render details variant", () => {
        const { getAllByTestId } = render(<ShowSkeleton variant="details" />);
        const skeletons = getAllByTestId("skeleton");
        // Details variant has 5 skeletons
        expect(skeletons).toHaveLength(5);
        expect(skeletons[0]).toHaveClass("h-96");
    });
});
