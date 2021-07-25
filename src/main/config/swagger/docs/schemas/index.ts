import { errorSchema } from "./error-schema";
import { accountSchema } from "./account-schema";
import { loginParamsSchema } from "./login-params";
import { apiKeyAuthSchema } from "./api-key-auth-schema";
import {
  surveySchema,
  surveysSchema,
  surveyAnswerSchema,
} from "./survey-schema";

const schemas = {
  error: errorSchema,
  survey: surveySchema,
  surveys: surveysSchema,
  account: accountSchema,
  apiKeyAuth: apiKeyAuthSchema,
  loginParams: loginParamsSchema,
  surveyAnswer: surveyAnswerSchema,
};

export { schemas };
