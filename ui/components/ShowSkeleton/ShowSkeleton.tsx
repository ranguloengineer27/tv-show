import { Skeleton } from "../baseComponents/Skeleton/Skeleton";

type ShowSkeletonProps = {
    variant?: "card" | "details";
};

export function ShowSkeleton({ variant = "card" }: ShowSkeletonProps) {
    if (variant === "details") {
        return (
            <div className="md:flex">
                <div className="md:w-1/3">
                    <Skeleton className="h-96 w-full" />
                </div>
                <div className="md:w-2/3 p-6 space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    );
}
