import { HttpRequest } from "../../../protocols";
import { MissingParamError } from "../../../errors";
import { AddSurveyController } from "./add-survey-controller";
import { Validation } from "../../../../validation/protocols";
import { badRequest } from "../../../helpers/http/http-helper";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: "any_question",
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
      },
    ],
  },
});

const makeValidation = () => {
  class ValidationSub implements Validation {
    validate(input: any) {
      return null;
    }
  }

  return new ValidationSub();
};

const makeSut = () => {
  const validationStub = makeValidation();
  const sut = new AddSurveyController(validationStub);

  return {
    sut,
    validationStub,
  };
};

describe("AddSurvey Controller", function () {
  test("Should call Validation with correct value", async () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, "validate");

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if Validation returns an error", async () => {
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const request = makeFakeRequest();

    const httpResponse = await sut.handle(request);

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field")),
    );
  });
});
