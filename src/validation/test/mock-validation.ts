import { Validation } from "@/validation/protocols";

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

export { mockValidation };
