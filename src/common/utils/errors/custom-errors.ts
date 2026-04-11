export interface ValidationErrorDetail {
  path: string[];
  message: string;
}

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    cause?: Error,
  ) {
    super(message, { cause });
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request', cause?: Error) {
    super(message, 400, cause);
  }
}

export class ValidationError extends BadRequestError {
  constructor(public details: ValidationErrorDetail[]) {
    super('Validation Error');
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, cause?: Error) {
    super(message, 404, cause);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string, cause?: Error) {
    super(message, 409, cause);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message: string = 'Too many requests. Try later', cause?: Error) {
    super(message, 429, cause);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal Server Error', cause?: Error) {
    super(message, 500, cause);
  }
}

export class ExternalServiceError extends HttpError {
  constructor(
    public readonly serviceName: string,
    cause?: Error,
    message: string = 'External service temporarily unavailable',
  ) {
    super(message, 503, cause);
  }
}

export class GithubRateLimitError extends ExternalServiceError {
  constructor(cause?: Error, message?: string) {
    super('GitHub', cause, message);
  }
}

export class EmailServiceError extends ExternalServiceError {
  constructor(cause?: Error, message?: string) {
    super('Email', cause, message);
  }
}
