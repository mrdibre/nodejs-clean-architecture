import { Validation } from "../../../../../validation/protocols";
import { EmailValidatorAdapter } from "../../../../../infra/validators/email-validator/email-validator-adapter";
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from "../../../../../validation/validators";

const makeLoginValidation = () => {
  const validations: Validation[] = [];

  for (const field of ["password", "email"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};

export { makeLoginValidation };
