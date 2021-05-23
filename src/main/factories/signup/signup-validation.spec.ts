import { makeSignUpValidation } from "./signup-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/require-field-validation";
import { CompareFieldsValidation } from "../../../presentation/helpers/validators/compare-fields-validation";

jest.mock("../../../presentation/helpers/validators/validation-composite");

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

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
