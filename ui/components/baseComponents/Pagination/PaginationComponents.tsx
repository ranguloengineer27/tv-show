import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/ui/components/baseComponents/Button/Button"

export const PaginationRoot = ({
    className,
    ...props
}: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="Pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
)
PaginationRoot.displayName = "PaginationRoot"

export const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex items-center gap-1", className)}
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

export const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn(className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
    isActive?: boolean
    size?: "default" | "sm" | "lg" | "icon"
} & React.ComponentProps<"button">

export const PaginationLink = React.forwardRef<
    HTMLButtonElement,
    PaginationLinkProps
>(({ className, isActive, size = "icon", ...props }, ref) => (
    <button
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "outline" : "ghost",
                size,
            }),
            className
        )}
        {...props}
    />
))
PaginationLink.displayName = "PaginationLink"

export const PaginationPrevious = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(
            "gap-1 pl-2.5",
            disabled && "pointer-events-none opacity-50",
            className
        )}
        {...props}
    >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
    </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

export const PaginationNext = ({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        disabled={disabled}
        aria-disabled={disabled}
        className={cn(
            "gap-1 pr-2.5",
            disabled && "pointer-events-none opacity-50",
            className
        )}
        {...props}
    >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
    </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

export const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More pages</span>
    </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"
