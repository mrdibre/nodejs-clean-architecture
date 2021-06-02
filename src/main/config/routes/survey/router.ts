import { Router } from "express";
import { adaptExpressRoute } from "../../../adapters/express/adapt-express-route";
import { makeAddSurveyController } from "../../../factories/controllers/survey/add-survey/add-survey-factory";
import { makeAuthMiddleware } from "../../../factories/middlewares/auth/auth-middleware-factory";
import { adaptExpressMiddleware } from "../../../adapters/express/adapt-express-middleware";
import { makeLoadSurveysController } from "../../../factories/controllers/survey/load-surveys/load-surveys-factory";

const registerSurveyRoutes = (router: Router) => {
  const adminAuth = adaptExpressMiddleware(makeAuthMiddleware("admin"));
  const userAuth = adaptExpressMiddleware(makeAuthMiddleware());

  router.post(
    "/survey",
    adminAuth,
    adaptExpressRoute(makeAddSurveyController()),
  );

  router.get(
    "/survey",
    userAuth,
    adaptExpressRoute(makeLoadSurveysController()),
  );
};

export { registerSurveyRoutes };
