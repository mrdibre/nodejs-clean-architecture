import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash() {
    return "hash";
  },
  async compare() {
    return true;
  },
}));

const makeSut = () => {
  const sut = new BcryptAdapter(12);

  return {
    sut,
  };
};

describe("BCrypt Adapter", () => {
  test("Should call hash with correct value", async () => {
    const hashSpy = jest.spyOn(bcrypt, "hash");

    const { sut } = makeSut();

    await sut.hash("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
  });

  test("Should return a valid hash on hash success", async () => {
    const { sut } = makeSut();

    const hash = await sut.hash("any_value");

    expect(hash).toBe("hash");
  });

  test("Should throw if hash throws", async () => {
    const { sut } = makeSut();

    jest.spyOn(bcrypt, "hash").mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.hash("any_value");

    await expect(promise).rejects.toThrow();
  });

  test("Should call compare with correct value", async () => {
    const hashSpy = jest.spyOn(bcrypt, "compare");

    const { sut } = makeSut();

    await sut.compare("any_value", "any_hash");

    expect(hashSpy).toHaveBeenCalledWith("any_value", "any_hash");
  });

  test("Should return true on compare success", async () => {
    const { sut } = makeSut();

    const hash = await sut.compare("any_value", "any_hash");

    expect(hash).toBe(true);
  });

  test("Should throw if hash throws", async () => {
    const { sut } = makeSut();

    jest
      .spyOn(bcrypt, "compare")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.compare("any_value", "any_hash");

    await expect(promise).rejects.toThrow();
  });
});
