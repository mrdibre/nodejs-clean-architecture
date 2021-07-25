import { hash } from "bcrypt";
import request from "supertest";
import { sign } from "jsonwebtoken";
import { Collection } from "mongodb";

import Env from "@/main/config/env";
import { app } from "@/main/config/app";
import { MongoHelper } from "@/infra/database/mongodb/helpers/mongo-helper";

let surveyCollection: Collection;
let accountCollection: Collection;

const makeToken = async () => {
  const password = await hash("123", 12);

  const { ops } = await accountCollection.insertOne({
    name: "César",
    role: "admin",
    email: "cesar.felp982@gmail.com",
    password,
  });
  const id = ops[0]._id;

  const token = sign({ id }, Env.jwtSecret);

  await accountCollection.updateOne({ _id: id }, { $set: { token } });

  return token;
};

describe("Survey Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(Env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    accountCollection = await MongoHelper.getCollection("accounts");

    await surveyCollection.deleteMany({});
    await accountCollection.deleteMany({});
  });

  describe("POST /survey", () => {
    test("Should return 403 on add survey without accessToken", async () => {
      await request(app)
        .post("/api/survey")
        .send({
          question: "any_question",
          answers: [
            {
              image: "http://image-name.com",
              answer: "Answer 1",
            },
            {
              answer: "Answer 2",
            },
          ],
        })
        .expect(403);
    });

    test("Should return 204 on add survey with valid accessToken", async () => {
      const token = await makeToken();

      await request(app)
        .post("/api/survey")
        .set("x-access-token", token)
        .send({
          question: "any_question",
          answers: [
            {
              image: "http://image-name.com",
              answer: "Answer 1",
            },
            {
              answer: "Answer 2",
            },
          ],
        })
        .expect(204);
    });
  });

  describe("GET /survey", () => {
    test("Should return 403 on loadAll surveys without accessToken", async () => {
      await request(app)
        .post("/api/survey")
        .send({
          question: "any_question",
          answers: [
            {
              image: "http://image-name.com",
              answer: "Answer 1",
            },
            {
              answer: "Answer 2",
            },
          ],
        })
        .expect(403);
    });

    test("Should return 204 on loadAll surveys with valid accessToken", async () => {
      const token = await makeToken();
      await surveyCollection.deleteMany({});

      await request(app)
        .get("/api/survey")
        .set("x-access-token", token)
        .expect(204);
    });
  });
});
