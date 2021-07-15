import { DbAddSurvey } from "./db-add-survey";
import { AddSurveyParams } from "@/domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "@/data/protocols/database/survey/add-survey-repository";

const makeFakeSurveyModel = () => ({
  question: "any_question",
  date: new Date(),
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
});

const makeAddSurveyRepositoryStub = () => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyParams): Promise<void> {
      return;
    }
  }

  return new AddSurveyRepositoryStub();
};

const makeSut = () => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub();

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

    const surveyData = makeFakeSurveyModel();

    await sut.add(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });

  test("Should throw if AddSurveyRepository throws", async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    jest
      .spyOn(addSurveyRepositoryStub, "add")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.add(makeFakeSurveyModel());

    await expect(promise).rejects.toThrow();
  });
});
