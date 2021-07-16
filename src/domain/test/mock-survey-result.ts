import { SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey";

const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  answer: "any_answer",
  surveyId: "any_survey_id",
  accountId: "any_account)id",
  date: new Date(),
});

const mockSurveyResultModel = (): SurveyResultModel => ({
  id: "any_id",
  ...mockSaveSurveyResultParams(),
});

export { mockSaveSurveyResultParams, mockSurveyResultModel };
