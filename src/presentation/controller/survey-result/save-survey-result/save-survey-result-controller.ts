import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import { InvalidParamError } from "@/presentation/errors";
import { LoadSurveyById } from "@/domain/usecases/survey/load-survey-by-id";
import {
  ok,
  forbidden,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { SaveSurveyResult } from "@/domain/usecases/survey-result/save-survey-result";

class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params, body } = httpRequest;

      const survey = await this.loadSurveyById.loadById(params.surveyId);

      if (survey) {
        const answers = survey.answers.map(({ answer }) => answer);

        if (!answers.includes(body.answer)) {
          return forbidden(new InvalidParamError("answer"));
        }

        const surveyResult = await this.saveSurveyResult.save({
          date: new Date(),
          answer: body.answer,
          surveyId: survey.id,
          accountId: httpRequest.accountId,
        });

        return ok(surveyResult);
      }

      return forbidden(new InvalidParamError("surveyId"));
    } catch (e) {
      return serverError(e);
    }
  }
}

export { SaveSurveyResultController };
