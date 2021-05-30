import { MongoHelper } from "../helpers/mongo-helper";
import { AddSurveyModel } from "../../../../domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "../../../../data/protocols/database/survey/add-survey-repository";

class SurveyMongoRepository implements AddSurveyRepository {
  async add(surveyModel: AddSurveyModel): Promise<void> {
    const accountCollection = await MongoHelper.getCollection("surveys");

    await accountCollection.insertOne(surveyModel);

    return;
  }
}

export { SurveyMongoRepository };
