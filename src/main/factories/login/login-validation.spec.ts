import { makeLoginValidation } from "./login-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite/validation-composite";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field/require-field-validation";
import { EmailValidator } from "../../../presentation/protocols";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation/email-validation";

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

    for (const field of ["name", "email"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
