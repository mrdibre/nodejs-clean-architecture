import { adaptExpressMiddleware } from "../../../adapters/express/adapt-express-middleware";
import { makeAuthMiddleware } from "../../../factories/middlewares/auth/auth-middleware-factory";

const adminAuth = adaptExpressMiddleware(makeAuthMiddleware("admin"));

export { adminAuth };
