import validator from "validator";
import { EmailValidator } from "../../presentation/protocols";

class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}

export { EmailValidatorAdapter };
