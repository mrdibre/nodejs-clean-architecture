import { SurveyMongoRepository } from "../../../../../infra/database/mongodb/survey-repository/survey-repository";
import { LoadSurveys } from "../../../../../domain/usecases/survey/load-surveys";
import { DbLoadSurveys } from "../../../../../data/usecases/load-surveys/db-load-surveys/db-load-surveys";

const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbLoadSurveys(surveyMongoRepository);
};

export { makeDbLoadSurveys };
