import { makeDbLoadSurveys } from "@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory";
import { LoadSurveysController } from "@/presentation/controller/survey/load-surveys/load-surveys-controller";
import { makeLogControllerDecoratorFactory } from "@/main/factories/decorators/log-controller-decorator-factory";

const makeLoadSurveysController = () => {
  const addSurveyController = new LoadSurveysController(makeDbLoadSurveys());

  return makeLogControllerDecoratorFactory(addSurveyController);
};

export { makeLoadSurveysController };
