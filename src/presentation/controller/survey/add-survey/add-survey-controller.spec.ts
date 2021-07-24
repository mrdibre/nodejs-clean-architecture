import Mockdate from "mockdate";
import { HttpRequest } from "@/presentation/protocols";
import { MissingParamError } from "@/presentation/errors";
import { AddSurveyController } from "./add-survey-controller";
import {
  badRequest,
  noContent,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { mockSurvey, mockValidation } from "@/presentation/test";

const mockRequest = (): HttpRequest => ({
  body: {
    question: "any_question",
    date: new Date(),
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
      },
    ],
  },
});

const makeSut = () => {
  const addSurveyStub = mockSurvey();
  const validationStub = mockValidation();
  const sut = new AddSurveyController(validationStub, addSurveyStub);

  return {
    sut,
    addSurveyStub,
    validationStub,
  };
};

describe("AddSurvey Controller", function () {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  test("Should call Validation with correct value", async () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, "validate");

    const httpRequest = mockRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const request = mockRequest();

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field")),
    );
  });

  test("Should call AddSurvey with correct values", async () => {
    const { sut, addSurveyStub } = makeSut();

    const addSpy = jest.spyOn(addSurveyStub, "add");

    const httpRequest = mockRequest();

    await sut.handle(httpRequest);

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 500 if AddSurvey throws", async () => {
    const { sut, addSurveyStub } = makeSut();

    jest
      .spyOn(addSurveyStub, "add")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpRequest = mockRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 204 on success", async () => {
    const { sut } = makeSut();

    const httpRequest = mockRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(noContent());
  });
});
