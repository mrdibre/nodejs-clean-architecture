import { Validation } from "../validation";
import { InvalidParamError } from "../../../errors";

class CompareFieldsValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string,
  ) {}

  validate(input: Record<any, any>): Error {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare);
    }
  }
}

export { CompareFieldsValidation };
