import { SignUpController } from "./signup-controller";
import { HttpRequest } from "../../protocols";
import { ServerError, MissingParamError } from "../../errors";
import { AddAccount } from "../../../domain/usecases/account/add-account";
import { Validation } from "../../protocols/validation";
import { badRequest, ok } from "../../helpers/http/http-helper";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any@email.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

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
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();

  const sut = new SignUpController(addAccountStub, validationStub);

  return {
    sut,
    validationStub,
    addAccountStub,
  };
};

describe("SignUp Controller", () => {
  test("Should return 500 if AddAccount throws", async () => {
    const { addAccountStub, validationStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new ServerError();
    });

    const sut = new SignUpController(addAccountStub, validationStub);

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
