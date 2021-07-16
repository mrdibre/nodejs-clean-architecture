import { DbAddAccount } from "./db-add-account";
import { AccountModel } from "@/domain/models/account";
import { AddAccountParams } from "@/domain/usecases/account/add-account";
import {
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from "@/data/protocols";
import { mockAccountModel, mockAddAccountParams } from "@/domain/test";

const makeLoadAccount = () => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return null;
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeEncrypterStub = () => {
  class EncrypterStub implements Hasher {
    async hash(value: string) {
      return "hashed_password";
    }
  }

  return new EncrypterStub();
};

const makeAddAccountRepositoryStub = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new AddAccountRepositoryStub();
};

const makeSut = () => {
  const encrypterStub = makeEncrypterStub();
  const loadAccountByEmailRepositoryStub = makeLoadAccount();
  const addAccountRepositoryStub = makeAddAccountRepositoryStub();

  const sut = new DbAddAccount(
    encrypterStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  );

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe("DbAddAccount UseCase", () => {
  test("Should Call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const hashSpy = jest.spyOn(encrypterStub, "hash");

    await sut.add(mockAddAccountParams());

    expect(hashSpy).toHaveBeenCalledWith("any_password");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "hash")
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
