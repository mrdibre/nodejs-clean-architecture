import Mockdate from "mockdate";
import { DbSaveSurveyResult } from "./db-save-survey-result";
import { mockSaveSurveyResultRepository } from "@/data/test/mock-db-survey-result";
import {
  mockSaveSurveyResultParams,
  mockSurveyResultModel,
} from "@/domain/test";

const makeSut = () => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();

  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

  return {
    sut,
    saveSurveyResultRepositoryStub,
  };
};

describe("DbSaveSurveyResult UseCase", () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset;
  });

  test("Should call SaveSurveyResultRepository with correct values", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, "save");

    const surveyData = mockSurveyResultModel();

    await sut.save(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test("Should throw if SaveSurveyResultRepository throws", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    jest
      .spyOn(saveSurveyResultRepositoryStub, "save")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.save(mockSaveSurveyResultParams());

    await expect(promise).rejects.toThrow();
  });

  test("Should return survey result on success", async () => {
    const { sut } = makeSut();

    const data = await sut.save(mockSaveSurveyResultParams());

    expect(data).toEqual(mockSurveyResultModel());
  });
});
