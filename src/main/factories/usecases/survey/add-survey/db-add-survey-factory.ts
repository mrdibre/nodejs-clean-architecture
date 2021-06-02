import { SurveyMongoRepository } from "../../../../../infra/database/mongodb/survey-repository/survey-repository";
import { DbAddSurvey } from "../../../../../data/usecases/add-survey/db-add-survey/db-add-survey";

const makeDbAddSurvey = () => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};

export { makeDbAddSurvey };
