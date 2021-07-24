import { SignUpController } from "./signup-controller";
import { HttpRequest } from "@/presentation/protocols";
import {
  ServerError,
  EmailInUseError,
  MissingParamError,
} from "@/presentation/errors";
import {
  ok,
  forbidden,
  badRequest,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import {
  mockAccount,
  mockValidation,
  mockAuthentication,
} from "@/presentation/test";

const mockRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any@email.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const makeSut = () => {
  const addAccountStub = mockAccount();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();

  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub,
  );

  return {
    sut,
    validationStub,
    addAccountStub,
    authenticationStub,
  };
};

describe("SignUp Controller", () => {
  test("Should call Authentication with correct values", async () => {
    const { sut, authenticationStub } = makeSut();

    const authSpy = jest.spyOn(authenticationStub, "auth");

    const httpRequest = mockRequest();

    await sut.handle(httpRequest);

    expect(authSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });

  test("Should return 500 if AddSurvey throws", async () => {
    const { addAccountStub, validationStub, authenticationStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
      throw new ServerError();
    });

    const sut = new SignUpController(
      addAccountStub,
      validationStub,
      authenticationStub,
    );

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test("Should call AddSurvey with correct values", async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, "add");

    await sut.handle(mockRequest());

    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any@email.com",
      password: "any_password",
    });
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();

    const request = mockRequest();

    const httpResponse = await sut.handle(request);

    expect(httpResponse.statusCode).toBe(200);

    expect(httpResponse).toEqual(ok({ token: "any_token" }));
  });

  test("Should return 403 if AddSurvey returns null", async () => {
    const { sut, addAccountStub } = makeSut();

    jest
      .spyOn(addAccountStub, "add")
      .mockReturnValueOnce(Promise.resolve(null));

    const request = mockRequest();

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  test("Should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const request = mockRequest();

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field")),
    );
  });

  test("Should call Validation with correct value", async () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, "validate");

    const httpRequest = mockRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 500 if Authentication throws", async () => {
    const { sut, authenticationStub } = makeSut();

    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const httpRequest = mockRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
