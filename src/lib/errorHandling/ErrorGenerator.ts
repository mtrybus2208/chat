import { Error } from '../../shared/types/Error';
export class ErrorGenerator {
  public static createError(code: number, message: string): Error {
    const error: Error = new Error();

    error.code = code;
    error.message = message;

    return error;
  }
}
