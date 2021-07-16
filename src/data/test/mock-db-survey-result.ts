import { SaveSurveyResultRepository } from "@/data/protocols/database/survey-result/save-survey-result-repository";
import { SaveSurveyResultParams } from "@/domain/usecases/survey-result/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey";
import { mockSurveyResultModel } from "@/domain/test/mock-survey-result";

const mockSaveSurveyResultRepository = () => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSurveyResultModel();
    }
  }

  return new SaveSurveyResultRepositoryStub();
};

export { mockSaveSurveyResultRepository };
