import { SurveyMongoRepository } from "@/infra/database/mongodb/survey-repository/survey-repository";
import { LoadSurveyById } from "@/domain/usecases/survey/load-survey-by-id";
import { DbLoadSurveyById } from "@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id/db-load-survey-by-id";

const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveyById(surveyMongoRepository);
};

export { makeDbLoadSurveyById };
