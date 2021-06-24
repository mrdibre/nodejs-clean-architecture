import Mockdate from "mockdate";
import { HttpRequest } from "@/presentation/protocols";
import { InvalidParamError } from "@/presentation/errors";
import { SurveyModel, SurveyResultModel } from "@/domain/models/survey";
import { LoadSurveyById } from "@/domain/usecases/survey/load-survey-by-id";
import { SaveSurveyResultController } from "./save-survey-result-controller";
import {
  ok,
  forbidden,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import {
  SaveSurveyResult,
  SaveSurveyResultModel,
} from "@/domain/usecases/survey-result/save-survey-result";

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: "any_survey_id",
  },
  body: {
    answer: "any_answer",
  },
  accountId: "any_account_id",
});

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: "valid_id",
  date: new Date(),
  answer: "valid_answer",
  surveyId: "valid_survey_id",
  accountId: "valid_account_id",
});

const makeFakeSurvey = (): SurveyModel => ({
  id: "any_survey_id",
  question: "any_question",
  date: new Date(),
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
});

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return makeFakeSurvey();
    }
  }

  return new LoadSurveyByIdStub();
};

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSurveyResult();
    }
  }

  return new SaveSurveyResultStub();
};

const makeSut = () => {
  const loadSurveyById = makeLoadSurveyById();
  const saveSurveyResult = makeSaveSurveyResult();

  const sut = new SaveSurveyResultController(loadSurveyById, saveSurveyResult);

  return {
    sut,
    loadSurveyById,
    saveSurveyResult,
  };
};

describe("SaveSurveyResult Controller", () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  test("Should call LoadSurveyById with correct values", async () => {
    const { sut, loadSurveyById } = makeSut();

    const loadSpy = jest.spyOn(loadSurveyById, "loadById");

    await sut.handle(makeFakeRequest());

    expect(loadSpy).toHaveBeenCalledWith("any_survey_id");
  });

  test("Should return 403 if LoadSurveyById returns null", async () => {
    const { sut, loadSurveyById } = makeSut();

    jest
      .spyOn(loadSurveyById, "loadById")
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.handle(makeFakeRequest());

    expect(response).toEqual(forbidden(new InvalidParamError("surveyId")));
  });

  test("Should return 403 if an invalid answer is provided", async () => {
    const { sut } = makeSut();

    const response = await sut.handle({
      params: {
        surveyId: "any_survey_id",
      },
      body: {
        answer: "wrong_answer",
      },
    });

    expect(response).toEqual(forbidden(new InvalidParamError("answer")));
  });

  test("Should return 500 if LoadSurveys throws", async () => {
    const { sut, loadSurveyById } = makeSut();

    jest
      .spyOn(loadSurveyById, "loadById")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(makeFakeRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  test("Should call SaveSurveyResult with correct values", async () => {
    const { sut, saveSurveyResult } = makeSut();

    const saveSpy = jest.spyOn(saveSurveyResult, "save");

    await sut.handle(makeFakeRequest());

    expect(saveSpy).toHaveBeenCalledWith({
      answer: "any_answer",
      date: new Date(),
      surveyId: "any_survey_id",
      accountId: "any_account_id",
    });
  });

  test("Should return 500 if SaveSurveyResult throws", async () => {
    const { sut, saveSurveyResult } = makeSut();

    jest
      .spyOn(saveSurveyResult, "save")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(makeFakeRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(makeFakeRequest());

    expect(response).toEqual(ok(makeFakeSurveyResult()));
  });
});
