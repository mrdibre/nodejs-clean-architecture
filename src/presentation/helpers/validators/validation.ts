export interface Validation {
  validate<T = Record<any, any>>(input: T): Error;
}
