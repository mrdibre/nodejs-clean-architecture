import { SurveyAnswerModel } from "../../models/survey";

export interface AddSurveyModel {
  question: string;
  date: Date;
  answers: SurveyAnswerModel[];
}

export interface AddSurvey {
  add(survey: AddSurveyModel): Promise<void>;
}
