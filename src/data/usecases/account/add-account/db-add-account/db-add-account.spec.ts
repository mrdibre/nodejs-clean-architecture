import { DbAddAccount } from "./db-add-account";
import { mockAccountModel, mockAddAccountParams } from "@/domain/test";
import {
  mockHasher,
  mockAddAccountRepository,
  mockLoadAccountByEmailRepository,
} from "@/data/test";

const makeSut = () => {
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  jest
    .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
    .mockReturnValue(Promise.resolve(null));

  const sut = new DbAddAccount(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  );

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe("DbAddAccount UseCase", () => {
  test("Should Call Encrypter with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, "hash");

    await sut.add(mockAddAccountParams());

    expect(hashSpy).toHaveBeenCalledWith("any_password");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, hasherStub } = makeSut();

    jest
      .spyOn(hasherStub, "hash")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow();
  });

  test("Should Call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

    const params = mockAddAccountParams();

    await sut.add(params);

    expect(addSpy).toHaveBeenCalledWith({
      ...params,
      password: "hashed_password",
    });
  });

  test("Should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAddAccountParams());

    await expect(promise).rejects.toThrow();
  });

  test("Should return an account on success", async () => {
    const { sut } = makeSut();

    const params = mockAddAccountParams();

    const account = await sut.add(params);

    expect(account).toEqual({
      ...params,
      id: "any_token",
      password: "any_password",
    });
  });

  test("Should call LoadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "loadByEmail");

    await sut.add(mockAddAccountParams());

    expect(loadSpy).toHaveBeenCalledWith("any_email");
  });

  test("Should return null if LoadAccountByEmailRepository not return null", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
      .mockReturnValueOnce(Promise.resolve(mockAccountModel()));

    const account = await sut.add(mockAddAccountParams());

    expect(account).toBeNull();
  });
});
