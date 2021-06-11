import Mockdate from "mockdate";
import { DbLoadSurveys } from "./db-load-surveys";
import { SurveyModel } from "@/domain/models/survey";
import { LoadSurveysRepository } from "@/data/protocols/database/survey/load-surveys-repository";

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

const makeLoadSurveyRepositoryStub = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return makeFakeSurveys();
    }
  }

  return new LoadSurveysRepositoryStub();
};

const makeSut = () => {
  const loadSurveysRepositoryStub = makeLoadSurveyRepositoryStub();

  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);

  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe("DbLoadSurveys UseCase", () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  test("Should call LoadSurveyRepository", async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, "loadAll");

    await sut.load();

    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Should return a list of Surveys on success", async () => {
    const { sut } = makeSut();

    const surveys = await sut.load();

    expect(surveys).toEqual(makeFakeSurveys());
  });

  test("Should throw if AddSurveyRepository throws", async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    jest
      .spyOn(loadSurveysRepositoryStub, "loadAll")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.load();

    await expect(promise).rejects.toThrow();
  });
});
