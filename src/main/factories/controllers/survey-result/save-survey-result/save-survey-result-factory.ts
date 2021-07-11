import { makeSaveSurveyResult } from "@/main/factories/usecases/survey-result/db-save-survey-result-factory";
import { makeLogControllerDecoratorFactory } from "@/main/factories/decorators/log-controller-decorator-factory";
import { SaveSurveyResultController } from "@/presentation/controller/survey-result/save-survey-result/save-survey-result-controller";
import { makeDbLoadSurveyById } from "@/main/factories/usecases/survey/load-surveys/db-load-survey-by-id-factory";

const makeSaveSurveyResultController = () => {
  const addSurveyController = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeSaveSurveyResult(),
  );

  return makeLogControllerDecoratorFactory(addSurveyController);
};

export { makeSaveSurveyResultController };
