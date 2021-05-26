import { Validation } from "../../../protocols/validation";
import { MissingParamError } from "../../../errors";

class RequiredFieldValidation implements Validation {
  constructor(private readonly field: string) {}

  validate(input: Record<any, any>): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field);
    }
  }
}

export { RequiredFieldValidation };
