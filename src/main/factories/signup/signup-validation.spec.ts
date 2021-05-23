import { makeSignUpValidation } from "./signup-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/require-field-validation";
import { CompareFieldsValidation } from "../../../presentation/helpers/validators/compare-fields-validation";
import { EmailValidator } from "../../../presentation/protocols";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";

jest.mock("../../../presentation/helpers/validators/validation-composite");

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
    makeSignUpValidation();

    const validations = [];

    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation"),
    );

    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
