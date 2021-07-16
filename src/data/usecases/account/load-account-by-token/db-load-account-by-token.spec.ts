import { mockAccountModel } from "@/domain/test";
import { AccountModel } from "@/domain/models/account";
import { DbLoadAccountByToken } from "./db-load-account-by-token";
import { Decrypter } from "@/data/protocols/criptography/decrypter";
import { LoadAccountByTokenRepository } from "@/data/protocols/database/account/load-account-by-token-repository";

const makeDecrypter = () => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string) {
      return "any_value";
    }
  }

  return new DecrypterStub();
};

const makeLoadAccountByTokenRepository = () => {
  class LoadAccountByTokenRepositoryStub
    implements LoadAccountByTokenRepository {
    async loadByToken(value: string, role?: string): Promise<AccountModel> {
      return mockAccountModel();
    }
  }

  return new LoadAccountByTokenRepositoryStub();
};

const makeSut = () => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();

  const sut = new DbLoadAccountByToken(
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  );

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe("DbLoadAccountByToken Usecase", () => {
  test("Should call Decrypter with correct values", async () => {
    const { sut, decrypterStub } = makeSut();

    const decryptSpy = jest.spyOn(decrypterStub, "decrypt");

    await sut.load("any_token", "any_role");

    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });

  test("Should return null if Decrypter returns null", async () => {
    const { sut, decrypterStub } = makeSut();

    jest
      .spyOn(decrypterStub, "decrypt")
      .mockReturnValueOnce(Promise.resolve(null));

    const account = await sut.load("any_token", "any_role");

    expect(account).toBeNull();
  });

  test("Should call LoadAccountByTokenRepository with correct values", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, "loadByToken");

    await sut.load("any_token", "any_role");

    expect(loadSpy).toHaveBeenCalledWith("any_token", "any_role");
  });

  test("Should return null if LoadAccountByTokenRepository returns null", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadByToken")
      .mockReturnValueOnce(Promise.resolve(null));

    const account = await sut.load("any_token", "any_role");

    expect(account).toBeNull();
  });

  test("Should return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.load("any_token", "any_role");

    expect(account).toEqual(mockAccountModel());
  });

  test("Should throw if Decrypter throws", async () => {
    const { sut, decrypterStub } = makeSut();

    jest
      .spyOn(decrypterStub, "decrypt")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.load("any_token", "any_role");

    await expect(promise).rejects.toThrow();
  });

  test("Should throw if LoadAccountByTokenRepository throws", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadByToken")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.load("any_token", "any_role");

    await expect(promise).rejects.toThrow();
  });
});
