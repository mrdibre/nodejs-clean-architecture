import { Express, Router } from "express";
import { registerAuthRoutes } from "./auth/router";
import { registerSurveyRoutes } from "./survey/router";

const useRoutes = (app: Express) => {
  const router = Router();

  app.use("/api", router);

  registerAuthRoutes(router);
  registerSurveyRoutes(router);
};

export { useRoutes };
