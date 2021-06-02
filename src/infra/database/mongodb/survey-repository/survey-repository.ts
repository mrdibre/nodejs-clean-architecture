import { MongoHelper } from "../helpers/mongo-helper";
import { AddSurveyModel } from "../../../../domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "../../../../data/protocols/database/survey/add-survey-repository";
import { LoadSurveysRepository } from "../../../../data/protocols/database/survey/load-surveys-repository";
import { SurveyModel } from "../../../../domain/models/survey";

class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository {
  async add(surveyModel: AddSurveyModel): Promise<void> {
    const accountCollection = await MongoHelper.getCollection("surveys");

    await accountCollection.insertOne(surveyModel);

    return;
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    const surveys: SurveyModel[] = await surveyCollection.find().toArray();

    return surveys;
  }
}

export { SurveyMongoRepository };
