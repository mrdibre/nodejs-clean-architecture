import { errorSchema } from "./error-schema";
import { accountSchema } from "./account-schema";
import { apiKeyAuthSchema } from "./api-key-auth-schema";
import { loginParamsSchema, signUpParamsSchema } from "./auth-params";
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
  signupParams: signUpParamsSchema,
  surveyAnswer: surveyAnswerSchema,
};

export { schemas };
