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

  describe("PUT /surveys/:surveyId/results", () => {
    test("Should return 403 on save survey result without accessToken", async () => {
      await request(app)
        .put("/api/surveys/any_id/results")
        .send({
          answer: "any_answer",
        })
        .expect(403);
    });

    test("Should return 200 on save survey result with valid accessToken", async () => {
      const token = await makeToken();

      const res = await surveyCollection.insertOne({
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
      });

      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set("x-access-token", token)
        .send({
          answer: "Answer 1",
        })
        .expect(200);
    });
  });
});
