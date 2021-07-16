import { SurveyModel } from "@/domain/models/survey";
import { AddSurveyParams } from "@/domain/usecases/survey/add-survey";

const mockSurveyModel = (): SurveyModel => ({
  id: "any_id",
  question: "any_question",
  date: new Date(),
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
    {
      answer: "other_answer",
    },
  ],
});

const mockAddSurveyParams = (): AddSurveyParams => ({
  question: "any_question",
  date: new Date(),
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
});

const mockSurveyModels = (): SurveyModel[] => [
  mockSurveyModel(),
  {
    ...mockSurveyModel(),
    id: "other_id",
    question: "other_question",
  },
];

export { mockSurveyModel, mockSurveyModels, mockAddSurveyParams };
