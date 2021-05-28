import { makeLoginValidation } from "./login-validation";
import { EmailValidator } from "../../../../validation/protocols";
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from "../../../../validation/validators";

jest.mock(
  "../../../../validation/validators/validation-composite/validation-composite",
);

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email) {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("SignUpValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeLoginValidation();

    const validations = [];

    for (const field of ["password", "email"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
