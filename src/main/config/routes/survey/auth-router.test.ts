import request from "supertest";
import { Collection } from "mongodb";
import Env from "../../env";
import { app } from "../../app";
import { MongoHelper } from "../../../../infra/database/mongodb/helpers/mongo-helper";

let surveyCollection: Collection;

describe("Survey Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(Env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");

    await surveyCollection.deleteMany({});
  });

  describe("POST /survey", () => {
    test("Should return 204 on add survey success", async () => {
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
        .expect(204);
    });
  });
});
