import { Router } from "express";
import { adminAuth, auth } from "@/main/config/middlewares/auth";
import { adaptExpressRoute } from "@/main/adapters/express/adapt-express-route";
import { makeAddSurveyController } from "@/main/factories/controllers/survey/add-survey/add-survey-factory";
import { makeLoadSurveysController } from "@/main/factories/controllers/survey/load-surveys/load-surveys-factory";

const registerSurveyRoutes = (router: Router) => {
  router.post(
    "/survey",
    adminAuth,
    adaptExpressRoute(makeAddSurveyController()),
  );

  router.get("/survey", auth, adaptExpressRoute(makeLoadSurveysController()));
};

export { registerSurveyRoutes };
