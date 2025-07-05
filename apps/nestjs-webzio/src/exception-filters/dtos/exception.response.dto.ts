export class ExceptionResponseDTO {
  statusCode: number;
  message: string;
  stack: string;

  constructor(statusCode: number, message: string, stack: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.stack = stack;
  }
}
