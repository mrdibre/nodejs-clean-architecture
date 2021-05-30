import { makeAddSurveyValidation } from "./add-survey--validation";
import { makeLogControllerDecoratorFactory } from "../../../decorators/log-controller-decorator-factory";
import { AddSurveyController } from "../../../../../presentation/controller/survey/add-survey/add-survey-controller";
import { makeDbAddSurvey } from "./db-add-survey-factory";

const makeAddSurveyController = () => {
  const addSurveyController = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );

  return makeLogControllerDecoratorFactory(addSurveyController);
};

export { makeAddSurveyController };
