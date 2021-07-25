import { accountSchema } from "./account-schema";
import { loginParamsSchema } from "@/main/config/swagger/docs/schemas/login-params";

const schemas = {
  account: accountSchema,
  loginParams: loginParamsSchema,
};

export { schemas };
