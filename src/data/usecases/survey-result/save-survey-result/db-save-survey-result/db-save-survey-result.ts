import { SaveSurveyResultRepository } from "@/data/protocols/database/survey-result/save-survey-result-repository";
import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from "@/domain/usecases/survey-result/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey";

class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return this.saveSurveyResultRepository.save(data);
  }
}

export { DbSaveSurveyResult };
