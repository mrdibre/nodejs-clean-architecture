import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import { LoadSurveyById } from "@/domain/usecases/survey/load-survey-by-id";
import { forbidden } from "@/presentation/helpers/http/http-helper";

class SaveSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest;

    const survey = await this.loadSurveyById.loadById(params.surveyId);

    if (!survey) {
      return forbidden(new Error());
    }

    return Promise.resolve(undefined);
  }
}

export { SaveSurveyResultController };
