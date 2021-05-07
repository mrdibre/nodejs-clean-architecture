import { Router } from "express";
import { adaptExpressRoute } from "../../../adapters/adapt-express-route";
import { makeSignUpController } from "../../../factories/signup/signup";

const registerRoute = (router: Router) => {
  router.post("/signup", adaptExpressRoute(makeSignUpController()));
};

export { registerRoute };
