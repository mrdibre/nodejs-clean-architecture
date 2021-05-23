import { InvalidParamError, ServerError } from "../../errors";
import { EmailValidator } from "../../protocols";
import { EmailValidation } from "./email-validation";

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email) {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeSut = () => {
  const emailValidatorStub = makeEmailValidator();

  const sut = new EmailValidation("email", emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe("EmailValidation Controller", () => {
  test("Should return an error if EmailValidator returns false", () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const error = sut.validate({ email: "any_email@mail.com" });

    expect(error).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    sut.validate({
      email: "any_email@mail.com",
    });

    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should return 500 if EmailValidator throws", () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new ServerError();
    });

    expect(sut.validate).toThrow();
  });
});
