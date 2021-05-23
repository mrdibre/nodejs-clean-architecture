import { Validation } from "./validation";
import { InvalidParamError } from "../../errors";
import { EmailValidator } from "../../protocols";

class EmailValidation implements Validation {
  constructor(
    private readonly field: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: Record<any, any>): Error {
    if (!this.emailValidator.isValid(input[this.field])) {
      return new InvalidParamError(this.field);
    }
  }
}

export { EmailValidation };
