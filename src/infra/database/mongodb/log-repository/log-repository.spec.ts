import { MongoHelper } from "../helpers/mongo-helper";

describe("Log Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection("errors");

    await accountCollection.deleteMany({});
  });
});
