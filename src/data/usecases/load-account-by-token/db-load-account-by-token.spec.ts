import { Decrypter } from "../../protocols/criptography/decrypter";
import { DbLoadAccountByToken } from "./db-load-account-by-token";

const makeDecrypter = () => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string) {
      return "any_value";
    }
  }

  return new DecrypterStub();
};

const makeSut = () => {
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);

  return {
    sut,
    decrypterStub,
  };
};

describe("DbLoadAccountByToken Usecase", () => {
  test("Should call Decrypter with correct values", async () => {
    const { sut, decrypterStub } = makeSut();

    const decryptSpy = jest.spyOn(decrypterStub, "decrypt");

    await sut.load("any_token");

    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });
});
