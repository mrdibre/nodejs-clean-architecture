import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash() {
    return "hash";
  },
}));

const makeSut = () => {
  const sut = new BcryptAdapter(12);

  return {
    sut,
  };
};

describe("BCrypt Adapter", () => {
  test("Should call bcrypt with correct value", async () => {
    const hashSpy = jest.spyOn(bcrypt, "hash");

    const { sut } = makeSut();

    await sut.encrypt("any_value");

    expect(hashSpy).toHaveBeenCalledWith("any_value", 12);
  });

  test("Should return a hash on success", async () => {
    const { sut } = makeSut();

    const hash = await sut.encrypt("any_value");

    expect(hash).toBe("hash");
  });

  test("Should throw if bcrypt throws", async () => {
    const { sut } = makeSut();

    jest.spyOn(bcrypt, "hash").mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.encrypt("any_value");

    await expect(promise).rejects.toThrow();
  });
});
