import { DbAddSurvey } from "./db-add-survey";
import { AddSurveyModel } from "../../../../domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "../../../protocols/database/survey/add-survey-repository";

const makeFakeSurveyModel = () => ({
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
});

const makeAddSurveyRepositoryStub = () => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyModel): Promise<void> {
      return;
    }
  }

  return new AddSurveyRepositoryStub();
};

const makeSut = () => {
  const addSurveyRepository = makeAddSurveyRepositoryStub();

  const sut = new DbAddSurvey(addSurveyRepository);

  return {
    sut,
    addSurveyRepository,
  };
};

describe("DbAddSurvey UseCase", () => {
  test("Should call AddSurveyRepository with correct values", async () => {
    const { sut, addSurveyRepository } = makeSut();

    const addSpy = jest.spyOn(addSurveyRepository, "add");

    const surveyData = makeFakeSurveyModel();

    await sut.add(surveyData);

    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});
