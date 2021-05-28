import { Validation } from "../../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../../adapters/validators/email-validator/email-validator-adapter";
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
  CompareFieldsValidation,
} from "../../../../presentation/helpers/validators";

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
