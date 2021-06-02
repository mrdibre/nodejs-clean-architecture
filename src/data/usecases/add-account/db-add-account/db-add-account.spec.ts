import { DbAddAccount } from "./db-add-account";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/account/add-account";
import {
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
} from "../../../protocols";

const makeFakeAccount = () => ({
  id: "any_id",
  name: "any_name",
  password: "hashed_password",
  email: "any_email@mail.com",
});

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

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    await sut.add(accountData);

    expect(hashSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "hash")
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

  test("Should return an auth on success", async () => {
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

  test("Should call LoadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "loadByEmail");

    const accountData = {
      name: "valid_name",
      email: "any_email@mail.com",
      password: "valid_password",
    };

    await sut.add(accountData);

    expect(loadSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should return null if LoadAccountByEmailRepository not return null", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
      .mockReturnValueOnce(Promise.resolve(makeFakeAccount()));

    const accountData = {
      name: "valid_name",
      email: "any_email@mail.com",
      password: "valid_password",
    };

    const account = await sut.add(accountData);

    expect(account).toBeNull();
  });
});
