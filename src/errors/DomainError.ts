export class DomainError extends Error {
  public readonly code: string;

  constructor(message: string, code = "DOMAIN_ERROR") {
    super(message);
    this.name = "DomainError";
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
