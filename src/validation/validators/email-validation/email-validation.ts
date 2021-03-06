import { Validation, EmailValidator } from "@/validation/protocols";
import { InvalidParamError } from "@/presentation/errors";

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
