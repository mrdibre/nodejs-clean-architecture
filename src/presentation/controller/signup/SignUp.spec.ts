import { SignUpController } from "./SignUp";
import { MissingParamError } from "../../errors/missing-param-error";

describe("SignUp Controller", () => {
  test("Should return 400 if no name is provided", () => {
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
    const sut = new SignUpController();

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
});
