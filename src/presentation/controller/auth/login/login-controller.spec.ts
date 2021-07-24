import { LoginController } from "./login-controller";
import { MissingParamError } from "@/presentation/errors";
import {
  ok,
  badRequest,
  serverError,
  unauthorized,
} from "@/presentation/helpers/http/http-helper";
import { mockAuthentication, mockValidation } from "@/presentation/test";

const mockRequest = () => ({
  body: {
    email: "any_email",
    password: "any_password",
  },
});

const makeSut = () => {
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();

  const sut = new LoginController(authenticationStub, validationStub);

  return {
    sut,
    authenticationStub,
    validationStub,
  };
};

describe("Login Controller", () => {
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

  test("Should return 401 if an invalid credentials are provided", async () => {
    const { sut, authenticationStub } = makeSut();

    jest
      .spyOn(authenticationStub, "auth")
      .mockReturnValueOnce(new Promise(resolve => resolve(null)));

    const httpRequest = mockRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(unauthorized());
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

  test("Should return 200 if valid credentials are provided", async () => {
    const { sut } = makeSut();

    const httpRequest = mockRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(ok({ token: "any_token" }));
  });

  test("Should call Validation with correct value", async () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, "validate");

    const httpRequest = mockRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
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
});
