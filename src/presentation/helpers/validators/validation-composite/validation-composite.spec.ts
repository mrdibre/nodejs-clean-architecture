import { MissingParamError } from "../../../errors";
import { ValidationComposite } from "./validation-composite";
import { Validation } from "../validation";

const makeValidationStub = () => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return new MissingParamError("field");
    }
  }

  return new ValidationStub();
};

const makeSut = () => {
  const validationStub = makeValidationStub();

  const sut = new ValidationComposite([validationStub]);

  return sut;
};

describe("Validation Composite", () => {
  test("Should return an error if any validation fails", () => {
    const sut = makeSut();

    const error = sut.validate({ field: "any_value" });

    expect(error).toEqual(new MissingParamError("field"));
  });
});
