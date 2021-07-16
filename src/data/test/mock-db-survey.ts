import { AddSurveyRepository } from "@/data/protocols/database/survey/add-survey-repository";
import { AddSurveyParams } from "@/domain/usecases/survey/add-survey";
import { LoadSurveyByIdRepository } from "@/data/protocols/database/survey/load-survey-by-id-repository";
import { SurveyModel } from "@/domain/models/survey";
import { mockSurveyModel, mockSurveyModels } from "@/domain/test/mock-survey";
import { LoadSurveysRepository } from "@/data/protocols/database/survey/load-surveys-repository";

const mockAddSurveyRepository = () => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyParams): Promise<void> {
      return;
    }
  }

  return new AddSurveyRepositoryStub();
};

const mockLoadSurveyByIdRepository = () => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(): Promise<SurveyModel> {
      return mockSurveyModel();
    }
  }

  return new LoadSurveyByIdRepositoryStub();
};

const mockLoadSurveyRepository = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return mockSurveyModels();
    }
  }

  return new LoadSurveysRepositoryStub();
};

export {
  mockAddSurveyRepository,
  mockLoadSurveyRepository,
  mockLoadSurveyByIdRepository,
};
