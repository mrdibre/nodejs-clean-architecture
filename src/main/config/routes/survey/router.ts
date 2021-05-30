import { Router } from "express";
import { adaptExpressRoute } from "../../../adapters/express/adapt-express-route";
import { makeAddSurveyController } from "../../../factories/controllers/survey/add-survey/add-survey-factory";

const registerSurveyRoutes = (router: Router) => {
  router.post("/survey", adaptExpressRoute(makeAddSurveyController()));
};

export { registerSurveyRoutes };
