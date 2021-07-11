import { Router } from "express";
import { auth } from "@/main/config/middlewares/auth";
import { adaptExpressRoute } from "@/main/adapters/express/adapt-express-route";
import { makeSaveSurveyResultController } from "@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-factory";

const registerSurveyResultRoutes = (router: Router) => {
  router.put(
    "/surveys/:surveyId/results",
    auth,
    adaptExpressRoute(makeSaveSurveyResultController()),
  );
};

export { registerSurveyResultRoutes };
