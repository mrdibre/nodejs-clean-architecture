import { HttpRequest } from "../../protocols";
import { AccessDeniedError } from "../../errors";
import { forbidden } from "../../helpers/http/http-helper";
import { AuthMiddleware } from "./auth-middleware";

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: {
    "x-access-token": "any_token",
  },
});

const makeSut = () => {
  const sut = new AuthMiddleware();

  return {
    sut,
  };
};

describe("Auth Middleware", () => {
  test("Should return 403 if no x-access-token exists on headers", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});
