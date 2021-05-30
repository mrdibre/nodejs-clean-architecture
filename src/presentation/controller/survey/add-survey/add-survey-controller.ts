import {
  Validation,
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../../protocols";
import { badRequest } from "../../../helpers/http/http-helper";

class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }

    return null;
  }
}

export { AddSurveyController };
