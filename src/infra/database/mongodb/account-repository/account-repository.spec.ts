import { Collection } from "mongodb";
import { mockAddAccountParams } from "@/domain/test";
import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account-repository";

const makeSut = () => {
  const sut = new AccountMongoRepository();

  return { sut };
};

let accountCollection: Collection;

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("accounts");

    await accountCollection.deleteMany({});
  });

  describe("add()", () => {
    test("Should return an account on add success", async () => {
      const { sut } = makeSut();

      const account = await sut.add(mockAddAccountParams());

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email");
      expect(account.password).toBe("any_password");
    });
  });

  describe("loadByEmail()", () => {
    test("Should return an account on loadByEmail success", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne(mockAddAccountParams());

      const account = await sut.loadByEmail("any_email");

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email");
      expect(account.password).toBe("any_password");
    });

    test("Should return null if loadByEmail fails", async () => {
      const { sut } = makeSut();

      const account = await sut.loadByEmail("any_email");

      expect(account).toBeFalsy();
    });
  });

  describe("loadByToken()", () => {
    test("Should return an account on loadByToken without role", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        token: "any_token",
      });

      const account = await sut.loadByToken("any_token");

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email");
      expect(account.password).toBe("any_password");
    });

    test("Should return an account on loadByToken with admin role", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        token: "any_token",
        role: "admin",
      });

      const account = await sut.loadByToken("any_token", "admin");

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email");
      expect(account.password).toBe("any_password");
    });

    test("Should return null on loadByToken with invalid role", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        token: "any_token",
        role: "any_token",
      });

      const account = await sut.loadByToken("any_token", "admin");

      expect(account).toBeFalsy();
    });

    test("Should return an account on loadByToken if user is admin", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne({
        ...mockAddAccountParams(),
        token: "any_token",
        role: "admin",
      });

      const account = await sut.loadByToken("any_token");

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email");
      expect(account.password).toBe("any_password");
    });

    test("Should return null if loadByToken fails", async () => {
      const { sut } = makeSut();

      const account = await sut.loadByToken("any_token");

      expect(account).toBeFalsy();
    });
  });

  describe("updateAccessToken()", () => {
    test("Should update account accessToken on updateAccessTokenSuccess", async () => {
      const { sut } = makeSut();

      const {
        ops: [fakeAccount],
      } = await accountCollection.insertOne(mockAddAccountParams());

      expect(fakeAccount.token).toBeFalsy();

      await sut.updateAccessToken(fakeAccount._id, "any_token");

      const account = await accountCollection.findOne({ _id: fakeAccount._id });

      expect(account).toBeTruthy();
      expect(account.token).toBe("any_token");
    });
  });
});
