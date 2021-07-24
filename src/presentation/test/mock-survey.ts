import {
  AddSurvey,
  AddSurveyParams,
} from "@/domain/usecases/survey/add-survey";
import { SurveyModel } from "@/domain/models/survey";
import { mockSurveyModel, mockSurveyModels } from "@/domain/test";
import { LoadSurveys } from "@/domain/usecases/survey/load-surveys";
import { LoadSurveyById } from "@/domain/usecases/survey/load-survey-by-id";

const mockSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyParams) {
      return;
    }
  }

  return new AddSurveyStub();
};

const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return mockSurveyModels();
    }
  }

  return new LoadSurveysStub();
};

const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return mockSurveyModel();
    }
  }

  return new LoadSurveyByIdStub();
};

export { mockSurvey, mockLoadSurveys, mockLoadSurveyById };
