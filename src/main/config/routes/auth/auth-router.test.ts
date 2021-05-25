import { hash } from "bcrypt";
import request from "supertest";
import { Collection } from "mongodb";
import Env from "../../env";
import { app } from "../../app";
import { MongoHelper } from "../../../../infra/database/mongodb/helpers/mongo-helper";

let accountCollection: Collection;

describe("Auth Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(Env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection("account");

    await accountCollection.deleteMany({});
  });

  describe("POST /signup", () => {
    test("Should return 200 on signup", async () => {
      await request(app)
        .post("/api/signup")
        .send({
          name: "César",
          email: "cesar.felp982@gmail.com",
          password: "123",
          passwordConfirmation: "123",
        })
        .expect(200);
    });
  });

  describe("POST /login", () => {
    test("Should return 200 on login", async () => {
      const password = await hash("123", 12);

      await accountCollection.insertOne({
        name: "César",
        email: "cesar.felp982@gmail.com",
        password,
      });

      await request(app)
        .post("/api/login")
        .send({
          email: "cesar.felp982@gmail.com",
          password: "123",
        })
        .expect(200);
    });

    test("Should return 401 on login", async () => {
      await request(app)
        .post("/api/login")
        .send({
          email: "cesar.felp982@gmail.com",
          password: "12345",
        })
        .expect(401);
    });
  });
});