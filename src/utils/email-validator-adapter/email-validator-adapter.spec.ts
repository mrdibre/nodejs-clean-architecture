import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail: () => true,
}));

describe("EmailValidator Adapter", () => {
  test("Should return false if validator return false", () => {
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email@gmail.com");

    expect(isValid).toBe(false);
  });

  test("Should return true if validator return true", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_email@gmail.com");

    expect(isValid).toBe(true);
  });
});
