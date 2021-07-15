import {
  AddSurvey,
  AddSurveyParams,
} from "@/domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "@/data/protocols/database/survey/add-survey-repository";

class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(survey: AddSurveyParams) {
    await this.addSurveyRepository.add(survey);

    return;
  }
}

export { DbAddSurvey };
