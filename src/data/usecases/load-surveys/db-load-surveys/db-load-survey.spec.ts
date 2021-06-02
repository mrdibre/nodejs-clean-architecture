import { DbLoadSurveys } from "./db-load-surveys";
import { SurveyModel } from "../../../../domain/models/survey";
import { LoadSurveysRepository } from "../../../protocols/database/survey/load-surveys-repository";

const makeLoadSurveyRepositoryStub = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return [];
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
  test("Should call LoadSurveyRepository", async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();

    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, "loadAll");

    await sut.load();

    expect(loadAllSpy).toHaveBeenCalled();
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
