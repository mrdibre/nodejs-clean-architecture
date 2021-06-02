import { makeAddSurveyValidation } from "./add-survey-validation";
import { makeDbAddSurvey } from "@/main/factories/usecases/survey/add-survey/db-add-survey-factory";
import { AddSurveyController } from "@/presentation/controller/survey/add-survey/add-survey-controller";
import { makeLogControllerDecoratorFactory } from "@/main/factories/decorators/log-controller-decorator-factory";

const makeAddSurveyController = () => {
  const addSurveyController = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey(),
  );

  return makeLogControllerDecoratorFactory(addSurveyController);
};

export { makeAddSurveyController };
