import { Controller, HttpResponse } from "../../../protocols";
import { LoadSurveys } from "../../../../domain/usecases/survey/load-surveys";

class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(): Promise<HttpResponse> {
    await this.loadSurveys.load();
    return null;
  }
}

export { LoadSurveysController };
