import { LogControllerDecorator } from "./log";
import { Controller } from "../../../presentation/protocols";
import { serverError } from "../../../presentation/helpers/http/http-helper";
import { LogErrorRepository } from "../../../data/protocols/log-error-repository";

const makeFakeRequest = () => ({
  body: {
    email: "any@gmail.com",
    name: "any_email",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const makeLogErrorRepository = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
      return;
    }
  }

  return new LogErrorRepositoryStub();
};

const makeControllerStub = () => {
  class ControllerStub implements Controller {
    async handle() {
      return {
        statusCode: 200,
        body: {
          name: "any_name",
        },
      };
    }
  }

  return new ControllerStub();
};

const makeSut = () => {
  const controllerStub = makeControllerStub();
  const logErrorRepositoryStub = makeLogErrorRepository();

  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub,
  );

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe("LogController decorator", () => {
  test("Should call controller handle", async () => {
    const { sut, controllerStub } = makeSut();

    const handleSpy = jest.spyOn(controllerStub, "handle");

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test("Should return the same result of the controller", async () => {
    const { sut } = makeSut();

    const httpRequest = makeFakeRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: "any_name",
      },
    });
  });

  test("Should call LogErrorRepository with correct error if controller returns a server error", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = "any_stack";

    const error = serverError(fakeError);

    jest
      .spyOn(controllerStub, "handle")
      .mockReturnValueOnce(new Promise(resolve => resolve(error)));

    const logSpy = jest.spyOn(logErrorRepositoryStub, "logError");

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(logSpy).toHaveBeenCalledWith(fakeError.stack);
  });
});
