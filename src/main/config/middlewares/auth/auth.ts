import { adaptExpressMiddleware } from "../../../adapters/express/adapt-express-middleware";
import { makeAuthMiddleware } from "../../../factories/middlewares/auth/auth-middleware-factory";

const auth = adaptExpressMiddleware(makeAuthMiddleware());

export { auth };
