import { SignUpController } from "./SignUp";
import { EmailValidator, HttpRequest } from "../../protocols";
import {
  ServerError,
  MissingParamError,
  InvalidParamError,
} from "../../errors";
import { AddAccount } from "../../../domain/usecases/account/add-account";
import { Validation } from "../../helpers/validators/validation";
import { badRequest, ok } from "../../helpers/http-helper";

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

const makeValidation = () => {
  class ValidationSub implements Validation {
    validate(input: any) {
      return null;
    }
  }

  return new ValidationSub();
};

const makeSut = () => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();

  const sut = new SignUpController(
    emailValidatorStub,
    addAccountStub,
    validationStub,
  );

  return {
    sut,
    validationStub,
    addAccountStub,
    emailValidatorStub,
  };
};

describe("SignUp Controller", () => {
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
    const { emailValidatorStub, addAccountStub, validationStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new ServerError();
    });

    const sut = new SignUpController(
      emailValidatorStub,
      addAccountStub,
      validationStub,
    );

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

    expect(httpResponse).toEqual(
      ok({
        id: "1",
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      }),
    );
  });

  test("Should call Validation with correct value", async () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, "validate");

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const request = makeFakeRequest();

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field")),
    );
  });
});
