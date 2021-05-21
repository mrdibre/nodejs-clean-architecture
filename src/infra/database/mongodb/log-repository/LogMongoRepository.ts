import { MongoHelper } from "../helpers/mongo-helper";
import { LogErrorRepository } from "../../../../data/protocols/log-error-repository";

class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string) {
    const errorCollection = await MongoHelper.getCollection("errors");

    await errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}

export { LogMongoRepository };
