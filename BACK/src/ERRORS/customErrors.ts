export class CustomError extends Error {
  statusCode: number;
  constructor(code: number, message: string) {
    super(message);
    this.statusCode = code;
  }
}
export class Error400 extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}
