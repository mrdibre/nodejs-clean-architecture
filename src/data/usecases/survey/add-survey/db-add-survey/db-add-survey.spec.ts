import { DbAddSurvey } from "./db-add-survey";
import { mockAddSurveyRepository } from "@/data/test";
import { mockAddSurveyParams } from "@/domain/test";

const makeSut = () => {
  const addSurveyRepositoryStub = mockAddSurveyRepository();

  const sut = new DbAddSurvey(addSurveyRepositoryStub);

  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe("DbLoadSurveys UseCase", () => {
  test("Should call AddSurveyRepository with correct values", async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addSurveyRepositoryStub, "add");

    const surveyData = mockAddSurveyParams();

    await sut.add(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test("Should throw if AddSurveyRepository throws", async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    jest
      .spyOn(addSurveyRepositoryStub, "add")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(mockAddSurveyParams());

    await expect(promise).rejects.toThrow();
  });
});
