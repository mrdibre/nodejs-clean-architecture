import Mockdate from "mockdate";
import { LoadSurveysController } from "./load-surveys-controller";
import {
  ok,
  noContent,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { mockSurveyModels } from "@/domain/test";
import { mockLoadSurveys } from "@/presentation/test";

const makeSut = () => {
  const loadSurveysStub = mockLoadSurveys();

  const sut = new LoadSurveysController(loadSurveysStub);

  return {
    sut,
    loadSurveysStub,
  };
};

describe("LoadSurveys Controller", () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  test("Should call LoadSurveys", async () => {
    const { sut, loadSurveysStub } = makeSut();

    const loadSpy = jest.spyOn(loadSurveysStub, "load");

    await sut.handle();

    expect(loadSpy).toHaveBeenCalled();
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(ok(mockSurveyModels()));
  });

  test("Should return 204 if LoadSurveys return empty", async () => {
    const { sut, loadSurveysStub } = makeSut();

    jest
      .spyOn(loadSurveysStub, "load")
      .mockReturnValueOnce(Promise.resolve([]));

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(noContent());
  });

  test("Should return 500 if LoadSurveys throws", async () => {
    const { sut, loadSurveysStub } = makeSut();

    jest
      .spyOn(loadSurveysStub, "load")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle();

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
