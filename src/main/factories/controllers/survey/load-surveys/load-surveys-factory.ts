import { makeLogControllerDecoratorFactory } from "../../../decorators/log-controller-decorator-factory";
import { LoadSurveysController } from "../../../../../presentation/controller/survey/load-surveys/load-surveys-controller";
import { makeDbLoadSurveys } from "../../../usecases/survey/load-surveys/db-load-surveys-factory";

const makeLoadSurveysController = () => {
  const addSurveyController = new LoadSurveysController(makeDbLoadSurveys());

  return makeLogControllerDecoratorFactory(addSurveyController);
};

export { makeLoadSurveysController };
