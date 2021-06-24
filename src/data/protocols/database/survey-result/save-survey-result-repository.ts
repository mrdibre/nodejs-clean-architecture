import { SurveyResultModel } from "@/domain/models/survey";
import { SaveSurveyResultModel } from "@/domain/usecases/survey-result/save-survey-result";

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
