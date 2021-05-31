import { Router } from "express";
import { adaptExpressRoute } from "../../../adapters/express/adapt-express-route";
import { makeSignUpController } from "../../../factories/controllers/auth/signup/signup-factory";
import { makeLoginController } from "../../../factories/controllers/auth/login/login-factory";

const registerAuthRoutes = (router: Router) => {
  router.post("/signup", adaptExpressRoute(makeSignUpController()));
  router.post("/login", adaptExpressRoute(makeLoginController()));
};

export { registerAuthRoutes };
