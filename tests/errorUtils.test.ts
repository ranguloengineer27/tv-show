import {
    isAppError,
    getErrorMessage,
    handleApiError,
    handleHttpError,
} from "@/lib/errors/errorUtils";
import {
    AppError,
    ApiError,
    NetworkError,
    NotFoundError,
    ValidationError,
} from "@/lib/errors/AppError";

describe("errorUtils", () => {
    describe("isAppError", () => {
        it("returns true for AppError instances", () => {
            expect(isAppError(new AppError("Test", "TEST"))).toBe(true);
            expect(isAppError(new ApiError("Test"))).toBe(true);
            expect(isAppError(new NetworkError())).toBe(true);
            expect(isAppError(new NotFoundError())).toBe(true);
            expect(isAppError(new ValidationError())).toBe(true);
        });

        it("returns false for regular Error instances", () => {
            expect(isAppError(new Error("Regular error"))).toBe(false);
        });

        it("returns false for non-error values", () => {
            expect(isAppError(null)).toBe(false);
            expect(isAppError(undefined)).toBe(false);
            expect(isAppError("string")).toBe(false);
            expect(isAppError(123)).toBe(false);
            expect(isAppError({})).toBe(false);
        });
    });

    describe("getErrorMessage", () => {
        it("returns message for AppError instances", () => {
            expect(getErrorMessage(new AppError("App error", "TEST"))).toBe(
                "App error"
            );
            expect(getErrorMessage(new ApiError("API error"))).toBe("API error");
            expect(getErrorMessage(new NetworkError("Network error"))).toBe(
                "Network error"
            );
        });

        it("returns message for regular Error instances", () => {
            expect(getErrorMessage(new Error("Regular error"))).toBe(
                "Regular error"
            );
        });

        it("returns string value for string errors", () => {
            expect(getErrorMessage("String error")).toBe("String error");
        });

        it("returns default message for unknown error types", () => {
            expect(getErrorMessage(null)).toBe("An unexpected error occurred");
            expect(getErrorMessage(undefined)).toBe(
                "An unexpected error occurred"
            );
            expect(getErrorMessage(123)).toBe("An unexpected error occurred");
            expect(getErrorMessage({})).toBe("An unexpected error occurred");
        });
    });

    describe("handleApiError", () => {
        it("throws NetworkError for TypeError with fetch in message", () => {
            const fetchError = new TypeError("fetch failed");

            expect(() => handleApiError(fetchError, "Test")).toThrow(
                NetworkError
            );
            expect(() => handleApiError(fetchError, "Test")).toThrow(
                "Test failed: Network error"
            );
        });

        it("rethrows AppError instances", () => {
            const appError = new ApiError("API error");

            expect(() => handleApiError(appError, "Test")).toThrow(ApiError);
            expect(() => handleApiError(appError, "Test")).toThrow("API error");
        });

        it("converts regular Error to ApiError", () => {
            const regularError = new Error("Regular error");

            expect(() => handleApiError(regularError, "Test")).toThrow(
                ApiError
            );
            expect(() => handleApiError(regularError, "Test")).toThrow(
                "Test failed: Regular error"
            );
        });

        it("converts unknown error types to ApiError", () => {
            expect(() => handleApiError(null, "Test")).toThrow(ApiError);
            expect(() => handleApiError(null, "Test")).toThrow(
                "Test failed: null"
            );

            expect(() => handleApiError(123, "Test")).toThrow(ApiError);
            expect(() => handleApiError(123, "Test")).toThrow(
                "Test failed: 123"
            );
        });

        it("uses default context when not provided", () => {
            const regularError = new Error("Regular error");

            expect(() => handleApiError(regularError)).toThrow(ApiError);
            expect(() => handleApiError(regularError)).toThrow(
                "API request failed: Regular error"
            );
        });
    });

    describe("handleHttpError", () => {
        it("throws ApiError with NOT_FOUND code for 404 status", () => {
            const response = new Response(null, {
                status: 404,
                statusText: "Not Found",
            });

            expect(() => handleHttpError(response, "Test")).toThrow(ApiError);
            expect(() => handleHttpError(response, "Test")).toThrow(
                "Test not found"
            );

            try {
                handleHttpError(response, "Test");
            } catch (error) {
                expect(error).toBeInstanceOf(ApiError);
                if (error instanceof ApiError) {
                    expect(error.code).toBe("NOT_FOUND");
                    expect(error.statusCode).toBe(404);
                }
            }
        });

        it("throws ApiError with CLIENT_ERROR code for 4xx status", () => {
            const response = new Response(null, {
                status: 400,
                statusText: "Bad Request",
            });

            expect(() => handleHttpError(response, "Test")).toThrow(ApiError);
            expect(() => handleHttpError(response, "Test")).toThrow(
                "Test failed: Bad Request"
            );

            try {
                handleHttpError(response, "Test");
            } catch (error) {
                expect(error).toBeInstanceOf(ApiError);
                if (error instanceof ApiError) {
                    expect(error.code).toBe("CLIENT_ERROR");
                    expect(error.statusCode).toBe(400);
                }
            }
        });

        it("throws ApiError with SERVER_ERROR code for 5xx status", () => {
            const response = new Response(null, {
                status: 500,
                statusText: "Internal Server Error",
            });

            expect(() => handleHttpError(response, "Test")).toThrow(ApiError);
            expect(() => handleHttpError(response, "Test")).toThrow(
                "Test failed: Server error"
            );

            try {
                handleHttpError(response, "Test");
            } catch (error) {
                expect(error).toBeInstanceOf(ApiError);
                if (error instanceof ApiError) {
                    expect(error.code).toBe("SERVER_ERROR");
                    expect(error.statusCode).toBe(500);
                }
            }
        });

        it("throws ApiError for other status codes", () => {
            const response = new Response(null, {
                status: 300,
                statusText: "Multiple Choices",
            });

            expect(() => handleHttpError(response, "Test")).toThrow(ApiError);
            expect(() => handleHttpError(response, "Test")).toThrow(
                "Test failed with status 300"
            );

            try {
                handleHttpError(response, "Test");
            } catch (error) {
                expect(error).toBeInstanceOf(ApiError);
                if (error instanceof ApiError) {
                    expect(error.statusCode).toBe(300);
                }
            }
        });

        it("uses default context when not provided", () => {
            const response = new Response(null, {
                status: 404,
                statusText: "Not Found",
            });

            expect(() => handleHttpError(response)).toThrow(ApiError);
            expect(() => handleHttpError(response)).toThrow("Request not found");
        });

        it("handles various 4xx status codes", () => {
            const statusCodes = [400, 401, 403, 422, 429];

            statusCodes.forEach((status) => {
                const response = new Response(null, {
                    status,
                    statusText: "Client Error",
                });

                expect(() => handleHttpError(response, "Test")).toThrow(
                    ApiError
                );

                try {
                    handleHttpError(response, "Test");
                } catch (error) {
                    expect(error).toBeInstanceOf(ApiError);
                    if (error instanceof ApiError) {
                        expect(error.code).toBe("CLIENT_ERROR");
                        expect(error.statusCode).toBe(status);
                    }
                }
            });
        });

        it("handles various 5xx status codes", () => {
            const statusCodes = [500, 502, 503, 504];

            statusCodes.forEach((status) => {
                const response = new Response(null, {
                    status,
                    statusText: "Server Error",
                });

                expect(() => handleHttpError(response, "Test")).toThrow(
                    ApiError
                );

                try {
                    handleHttpError(response, "Test");
                } catch (error) {
                    expect(error).toBeInstanceOf(ApiError);
                    if (error instanceof ApiError) {
                        expect(error.code).toBe("SERVER_ERROR");
                        expect(error.statusCode).toBe(status);
                    }
                }
            });
        });
    });
});

