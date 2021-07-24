import { Validation } from "@/validation/protocols";

const mockValidation = (): Validation => {
  class ValidationSub implements Validation {
    validate(input: any) {
      return null;
    }
  }

  return new ValidationSub();
};

export { mockValidation };
