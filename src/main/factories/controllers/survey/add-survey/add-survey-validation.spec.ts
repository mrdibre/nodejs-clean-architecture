import { makeAddSurveyValidation } from "./add-survey-validation";
import {
  ValidationComposite,
  RequiredFieldValidation,
} from "@/validation/validators";

jest.mock("@/validation/validators/validation-composite/validation-composite");

describe("SignUpValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeAddSurveyValidation();

    const validations = [];

    for (const field of ["question", "answers"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
