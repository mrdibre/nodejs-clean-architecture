import { DbAddAccount } from "./db-add-account";
import { Encrypter } from "../../../protocols/criptography/encrypter";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountRepository } from "../../../protocols/database/add-account-repository";
import { AddAccountModel } from "../../../../domain/usecases/account/add-account";

const makeSut = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string) {
      return "hashed_password";
    }
  }
  const encrypterStub = new EncrypterStub();

  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: "hashed_password",
      };

      return Promise.resolve(fakeAccount);
    }
  }
  const addAccountRepositoryStub = new AddAccountRepositoryStub();

  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe("DbAddAccount UseCase", () => {
  test("Should Call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });

  test("Should Call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      ...accountData,
      password: "hashed_password",
    });
  });

  test("Should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const promise = sut.add(accountData);

    await expect(promise).rejects.toThrow();
  });

  test("Should return an account on success", async () => {
    const { sut } = makeSut();

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const account = await sut.add(accountData);

    expect(account).toEqual({
      ...accountData,
      id: "valid_id",
      password: "hashed_password",
    });
  });
});
