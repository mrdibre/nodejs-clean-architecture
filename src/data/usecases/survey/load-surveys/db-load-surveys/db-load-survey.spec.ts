import Mockdate from "mockdate";
import { DbLoadSurveys } from "./db-load-surveys";
import { mockLoadSurveyRepository } from "@/data/test";
import { mockSurveyModels } from "@/domain/test";

const makeSut = () => {
  const loadSurveysRepositoryStub = mockLoadSurveyRepository();

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

    expect(surveys).toEqual(mockSurveyModels());
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
