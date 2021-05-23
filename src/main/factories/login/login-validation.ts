import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite/validation-composite";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field/require-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation/email-validation";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter/email-validator-adapter";

const makeLoginValidation = () => {
  const validations: Validation[] = [];

  for (const field of ["name", "email"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};

export { makeLoginValidation };
