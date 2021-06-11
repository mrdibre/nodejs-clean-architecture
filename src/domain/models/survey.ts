export interface SurveyAnswerModel {
  image?: string;
  answer: string;
}

export interface SurveyModel {
  id: string;
  date: Date;
  question: string;
  answers: SurveyAnswerModel[];
}

export interface SurveyResultModel {
  id: string;
  surveyId: string;
  accountId: string;
  answer: string;
  date: Date;
}
