import { AuthMiddleware } from "../../../../presentation/middlewares/auth/auth-middleware";
import { makeDbLoadAccountByToken } from "../../usecases/load-account-by-token/db-load-account-by-token-factory";

const makeAuthMiddleware = (role?: string) => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role);
};

export { makeAuthMiddleware };
