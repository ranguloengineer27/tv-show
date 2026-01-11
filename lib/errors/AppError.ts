/**
 * Base error class for all application errors
 */
export class AppError extends Error {
    public readonly code: string;
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        code: string,
        statusCode: number = 500,
        isOperational: boolean = true
    ) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

/**
 * Error for API-related failures
 */
export class ApiError extends AppError {
    constructor(
        message: string,
        statusCode: number = 500,
        code: string = 'API_ERROR'
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Error for network failures
 */
export class NetworkError extends AppError {
    constructor(message: string = 'Network request failed') {
        super(message, 'NETWORK_ERROR', 0);
    }
}

/**
 * Error for 404 not found
 */
export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 'NOT_FOUND', 404);
    }
}

/**
 * Error for validation failures
 */
export class ValidationError extends AppError {
    constructor(message: string = 'Validation failed') {
        super(message, 'VALIDATION_ERROR', 400);
    }
}
