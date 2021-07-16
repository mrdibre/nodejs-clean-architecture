import Mockdate from "mockdate";
import { DbLoadSurveyById } from "@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id/db-load-survey-by-id";
import { mockLoadSurveyByIdRepository } from "@/data/test";
import { mockSurveyModel } from "@/domain/test";

const makeSut = () => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();

  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe("DbLoadSurveyById UseCase", () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  test("Should call LoadSurveyByIdRepository", async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();

    const loadAllSpy = jest.spyOn(loadSurveyByIdRepositoryStub, "loadById");

    await sut.loadById("any_id");

    expect(loadAllSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should return a survey on success", async () => {
    const { sut } = makeSut();

    const surveys = await sut.loadById("any_id");

    expect(surveys).toEqual(mockSurveyModel());
  });

  test("Should throw if LoadSurveyByIdRepository throws", async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();

    jest
      .spyOn(loadSurveyByIdRepositoryStub, "loadById")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.loadById("any_id");

    await expect(promise).rejects.toThrow();
  });
});
