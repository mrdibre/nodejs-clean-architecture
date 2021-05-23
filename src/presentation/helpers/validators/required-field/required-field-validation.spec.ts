import { RequiredFieldValidation } from "./require-field-validation";
import { MissingParamError } from "../../../errors";

describe("RequiredField Validation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = new RequiredFieldValidation("field");
    const error = sut.validate({ field: "" });

    expect(error).toEqual(new MissingParamError("field"));
  });
});
