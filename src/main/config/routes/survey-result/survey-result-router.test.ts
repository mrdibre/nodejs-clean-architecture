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

  describe("PUT /surveys/:surveyId/results", () => {
    test("Should return 403 on save survey result without accessToken", async () => {
      await request(app)
        .put("/api/surveys/any_id/results")
        .send({
          answer: "any_answer",
        })
        .expect(403);
    });
  });
});
