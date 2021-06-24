import { MongoHelper } from "../helpers/mongo-helper";
import { SaveSurveyResultRepository } from "@/data/protocols/database/survey-result/save-survey-result-repository";
import { SurveyResultModel } from "@/domain/models/survey";
import { SaveSurveyResultModel } from "@/domain/usecases/survey-result/save-survey-result";

class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection(
      "surveyResults",
    );

    const res = await surveyResultCollection.findOneAndUpdate(
      {
        surveyId: data.surveyId,
        accountId: data.accountId,
      },
      { $set: { answer: data.answer, date: data.date } },
      { upsert: true, returnOriginal: false },
    );

    return MongoHelper.mapModelToId(res.value);
  }
}

export { SurveyResultMongoRepository };
