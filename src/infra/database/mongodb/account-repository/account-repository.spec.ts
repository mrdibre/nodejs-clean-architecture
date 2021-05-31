import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account-repository";
import { Collection } from "mongodb";

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

      const account = await sut.add({
        name: "any_name",
        email: "any_email@gmail.com",
        password: "any_password",
      });

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@gmail.com");
      expect(account.password).toBe("any_password");
    });
  });

  describe("loadByEmail()", () => {
    test("Should return an account on loadByEmail success", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      });

      const account = await sut.loadByEmail("any_email@mail.com");

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return null if loadByEmail fails", async () => {
      const { sut } = makeSut();

      const account = await sut.loadByEmail("any_email@mail.com");

      expect(account).toBeFalsy();
    });
  });

  describe("loadByToken()", () => {
    test("Should return an account on loadByToken without role", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        token: "any_token",
      });

      const account = await sut.loadByToken("any_token");

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Should return an account on loadByToken with role", async () => {
      const { sut } = makeSut();

      await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        token: "any_token",
        role: "any_role",
      });

      const account = await sut.loadByToken("any_token", "any_role");

      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
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
      } = await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      });

      expect(fakeAccount.accessToken).toBeFalsy();

      await sut.updateAccessToken(fakeAccount._id, "any_token");

      const account = await accountCollection.findOne({ _id: fakeAccount._id });

      expect(account).toBeTruthy();
      expect(account.accessToken).toBe("any_token");
    });
  });
});
