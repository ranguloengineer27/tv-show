import { AppError, ApiError, NetworkError } from './AppError';

/**
 * Type guard to check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
    return error instanceof AppError;
}

/**
 * Extract a user-friendly error message from any error type
 */
export function getErrorMessage(error: unknown): string {
    if (isAppError(error)) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'An unexpected error occurred';
}

/**
 * Handle API errors and convert them to AppError instances
 */
export function handleApiError(error: unknown, context: string = 'API request'): never {
    // Network errors (fetch failures)
    if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new NetworkError(`${context} failed: Network error`);
    }

    // Already an AppError, just rethrow
    if (isAppError(error)) {
        throw error;
    }

    // Generic errors
    if (error instanceof Error) {
        throw new ApiError(`${context} failed: ${error.message}`);
    }

    // Unknown error type
    throw new ApiError(`${context} failed: ${String(error)}`);
}

/**
 * Handle HTTP response errors
 */
export function handleHttpError(response: Response, context: string = 'Request'): never {
    const statusCode = response.status;
    const statusText = response.statusText;

    if (statusCode === 404) {
        throw new ApiError(`${context} not found`, 404, 'NOT_FOUND');
    }

    if (statusCode >= 400 && statusCode < 500) {
        throw new ApiError(
            `${context} failed: ${statusText}`,
            statusCode,
            'CLIENT_ERROR'
        );
    }

    if (statusCode >= 500) {
        throw new ApiError(
            `${context} failed: Server error`,
            statusCode,
            'SERVER_ERROR'
        );
    }

    throw new ApiError(
        `${context} failed with status ${statusCode}`,
        statusCode
    );
}
