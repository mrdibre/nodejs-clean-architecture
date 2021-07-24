import { EmailValidator } from "@/validation/protocols";

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email) {
      return true;
    }
  }

  return new EmailValidatorStub();
};

export { mockEmailValidator };
