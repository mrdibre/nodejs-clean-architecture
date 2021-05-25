import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../adapters/validators/email-validator/email-validator-adapter";
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from "../../../presentation/helpers/validators";

const makeLoginValidation = () => {
  const validations: Validation[] = [];

  for (const field of ["password", "email"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};

export { makeLoginValidation };
