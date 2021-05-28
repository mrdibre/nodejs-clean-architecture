import { CompareFieldsValidation } from "./compare-fields-validation";
import { InvalidParamError } from "../../../presentation/errors";

const makeSut = () => new CompareFieldsValidation("field", "fieldToCompare");

describe("CompareFieldsValidation Validation", () => {
  test("Should return a InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "" });

    expect(error).toEqual(new InvalidParamError("fieldToCompare"));
  });

  test("Should return void if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "123", fieldToCompare: "123" });

    expect(error).toBeFalsy();
  });
});
