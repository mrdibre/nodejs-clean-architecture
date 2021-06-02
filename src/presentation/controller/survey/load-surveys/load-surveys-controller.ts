import { Controller, HttpResponse } from "../../../protocols";
import { LoadSurveys } from "../../../../domain/usecases/survey/load-surveys";
import { ok, serverError } from "../../../helpers/http/http-helper";

class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load();

      return ok(surveys);
    } catch (e) {
      return serverError(e);
    }
  }
}

export { LoadSurveysController };
