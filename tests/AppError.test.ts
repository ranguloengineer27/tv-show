import {
    AppError,
    ApiError,
    NetworkError,
    NotFoundError,
    ValidationError,
} from "@/lib/errors/AppError";

describe("AppError", () => {
    describe("AppError base class", () => {
        it("creates an error with default values", () => {
            const error = new AppError("Test error", "TEST_ERROR");

            expect(error.message).toBe("Test error");
            expect(error.code).toBe("TEST_ERROR");
            expect(error.statusCode).toBe(500);
            expect(error.isOperational).toBe(true);
            expect(error.name).toBe("AppError");
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(AppError);
        });

        it("creates an error with custom values", () => {
            const error = new AppError(
                "Custom error",
                "CUSTOM_ERROR",
                404,
                false
            );

            expect(error.message).toBe("Custom error");
            expect(error.code).toBe("CUSTOM_ERROR");
            expect(error.statusCode).toBe(404);
            expect(error.isOperational).toBe(false);
        });

        it("maintains stack trace when available", () => {
            const error = new AppError("Test error", "TEST_ERROR");
            expect(error.stack).toBeDefined();
        });
    });

    describe("ApiError", () => {
        it("creates an ApiError with default values", () => {
            const error = new ApiError("API error");

            expect(error.message).toBe("API error");
            expect(error.code).toBe("API_ERROR");
            expect(error.statusCode).toBe(500);
            expect(error.name).toBe("ApiError");
            expect(error).toBeInstanceOf(AppError);
            expect(error).toBeInstanceOf(ApiError);
        });

        it("creates an ApiError with custom status code", () => {
            const error = new ApiError("API error", 404);

            expect(error.statusCode).toBe(404);
            expect(error.code).toBe("API_ERROR");
        });

        it("creates an ApiError with custom code", () => {
            const error = new ApiError("API error", 400, "BAD_REQUEST");

            expect(error.statusCode).toBe(400);
            expect(error.code).toBe("BAD_REQUEST");
        });
    });

    describe("NetworkError", () => {
        it("creates a NetworkError with default message", () => {
            const error = new NetworkError();

            expect(error.message).toBe("Network request failed");
            expect(error.code).toBe("NETWORK_ERROR");
            expect(error.statusCode).toBe(0);
            expect(error.name).toBe("NetworkError");
            expect(error).toBeInstanceOf(AppError);
            expect(error).toBeInstanceOf(NetworkError);
        });

        it("creates a NetworkError with custom message", () => {
            const error = new NetworkError("Custom network error");

            expect(error.message).toBe("Custom network error");
            expect(error.code).toBe("NETWORK_ERROR");
            expect(error.statusCode).toBe(0);
        });
    });

    describe("NotFoundError", () => {
        it("creates a NotFoundError with default message", () => {
            const error = new NotFoundError();

            expect(error.message).toBe("Resource not found");
            expect(error.code).toBe("NOT_FOUND");
            expect(error.statusCode).toBe(404);
            expect(error.name).toBe("NotFoundError");
            expect(error).toBeInstanceOf(AppError);
            expect(error).toBeInstanceOf(NotFoundError);
        });

        it("creates a NotFoundError with custom message", () => {
            const error = new NotFoundError("Show not found");

            expect(error.message).toBe("Show not found");
            expect(error.code).toBe("NOT_FOUND");
            expect(error.statusCode).toBe(404);
        });
    });

    describe("ValidationError", () => {
        it("creates a ValidationError with default message", () => {
            const error = new ValidationError();

            expect(error.message).toBe("Validation failed");
            expect(error.code).toBe("VALIDATION_ERROR");
            expect(error.statusCode).toBe(400);
            expect(error.name).toBe("ValidationError");
            expect(error).toBeInstanceOf(AppError);
            expect(error).toBeInstanceOf(ValidationError);
        });

        it("creates a ValidationError with custom message", () => {
            const error = new ValidationError("Invalid input");

            expect(error.message).toBe("Invalid input");
            expect(error.code).toBe("VALIDATION_ERROR");
            expect(error.statusCode).toBe(400);
        });
    });
});

