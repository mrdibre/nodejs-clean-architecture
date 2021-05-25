import { Router } from "express";
import { adaptExpressRoute } from "../../../adapters/express/adapt-express-route";
import { makeSignUpController } from "../../../factories/signup/signup";
import { makeLoginController } from "../../../factories/login/login-factory";

const registerRoute = (router: Router) => {
  router.post("/signup", adaptExpressRoute(makeSignUpController()));
  router.post("/login", adaptExpressRoute(makeLoginController()));
};

export { registerRoute };
