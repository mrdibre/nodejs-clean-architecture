import { errorSchema } from "./error-schema";
import { accountSchema } from "./account-schema";
import { apiKeyAuthSchema } from "./api-key-auth-schema";
import { loginParamsSchema, signUpParamsSchema } from "./auth-params";
import {
  surveyResultSchema,
  saveSurveyParamsSchema,
} from "./survey-result-schema";
import {
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
  addSurveyParamsSchema,
} from "./survey-schema";

const schemas = {
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  account: accountSchema,
  apiKeyAuth: apiKeyAuthSchema,
  loginParams: loginParamsSchema,
  signupParams: signUpParamsSchema,
  surveyAnswer: surveyAnswerSchema,
  surveyResult: surveyResultSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
};

export { schemas };
