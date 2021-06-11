import Mockdate from "mockdate";
import { SurveyModel } from "@/domain/models/survey";
import { LoadSurveyByIdRepository } from "@/data/protocols/database/survey/load-survey-by-id-repository";
import { DbLoadSurveyById } from "@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id/db-load-survey-by-id";

const makeFakeSurveys = (): SurveyModel => ({
  id: "any_id",
  question: "any_question",
  date: new Date(),
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
});

const makeLoadSurveyByIdRepositoryStub = () => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(): Promise<SurveyModel> {
      return makeFakeSurveys();
    }
  }

  return new LoadSurveyByIdRepositoryStub();
};

const makeSut = () => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub();

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

    expect(surveys).toEqual(makeFakeSurveys());
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
