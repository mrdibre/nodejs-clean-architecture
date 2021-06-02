import { adaptExpressMiddleware } from "@/main/adapters/express/adapt-express-middleware";
import { makeAuthMiddleware } from "@/main/factories/middlewares/auth/auth-middleware-factory";

const auth = adaptExpressMiddleware(makeAuthMiddleware());

export { auth };
