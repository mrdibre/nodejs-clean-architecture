import { HttpRequest } from "../../protocols";
import { AccessDeniedError } from "../../errors";
import { forbidden } from "../../helpers/http/http-helper";
import { AuthMiddleware } from "./auth-middleware";
import { LoadAccountByToken } from "../../../domain/usecases/account/load-account-by-token";
import { AccountModel } from "../../../domain/models/account";

const makeFakeHttpRequest = (): HttpRequest => ({
  headers: {
    "x-access-token": "any_token",
  },
});

const makeFakeAccount = (): AccountModel => ({
  id: "any_id",
  name: "any_name",
  email: "any_email",
  password: "any_password",
});

const makeLoadAccountByToken = () => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(token: string): Promise<AccountModel> {
      return makeFakeAccount();
    }
  }

  return new LoadAccountByTokenStub();
};

const makeSut = () => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);

  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe("Auth Middleware", () => {
  test("Should return 403 if no x-access-token exists on headers", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("Should call LoadAccountByToken with correct accessToken", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByTokenStub, "load");

    const request = makeFakeHttpRequest();

    await sut.handle(request);

    expect(loadSpy).toHaveBeenCalledWith(request.headers["x-access-token"]);
  });
});
