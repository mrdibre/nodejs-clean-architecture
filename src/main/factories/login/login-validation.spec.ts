import { makeLoginValidation } from "./login-validation";
import { EmailValidator } from "../../../presentation/protocols";
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from "../../../presentation/helpers/validators";

jest.mock(
  "../../../presentation/helpers/validators/validation-composite/validation-composite",
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
