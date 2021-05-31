import { Router } from "express";
import { adaptExpressRoute } from "../../../adapters/express/adapt-express-route";
import { makeAddSurveyController } from "../../../factories/controllers/survey/add-survey/add-survey-factory";
import { makeAuthMiddleware } from "../../../factories/middlewares/auth/auth-middleware-factory";
import { adaptExpressMiddleware } from "../../../adapters/express/adapt-express-middleware";

const registerSurveyRoutes = (router: Router) => {
  const adminAuth = adaptExpressMiddleware(makeAuthMiddleware("admin"));

  router.post(
    "/survey",
    adminAuth,
    adaptExpressRoute(makeAddSurveyController()),
  );
};

export { registerSurveyRoutes };
