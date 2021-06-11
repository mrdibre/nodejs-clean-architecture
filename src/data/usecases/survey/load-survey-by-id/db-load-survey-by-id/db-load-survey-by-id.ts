import { LoadSurveyById } from "@/domain/usecases/survey/load-survey-by-id";
import { LoadSurveyByIdRepository } from "@/data/protocols/database/survey/load-survey-by-id-repository";
import { SurveyModel } from "@/domain/models/survey";

class DbLoadSurveyById implements LoadSurveyById {
  constructor(
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository,
  ) {}

  async loadById(id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadById(id);

    return null;
  }
}

export { DbLoadSurveyById };
