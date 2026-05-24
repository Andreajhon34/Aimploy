export class HttpError extends Error {
  public status: number;
  public data: unknown;
  public code: string;

  constructor(
    status: number,
    message: string,
    code: string,
    data: unknown = null,
  ) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.data = data;
    this.code = code;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
