import { Express, Router } from "express";
import { registerAuthRoutes } from "./auth/router";

const useRoutes = (app: Express) => {
  const router = Router();

  app.use("/api", router);

  registerAuthRoutes(router);
};

export { useRoutes };
