import { SignUpController } from "./SignUp";

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
  });
});
