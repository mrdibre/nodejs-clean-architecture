import { Validation } from "@/validation/protocols";
import {
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";

const makeAddSurveyValidation = () => {
  const validations: Validation[] = [];

  for (const field of ["question", "answers"]) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};

export { makeAddSurveyValidation };
