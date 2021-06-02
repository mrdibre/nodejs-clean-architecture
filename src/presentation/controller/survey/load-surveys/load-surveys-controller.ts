import { Controller, HttpResponse } from "@/presentation/protocols";
import { LoadSurveys } from "@/domain/usecases/survey/load-surveys";
import {
  ok,
  noContent,
  serverError,
} from "@/presentation/helpers/http/http-helper";

class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();

      return surveys.length ? ok(surveys) : noContent();
    } catch (e) {
      return serverError(e);
    }
  }
}

export { LoadSurveysController };
