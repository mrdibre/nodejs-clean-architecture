import { loginPath, signupPath } from "./auth";
import { surveyPath } from "./surveys";

const paths = {
  "/login": loginPath,
  "/signup": signupPath,
  "/survey": surveyPath,
};

export { paths };
