import Mockdate from "mockdate";
import { LoadSurveysController } from "./load-surveys-controller";
import { LoadSurveys } from "../../../../domain/usecases/survey/load-surveys";
import { SurveyModel } from "../../../../domain/models/survey";

const makeFakeSurveys = () => [
  {
    id: "any_id",
    question: "any_question",
    date: new Date(),
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
      },
    ],
  },
  {
    id: "other_id",
    question: "other_question",
    date: new Date(),
    answers: [
      {
        image: "other_image",
        answer: "other_answer",
      },
    ],
  },
];

const makeLoadSurveys = () => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return makeFakeSurveys();
    }
  }

  return new LoadSurveysStub();
};

const makeSut = () => {
  const loadSurveysStub = makeLoadSurveys();

  const sut = new LoadSurveysController(loadSurveysStub);

  return {
    sut,
    loadSurveysStub,
  };
};

describe("LoadSurveys Controller", () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  test("Should call LoadSurveys", async () => {
    const { sut, loadSurveysStub } = makeSut();

    const loadSpy = jest.spyOn(loadSurveysStub, "load");

    await sut.handle();

    expect(loadSpy).toHaveBeenCalled();
  });
});
