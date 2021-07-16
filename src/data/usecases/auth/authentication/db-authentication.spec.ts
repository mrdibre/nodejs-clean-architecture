import { DbAuthentication } from "./db-authentication";
import { AccountModel } from "@/domain/models/account";
import {
  HashComparer,
  Encrypter,
  UpdateAccessTokenRepository,
  LoadAccountByEmailRepository,
} from "@/data/protocols";
import { mockAccountModel } from "@/domain/test";

const makeFakeAuthentication = () => ({
  email: "any_email",
  password: "valid_password",
});

const makeLoadAccount = () => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return mockAccountModel();
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeHashComparer = () => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return true;
    }
  }

  return new HashComparerStub();
};

const makeTokenGenerator = () => {
  class TokenGeneratorStub implements Encrypter {
    async encrypt(id: string): Promise<string> {
      return "any_token";
    }
  }

  return new TokenGeneratorStub();
};

const makeUpdateAccessToken = () => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return;
    }
  }

  return new UpdateAccessTokenRepositoryStub();
};

const makeSut = () => {
  const hashCompareStub = makeHashComparer();
  const loadAccountByEmailRepository = makeLoadAccount();
  const tokenGeneratorStub = makeTokenGenerator();
  const updateAccessTokenRepositoryStub = makeUpdateAccessToken();

  const sut = new DbAuthentication(
    loadAccountByEmailRepository,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
  );

  return {
    sut,
    hashCompareStub,
    tokenGeneratorStub,
    loadAccountByEmailRepository,
    updateAccessTokenRepositoryStub,
  };
};

describe("DbAuthentication UseCase", () => {
  test("Should call LoadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, "loadByEmail");

    await sut.auth(makeFakeAuthentication());

    expect(loadSpy).toHaveBeenCalledWith("any_email");
  });

  test("Should throw if LoadAccountByEmailRepository throws", async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepository, "loadByEmail")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test("Should call HashComparer with correct values", async () => {
    const { sut, hashCompareStub } = makeSut();

    const compareSpy = jest.spyOn(hashCompareStub, "compare");

    await sut.auth(makeFakeAuthentication());

    expect(compareSpy).toHaveBeenCalledWith("valid_password", "any_password");
  });

  test("Should throw if HashCompare throws", async () => {
    const { sut, hashCompareStub } = makeSut();

    jest
      .spyOn(hashCompareStub, "compare")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test("Should return null if HashComparer returns false", async () => {
    const { sut, hashCompareStub } = makeSut();

    jest
      .spyOn(hashCompareStub, "compare")
      .mockReturnValueOnce(Promise.resolve(false));

    const token = await sut.auth(makeFakeAuthentication());

    expect(token).toBeNull();
  });

  test("Should call Encrypter with correct values", async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    const generatorSpy = jest.spyOn(tokenGeneratorStub, "encrypt");

    await sut.auth(makeFakeAuthentication());

    expect(generatorSpy).toHaveBeenCalledWith("any_token");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    jest
      .spyOn(tokenGeneratorStub, "encrypt")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test("Should call Encrypter with correct id", async () => {
    const { sut } = makeSut();

    const accessToken = await sut.auth(makeFakeAuthentication());

    expect(accessToken).toBe("any_token");
  });

  test("Should call UpdateAccessTokenRepository with correct values", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      "updateAccessToken",
    );

    await sut.auth(makeFakeAuthentication());

    expect(updateSpy).toHaveBeenCalledWith("any_token", "any_token");
  });

  test("Should throw if UpdateAccessTokenRepository throws", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    jest
      .spyOn(updateAccessTokenRepositoryStub, "updateAccessToken")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(makeFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });
});
