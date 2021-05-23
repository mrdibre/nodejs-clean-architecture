import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/require-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";

const makeSignUpValidation = () => {
  const validations: Validation[] = [];

  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};

export { makeSignUpValidation };
