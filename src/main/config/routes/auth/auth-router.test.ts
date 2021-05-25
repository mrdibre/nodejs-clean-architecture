import request from "supertest";
import Env from "../../env";
import { app } from "../../app";
import { MongoHelper } from "../../../../infra/database/mongodb/helpers/mongo-helper";

describe("Auth Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(Env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("account");

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
});
