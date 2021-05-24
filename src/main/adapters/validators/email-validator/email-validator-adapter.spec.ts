import { EmailValidatorAdapter } from "./email-validator-adapter";
import validator from "validator";

jest.mock("validator", () => ({
  isEmail: () => true,
}));

const makeSut = () => {
  return new EmailValidatorAdapter();
};

describe("EmailValidator Adapter", () => {
  test("Should return false if validator return false", () => {
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);

    const sut = makeSut();
    const isValid = sut.isValid("invalid_email@gmail.com");

    expect(isValid).toBe(false);
  });

  test("Should return true if validator return true", () => {
    const sut = makeSut();
    const isValid = sut.isValid("valid_email@gmail.com");

    expect(isValid).toBe(true);
  });

  test("Should call validator with correct email", () => {
    const spy = jest.spyOn(validator, "isEmail");

    const sut = makeSut();
    const isValid = sut.isValid("valid_email@gmail.com");

    expect(spy).toHaveBeenCalledWith("valid_email@gmail.com");
  });
});
