import { SignUpController } from "./SignUp";
import { EmailValidator } from "../../protocols";
import {
  ServerError,
  MissingParamError,
  InvalidParamError,
} from "../../errors";
import { AddAccount } from "../../../domain/usecases/account/add-account";

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
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
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
        email: "cesar@gmail.com",
        password: "123",
        passwordConfirmation: "123",
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
        name: "César",
        password: "123",
        passwordConfirmation: "123",
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
        name: "César",
        email: "cesar@gmail.com",
        passwordConfirmation: "123",
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
        name: "César",
        email: "cesar@gmail.com",
        password: "123",
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
        name: "César",
        email: "cesar@gmail.com",
        password: "123",
        passwordConfirmation: "1234",
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

    const httpRequest = {
      body: {
        name: "César",
        email: "invalid_email",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("Should call EmailValidator with correct email", async () => {
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

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith("email@gmail.com");
  });

  test("Should return 500 if EmailValidator throws", async () => {
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

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should return 500 if AddAccount throws", async () => {
    const { emailValidatorStub, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new ServerError();
    });

    const sut = new SignUpController(emailValidatorStub, addAccountStub);

    const httpRequest = {
      body: {
        name: "César",
        email: "invalid_email",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, "add");

    const httpRequest = {
      body: {
        name: "César",
        email: "email@gmail.com",
        password: "123",
        passwordConfirmation: "123",
      },
    };

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith({
      name: "César",
      email: "email@gmail.com",
      password: "123",
    });
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
        passwordConfirmation: "valid_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);

    expect(httpResponse.body).toEqual({
      id: "1",
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    });
  });
});
