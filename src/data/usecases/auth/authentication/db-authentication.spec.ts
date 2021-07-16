import { DbAuthentication } from "./db-authentication";
import {
  mockEncrypter,
  mockHashComparer,
  mockUpdateAccessToken,
  mockLoadAccountByEmailRepository,
} from "@/data/test";
import { mockFakeAuthentication } from "@/domain/test";

const makeSut = () => {
  const encrypterStub = mockEncrypter();
  const hashCompareStub = mockHashComparer();
  const updateAccessTokenRepositoryStub = mockUpdateAccessToken();
  const loadAccountByEmailRepository = mockLoadAccountByEmailRepository();

  const sut = new DbAuthentication(
    loadAccountByEmailRepository,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  );

  return {
    sut,
    encrypterStub,
    hashCompareStub,
    loadAccountByEmailRepository,
    updateAccessTokenRepositoryStub,
  };
};

describe("DbAuthentication UseCase", () => {
  test("Should call LoadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();

    const loadSpy = jest.spyOn(loadAccountByEmailRepository, "loadByEmail");

    await sut.auth(mockFakeAuthentication());

    expect(loadSpy).toHaveBeenCalledWith("any_email");
  });

  test("Should throw if LoadAccountByEmailRepository throws", async () => {
    const { sut, loadAccountByEmailRepository } = makeSut();

    jest
      .spyOn(loadAccountByEmailRepository, "loadByEmail")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(mockFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test("Should call HashComparer with correct values", async () => {
    const { sut, hashCompareStub } = makeSut();

    const compareSpy = jest.spyOn(hashCompareStub, "compare");

    await sut.auth(mockFakeAuthentication());

    expect(compareSpy).toHaveBeenCalledWith("valid_password", "any_password");
  });

  test("Should throw if HashCompare throws", async () => {
    const { sut, hashCompareStub } = makeSut();

    jest
      .spyOn(hashCompareStub, "compare")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(mockFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test("Should return null if HashComparer returns false", async () => {
    const { sut, hashCompareStub } = makeSut();

    jest
      .spyOn(hashCompareStub, "compare")
      .mockReturnValueOnce(Promise.resolve(false));

    const token = await sut.auth(mockFakeAuthentication());

    expect(token).toBeNull();
  });

  test("Should call Encrypter with correct values", async () => {
    const { sut, encrypterStub } = makeSut();

    const generatorSpy = jest.spyOn(encrypterStub, "encrypt");

    await sut.auth(mockFakeAuthentication());

    expect(generatorSpy).toHaveBeenCalledWith("any_token");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(mockFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });

  test("Should call Encrypter with correct id", async () => {
    const { sut } = makeSut();

    const accessToken = await sut.auth(mockFakeAuthentication());

    expect(accessToken).toBe("any_token");
  });

  test("Should call UpdateAccessTokenRepository with correct values", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      "updateAccessToken",
    );

    await sut.auth(mockFakeAuthentication());

    expect(updateSpy).toHaveBeenCalledWith("any_token", "any_token");
  });

  test("Should throw if UpdateAccessTokenRepository throws", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    jest
      .spyOn(updateAccessTokenRepositoryStub, "updateAccessToken")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.auth(mockFakeAuthentication());

    await expect(promise).rejects.toThrow();
  });
});
