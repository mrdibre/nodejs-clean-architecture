import { AddSurvey } from "@/domain/usecases/survey/add-survey";
import {
  Validation,
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import {
  badRequest,
  noContent,
  serverError,
} from "@/presentation/helpers/http/http-helper";

class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { question, answers } = httpRequest.body;

      await this.addSurvey.add({
        answers,
        question,
        date: new Date(),
      });

      return noContent();
    } catch (e) {
      return serverError(e);
    }
  }
}

export { AddSurveyController };
