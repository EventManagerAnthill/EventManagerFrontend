export class ApiError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export class BadRequestError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class NotFoundRequestError extends Error {
  constructor(message?: string) {
      super(message);
      Object.setPrototypeOf(this, NotFoundRequestError.prototype);
  }
}

export class UnauthorizedError extends Error{
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}