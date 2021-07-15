import { SurveyAnswerModel } from "@/domain/models/survey";

export type AddSurveyParams = {
  question: string;
  date: Date;
  answers: SurveyAnswerModel[];
};

export interface AddSurvey {
  add(survey: AddSurveyParams): Promise<void>;
}
