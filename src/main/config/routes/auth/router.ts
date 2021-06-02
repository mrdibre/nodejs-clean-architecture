import { Router } from "express";
import { adaptExpressRoute } from "@/main/adapters/express/adapt-express-route";
import { makeSignUpController } from "@/main/factories/controllers/auth/signup/signup-factory";
import { makeLoginController } from "@/main/factories/controllers/auth/login/login-factory";

const registerAuthRoutes = (router: Router) => {
  router.post("/signup", adaptExpressRoute(makeSignUpController()));
  router.post("/login", adaptExpressRoute(makeLoginController()));
};

export { registerAuthRoutes };
