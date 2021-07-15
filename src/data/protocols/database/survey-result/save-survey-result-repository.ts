import { SurveyResultModel } from "@/domain/models/survey";
import { SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result";

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
