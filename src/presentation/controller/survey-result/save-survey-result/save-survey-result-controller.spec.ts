import Mockdate from "mockdate";
import { HttpRequest } from "@/presentation/protocols";
import { InvalidParamError } from "@/presentation/errors";
import { SaveSurveyResultController } from "./save-survey-result-controller";
import {
  ok,
  forbidden,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { mockSurveyResultModel } from "@/domain/test";
import { mockLoadSurveyById, mockSaveSurveyResult } from "@/presentation/test";

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: "any_survey_id",
  },
  body: {
    answer: "any_answer",
  },
  accountId: "any_account_id",
});

const makeSut = () => {
  const loadSurveyById = mockLoadSurveyById();
  const saveSurveyResult = mockSaveSurveyResult();

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

    await sut.handle(mockRequest());

    expect(loadSpy).toHaveBeenCalledWith("any_survey_id");
  });

  test("Should return 403 if LoadSurveyById returns null", async () => {
    const { sut, loadSurveyById } = makeSut();

    jest
      .spyOn(loadSurveyById, "loadById")
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.handle(mockRequest());

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

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  test("Should call SaveSurveyResult with correct values", async () => {
    const { sut, saveSurveyResult } = makeSut();

    const saveSpy = jest.spyOn(saveSurveyResult, "save");

    await sut.handle(mockRequest());

    expect(saveSpy).toHaveBeenCalledWith({
      answer: "any_answer",
      date: new Date(),
      surveyId: "any_id",
      accountId: "any_account_id",
    });
  });

  test("Should return 500 if SaveSurveyResult throws", async () => {
    const { sut, saveSurveyResult } = makeSut();

    jest
      .spyOn(saveSurveyResult, "save")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(ok(mockSurveyResultModel()));
  });
});
