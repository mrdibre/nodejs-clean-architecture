import { Validation } from "../../protocols";
import { MissingParamError } from "../../../presentation/errors";

class RequiredFieldValidation implements Validation {
  constructor(private readonly field: string) {}

  validate(input: Record<any, any>): Error {
    if (!input[this.field]) {
      return new MissingParamError(this.field);
    }
  }
}

export { RequiredFieldValidation };
