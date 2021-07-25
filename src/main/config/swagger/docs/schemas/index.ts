import { accountSchema } from "./account-schema";
import { errorSchema } from "./error-schema";
import { loginParamsSchema } from "./login-params";

const schemas = {
  error: errorSchema,
  account: accountSchema,
  loginParams: loginParamsSchema,
};

export { schemas };
