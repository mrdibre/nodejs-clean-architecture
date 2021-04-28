import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

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
});
