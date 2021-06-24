import { SurveyModel } from "@/domain/models/survey";
import { HttpRequest } from "@/presentation/protocols";
import { LoadSurveyById } from "@/domain/usecases/survey/load-survey-by-id";
import { SaveSurveyResultController } from "./save-survey-result-controller";

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: "any_survey_id",
  },
});

const makeFakeSurvey = (): SurveyModel => ({
  id: "any_id",
  question: "any_question",
  date: new Date(),
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
});

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return makeFakeSurvey();
    }
  }

  return new LoadSurveyByIdStub();
};

const makeSut = () => {
  const loadSurveyById = makeLoadSurveyById();

  const sut = new SaveSurveyResultController(loadSurveyById);

  return {
    sut,
    loadSurveyById,
  };
};

describe("SaveSurveyResult Controller", () => {
  test("Should call LoadSurveyById with correct values", async () => {
    const { sut, loadSurveyById } = makeSut();

    const loadSpy = jest.spyOn(loadSurveyById, "loadById");

    await sut.handle(makeFakeRequest());

    expect(loadSpy).toHaveBeenCalledWith("any_survey_id");
  });
});
