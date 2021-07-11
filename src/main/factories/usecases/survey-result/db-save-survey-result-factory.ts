import { SaveSurveyResult } from "@/domain/usecases/survey-result/save-survey-result";
import { SurveyResultMongoRepository } from "@/infra/database/mongodb/survey-result-repository/survey-result-repository";
import { DbSaveSurveyResult } from "@/data/usecases/survey-result/save-survey-result/db-save-survey-result/db-save-survey-result";

const makeSaveSurveyResult = (): SaveSurveyResult => {
  const surveyMongoRepository = new SurveyResultMongoRepository();

  return new DbSaveSurveyResult(surveyMongoRepository);
};

export { makeSaveSurveyResult };
