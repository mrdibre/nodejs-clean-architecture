import { HttpRequest } from "../../protocols";
import { AccessDeniedError } from "../../errors";
import { forbidden, ok, serverError } from "../../helpers/http/http-helper";
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

const makeSut = (role?: string) => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);

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
    const role = "any_role";

    const { sut, loadAccountByTokenStub } = makeSut(role);

    const loadSpy = jest.spyOn(loadAccountByTokenStub, "load");

    const request = makeFakeHttpRequest();

    await sut.handle(request);

    expect(loadSpy).toHaveBeenCalledWith(
      request.headers["x-access-token"],
      role,
    );
  });

  test("Should return 403 if LoadAccountByToken returns null", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenStub, "load")
      .mockReturnValueOnce(Promise.resolve(null));

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("Should return 200 if LoadAccountByToken returns an auth", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(ok({ accountId: "any_id" }));
  });

  test("Should return 500 if LoadAccountByToken throws", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenStub, "load")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle(makeFakeHttpRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
