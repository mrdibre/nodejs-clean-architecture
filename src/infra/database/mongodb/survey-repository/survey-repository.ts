import { MongoHelper } from "../helpers/mongo-helper";
import { SurveyModel } from "@/domain/models/survey";
import { AddSurveyModel } from "@/domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "@/data/protocols/database/survey/add-survey-repository";
import { LoadSurveysRepository } from "@/data/protocols/database/survey/load-surveys-repository";
import { LoadSurveyByIdRepository } from "@/data/protocols/database/survey/load-survey-by-id-repository";

class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository {
  async add(surveyModel: AddSurveyModel): Promise<void> {
    const accountCollection = await MongoHelper.getCollection("surveys");

    const survey = await accountCollection.insertOne(surveyModel);

    return MongoHelper.mapModelToId(survey);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection("surveys");

    const surveys = await surveyCollection.find().toArray();

    return MongoHelper.mapModelsToId(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection("surveys");

    const survey = await surveyCollection.findOne({ _id: id });

    return MongoHelper.mapModelToId(survey);
  }
}

export { SurveyMongoRepository };
