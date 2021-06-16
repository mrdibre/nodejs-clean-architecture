import { DbSaveSurveyResult } from "./db-save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey";
import { SaveSurveyResultModel } from "@/domain/usecases/survey/save-survey-result";
import { SaveSurveyResultRepository } from "@/data/protocols/database/survey/save-survey-result-repository";

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  answer: "any_answer",
  surveyId: "any_survey_id",
  accountId: "any_account)id",
  date: new Date(),
});

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: "any_id",
  ...makeFakeSurveyResultData(),
});

const makeSaveSurveyResultRepositoryStub = () => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSurveyResult();
    }
  }

  return new SaveSurveyResultRepositoryStub();
};

const makeSut = () => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub();

  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);

  return {
    sut,
    saveSurveyResultRepositoryStub,
  };
};

describe("DbSaveSurveyResult UseCase", () => {
  test("Should call SaveSurveyResultRepository with correct values", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, "save");

    const surveyData = makeFakeSurveyResultData();

    await sut.save(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test("Should throw if SaveSurveyResultRepository throws", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    jest
      .spyOn(saveSurveyResultRepositoryStub, "save")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.save(makeFakeSurveyResultData());

    await expect(promise).rejects.toThrow();
  });
});
