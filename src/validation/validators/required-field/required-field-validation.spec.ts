import { RequiredFieldValidation } from "./require-field-validation";
import { MissingParamError } from "../../../presentation/errors";

const makeSut = () => new RequiredFieldValidation("field");

describe("RequiredField Validation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "" });

    expect(error).toEqual(new MissingParamError("field"));
  });

  test("Should return void if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "any_value" });

    expect(error).toBeFalsy();
  });
});
