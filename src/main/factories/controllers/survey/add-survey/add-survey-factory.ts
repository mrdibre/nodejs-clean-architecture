import { makeAddSurveyValidation } from "./add-survey--validation";
import { makeLogControllerDecoratorFactory } from "../../../decorators/log-controller-decorator-factory";
import { SurveyMongoRepository } from "../../../../../infra/database/mongodb/survey-repository/survey-repository";
import { AddSurveyController } from "../../../../../presentation/controller/survey/add-survey/add-survey-controller";

const makeAddSurveyController = () => {
  const addSurveyRepository = new SurveyMongoRepository();

  const addSurveyController = new AddSurveyController(
    makeAddSurveyValidation(),
    addSurveyRepository,
  );

  return makeLogControllerDecoratorFactory(addSurveyController);
};

export { makeAddSurveyController };
