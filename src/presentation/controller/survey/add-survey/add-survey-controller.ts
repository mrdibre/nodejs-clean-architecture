import {
  Validation,
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocols";
import { badRequest } from "../../../helpers/http/http-helper";
import { AddSurvey } from "../../../../domain/usecases/survey/add-survey";

class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }

    const { question, answers } = httpRequest.body;

    await this.addSurvey.add({
      question,
      answers,
    });
    return null;
  }
}

export { AddSurveyController };
