import jwt from "jsonwebtoken";
import { JwtAdapter } from "./jwt-adapter";

jest.mock("jsonwebtoken", () => ({
  async sign() {
    return "any_token";
  },
  async verify() {
    return "any_value";
  },
}));

const makeSut = () => {
  const sut = new JwtAdapter("secret");

  return {
    sut,
  };
};

describe("JWT Adapter", () => {
  describe("sign()", () => {
    test("Should call sign with correct values", async () => {
      const { sut } = makeSut();

      const signSpy = jest.spyOn(jwt, "sign");

      await sut.encrypt("any_id");

      expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
    });

    test("Should return a token on sign success", async () => {
      const { sut } = makeSut();

      const token = await sut.encrypt("any_id");

      expect(token).toBe("any_token");
    });

    test("Should throw if sign throws", async () => {
      const { sut } = makeSut();

      jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
        throw new Error();
      });

      const token = sut.encrypt("any_id");

      await expect(token).rejects.toThrow();
    });
  });

  describe("verify()", () => {
    test("Should call verify with correct values", async () => {
      const { sut } = makeSut();

      const verifySpy = jest.spyOn(jwt, "verify");

      await sut.decrypt("any_token");

      expect(verifySpy).toHaveBeenCalledWith("any_token", "secret");
    });

    test("Should return a value on verify success", async () => {
      const { sut } = makeSut();

      const token = await sut.decrypt("any_token");

      expect(token).toBe("any_value");
    });

    test("Should throw if verify throws", async () => {
      const { sut } = makeSut();

      jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
        throw new Error();
      });

      const token = sut.decrypt("any_token");

      await expect(token).rejects.toThrow();
    });
  });
});
