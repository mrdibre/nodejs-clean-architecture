import { LogControllerDecorator } from "./log";
import { Controller } from "../../../presentation/protocols";

const makeSut = () => {
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

  const controllerStub = new ControllerStub();

  const sut = new LogControllerDecorator(controllerStub);

  return {
    sut,
    controllerStub,
  };
};

describe("LogController decorator", () => {
  test("Should call controller handle", async () => {
    const { sut, controllerStub } = makeSut();

    const handleSpy = jest.spyOn(controllerStub, "handle");

    const httpRequest = {
      body: {
        email: "any@gmail.com",
        name: "any_email",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test("Should return the same result of the controller", async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any@gmail.com",
        name: "any_email",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: "any_name",
      },
    });
  });
});
