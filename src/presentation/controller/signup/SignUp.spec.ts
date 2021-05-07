import { SignUpController } from "./SignUp";
import { EmailValidator, HttpRequest } from "../../protocols";
import {
  ServerError,
  MissingParamError,
  InvalidParamError,
} from "../../errors";
import { AddAccount } from "../../../domain/usecases/account/add-account";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any@email.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email) {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeAddAccount = () => {
  class AddAccountStub implements AddAccount {
    async add(account) {
      const fakeAccount = {
        id: "1",
        name: "any_name",
        email: "any@email.com",
        password: "any_password",
      };

      return Promise.resolve(fakeAccount);
    }
  }

  return new AddAccountStub();
};

const makeSut = () => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();

  const sut = new SignUpController(emailValidatorStub, addAccountStub);

  return {
    sut,
    addAccountStub,
    emailValidatorStub,
  };
};

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "valid@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("Should return 400 if no password is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "valid@email.com",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("Should return 400 if no password confirmation is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "valid@email.com",
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation"),
    );
  });

  test("Should return 400 if password confirmation failed", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        email: "valid@email.com",
        password: "any_password",
        passwordConfirmation: "any_password4",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation"),
    );
  });

  test("Should return 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    await sut.handle(makeFakeRequest());

    expect(isValidSpy).toHaveBeenCalledWith("any@email.com");
  });

  test("Should return 500 if EmailValidator throws", async () => {
    const emailValidatorStub = makeEmailValidator();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new ServerError();
    });

    // @ts-ignore
    const sut = new SignUpController(emailValidatorStub);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if AddAccount throws", async () => {
    const { emailValidatorStub, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new ServerError();
    });

    const sut = new SignUpController(emailValidatorStub, addAccountStub);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, "add");

    await sut.handle(makeFakeRequest());

    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any@email.com",
      password: "any_password",
    });
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();

    const request = makeFakeRequest();

    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(200);

    expect(httpResponse.body).toEqual({
      id: "1",
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
    });
  });
});
