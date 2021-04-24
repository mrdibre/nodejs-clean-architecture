import { SignUpController } from "./SignUp";
import { EmailValidator } from "../../protocols";
import {
  ServerError,
  MissingParamError,
  InvalidParamError,
} from "../../errors";

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

  const sut = new SignUpController(emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "cesar@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "César",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "César",
        email: "cesar@gmail.com",
        passwordConfirmation: "123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no password confirmation is provided", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "César",
        email: "cesar@gmail.com",
        password: "123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation"),
    );
  });

  test("Should return 400 if password confirmation failed", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "César",
        email: "cesar@gmail.com",
        password: "123",
        passwordConfirmation: "1234",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation"),
    );
  });

  test("Should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: "César",
        email: "invalid_email",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        name: "César",
        email: "email@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith("email@gmail.com");
  });

  test("Should return 500 if EmailValidator throws", () => {
    const emailValidatorStub = makeEmailValidator();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new ServerError();
    });

    // @ts-ignore
    const sut = new SignUpController(emailValidatorStub);

    const httpRequest = {
      body: {
        name: "César",
        email: "invalid_email",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
