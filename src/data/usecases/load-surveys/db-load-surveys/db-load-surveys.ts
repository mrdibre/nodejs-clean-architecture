import { LoadSurveys } from "../../../../domain/usecases/survey/load-surveys";
import { LoadSurveysRepository } from "../../../protocols/database/survey/load-surveys-repository";

class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load() {
    return this.loadSurveysRepository.loadAll();
  }
}

export { DbLoadSurveys };
