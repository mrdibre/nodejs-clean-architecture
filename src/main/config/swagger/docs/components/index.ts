import { security } from "./security";
import { forbidden, badRequest, serverError, unauthorized } from "./request";

const components = {
  forbidden,
  badRequest,
  serverError,
  unauthorized,
  ...security,
};

export { components };
