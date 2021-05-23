import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite/validation-composite";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field/require-field-validation";
import { Validation } from "../../../presentation/protocols/validation";
import { CompareFieldsValidation } from "../../../presentation/helpers/validators/compare-fields/compare-fields-validation";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation/email-validation";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter/email-validator-adapter";

const makeSignUpValidation = () => {
  const validations: Validation[] = [];

  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation"),
  );
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};

export { makeSignUpValidation };
