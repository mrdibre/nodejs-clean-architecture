import { DbAddSurvey } from "@/data/usecases/survey/add-survey/db-add-survey/db-add-survey";
import { SurveyMongoRepository } from "@/infra/database/mongodb/survey-repository/survey-repository";

const makeDbAddSurvey = () => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};

export { makeDbAddSurvey };
