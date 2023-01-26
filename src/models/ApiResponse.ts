export class ApiResponse<T> {
  readonly statusCode: number;
  readonly isSuccessful: boolean;
  readonly message: string;
  readonly data: T;

  constructor(statusCode: number, isSuccessful: boolean, message: string, data: T) {
    this.statusCode = statusCode;
    this.isSuccessful = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}