import {
  AddSurvey,
  AddSurveyModel,
} from "../../../../domain/usecases/survey/add-survey";
import { AddSurveyRepository } from "../../../protocols/database/survey/add-survey-repository";

class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(survey: AddSurveyModel) {
    await this.addSurveyRepository.add(survey);

    return;
  }
}

export { DbAddSurvey };
