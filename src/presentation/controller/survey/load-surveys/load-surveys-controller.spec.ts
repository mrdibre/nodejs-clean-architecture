import Mockdate from "mockdate";
import { SurveyModel } from "@/domain/models/survey";
import { LoadSurveysController } from "./load-surveys-controller";
import { LoadSurveys } from "@/domain/usecases/survey/load-surveys";
import {
  noContent,
  ok,
  serverError,
} from "@/presentation/helpers/http/http-helper";

const makeFakeSurveys = (): SurveyModel[] => [
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

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(ok(makeFakeSurveys()));
  });

  test("Should return 204 if LoadSurveys return empty", async () => {
    const { sut, loadSurveysStub } = makeSut();

    jest
      .spyOn(loadSurveysStub, "load")
      .mockReturnValueOnce(Promise.resolve([]));

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(noContent());
  });

  test("Should return 500 if LoadSurveys throws", async () => {
    const { sut, loadSurveysStub } = makeSut();

    jest
      .spyOn(loadSurveysStub, "load")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
