import { surveyPath } from "./survey";
import { loginPath, signupPath } from "./auth";
import { surveyResultPath } from "./survey-result";

const paths = {
  "/login": loginPath,
  "/signup": signupPath,
  "/survey": surveyPath,
  "/surveys/{surveyId}/results": surveyResultPath,
};

export { paths };
