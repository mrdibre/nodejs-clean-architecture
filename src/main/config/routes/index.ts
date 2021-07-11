import { Express, Router } from "express";
import { registerAuthRoutes } from "./auth/router";
import { registerSurveyRoutes } from "./survey/router";
import { registerSurveyResultRoutes } from "./survey-result/router";

const useRoutes = (app: Express) => {
  const router = Router();

  app.use("/api", router);

  registerAuthRoutes(router);
  registerSurveyRoutes(router);
  registerSurveyResultRoutes(router);
};

export { useRoutes };
