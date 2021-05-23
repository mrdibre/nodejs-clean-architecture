import { AccountModel } from "../../../domain/models/account";
import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email-repository";
import { DbAuthentication } from "./db-authentication";

const makeFakeAccount = () => ({
  id: "any_id",
  name: "any_name",
  password: "any_password",
  email: "any_email@mail.com",
});

const makeFakeAuthentication = () => ({
  email: "any_email@mail.com",
  password: "any_password",
});

const makeLoadAccount = () => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return makeFakeAccount();
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeSut = () => {
  const loadAccountByEmailRepository = makeLoadAccount();
  const sut = new DbAuthentication(loadAccountByEmailRepository);

  return {
    sut,
    loadAccountByEmailRepository,
  };
};

describe("DbAuthentication UseCase", () => {
  test("Should call LoadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, "load");

    await sut.auth(makeFakeAuthentication());

    expect(loadSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should throw if LoadAccountByEmailRepository throws", async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepository, "load")
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });
});
